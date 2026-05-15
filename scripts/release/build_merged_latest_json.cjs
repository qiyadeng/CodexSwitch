#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      args[key] = 'true';
      continue;
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function requiredArg(args, key) {
  const value = args[key];
  if (!value) {
    throw new Error(`Missing required argument --${key}`);
  }
  return value;
}

function normalizePubDate(raw) {
  const value = (raw || '').trim();
  if (!value || value === 'true' || value === 'null') {
    throw new Error(`Invalid --published-at value: "${raw}"`);
  }
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid --published-at value: "${raw}"`);
  }
  return new Date(timestamp).toISOString();
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim();
}

function buildUrl(repo, version, fileName) {
  const encoded = encodeURIComponent(fileName);
  return `https://github.com/${repo}/releases/download/v${version}/${encoded}`;
}

function findAsset(assets, pattern, label) {
  const hit = assets.find((name) => pattern.test(name));
  if (!hit) {
    throw new Error(`Missing required updater asset for ${label}. Pattern: ${pattern}`);
  }
  return hit;
}

function buildPlatformEntry(assetName, signatures, repo, version) {
  const signature = signatures.get(assetName);
  if (!signature) {
    throw new Error(`Missing signature file for asset ${assetName}`);
  }
  return {
    signature,
    url: buildUrl(repo, version, assetName),
  };
}

function cloneEntry(entry) {
  return { signature: entry.signature, url: entry.url };
}

function addPlatformIfAsset(platforms, assets, signatures, repo, version, pattern, key, aliases = []) {
  const assetName = assets.find((name) => pattern.test(name));
  if (!assetName) {
    return false;
  }

  const entry = buildPlatformEntry(assetName, signatures, repo, version);
  platforms[key] = entry;
  for (const alias of aliases) {
    platforms[alias] = cloneEntry(entry);
  }
  return true;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const version = requiredArg(args, 'version');
  const repo = requiredArg(args, 'repo');
  const assetsDir = requiredArg(args, 'assets-dir');
  const notesFile = requiredArg(args, 'notes-file');
  const publishedAt = normalizePubDate(requiredArg(args, 'published-at'));
  const output = args.output || 'latest.json';

  if (!fs.existsSync(assetsDir) || !fs.statSync(assetsDir).isDirectory()) {
    throw new Error(`Assets directory not found: ${assetsDir}`);
  }
  if (!fs.existsSync(notesFile)) {
    throw new Error(`Notes file not found: ${notesFile}`);
  }

  const files = fs
    .readdirSync(assetsDir)
    .filter((name) => fs.statSync(path.join(assetsDir, name)).isFile());

  const signatures = new Map();
  for (const name of files) {
    if (!name.endsWith('.sig')) continue;
    const assetName = name.slice(0, -4);
    signatures.set(assetName, readText(path.join(assetsDir, name)));
  }

  const assets = files.filter(
    (name) => !name.endsWith('.sig') && name !== 'latest.json' && name !== 'SHA256SUMS.txt'
  );

  const platforms = {};

  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_aarch64\.app\.tar\.gz$/,
    'darwin-aarch64',
    ['darwin-aarch64-app']
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_x64\.app\.tar\.gz$/,
    'darwin-x86_64',
    ['darwin-x86_64-app']
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_x64_en-US\.msi$/,
    'windows-x86_64-msi'
  );
  const hasWindowsNsis = addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_x64-setup\.exe$/,
    'windows-x86_64-nsis',
    ['windows-x86_64']
  );
  if (!hasWindowsNsis && platforms['windows-x86_64-msi']) {
    platforms['windows-x86_64'] = cloneEntry(platforms['windows-x86_64-msi']);
  }
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_amd64\.AppImage$/,
    'linux-x86_64-appimage',
    ['linux-x86_64']
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_amd64\.deb$/,
    'linux-x86_64-deb'
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /-1\.x86_64\.rpm$/,
    'linux-x86_64-rpm'
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_aarch64\.AppImage$/,
    'linux-aarch64-appimage',
    ['linux-aarch64']
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /_arm64\.deb$/,
    'linux-aarch64-deb'
  );
  addPlatformIfAsset(
    platforms,
    assets,
    signatures,
    repo,
    version,
    /-1\.aarch64\.rpm$/,
    'linux-aarch64-rpm'
  );

  if (!platforms['windows-x86_64']) {
    findAsset(assets, /_x64-setup\.exe$|_x64_en-US\.msi$/, 'windows-x86_64');
    throw new Error('Missing signed Windows updater asset. Expected a .sig file next to the Windows NSIS or MSI asset.');
  }

  const latest = {
    version,
    notes: readText(notesFile),
    pub_date: publishedAt,
    platforms,
  };

  fs.writeFileSync(output, `${JSON.stringify(latest, null, 2)}\n`);
  console.log(`Merged latest.json generated at ${output}`);
  console.log(`platform count=${Object.keys(latest.platforms).length}`);
}

try {
  main();
} catch (error) {
  console.error(`[build_merged_latest_json] ${error.message}`);
  process.exit(1);
}

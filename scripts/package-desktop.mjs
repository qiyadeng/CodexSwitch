import { existsSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, delimiter, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const startTime = Date.now();
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const isWindows = process.platform === 'win32';
const tauriCli = join(
  projectRoot,
  'node_modules',
  '@tauri-apps',
  'cli',
  'tauri.js',
);

const args = process.argv.slice(2);
const fast = args.includes('--fast') || args.includes('--reuse-dist');
const showHelp = args.includes('--help') || args.includes('-h');
const forwardedArgs = args.filter((arg) => arg !== '--fast' && arg !== '--reuse-dist');

if (showHelp) {
  console.log(`Usage:
  npm run package:desktop
  npm run package:desktop -- --fast
  npm run package:nsis
  npm run package:nsis:fast

Options:
  --fast, --reuse-dist   Reuse the existing dist directory and skip the frontend build.

Any other arguments are forwarded to tauri build.
Examples:
  npm run package:desktop -- --bundles nsis
  npm run package:desktop -- --debug --no-bundle
`);
  process.exit(0);
}

if (!existsSync(tauriCli)) {
  console.error(`Tauri CLI was not found at ${tauriCli}. Run npm install first.`);
  process.exit(1);
}

const env = { ...process.env };
const cargoBin = join(homedir(), '.cargo', 'bin');
if (existsSync(cargoBin)) {
  env.PATH = `${cargoBin}${delimiter}${env.PATH ?? ''}`;
}

const tauriArgs = ['build'];
if (!hasOption(forwardedArgs, '--bundles', '-b') && !hasOption(forwardedArgs, '--no-bundle')) {
  tauriArgs.push('--bundles', 'nsis');
}
if (!hasOption(forwardedArgs, '--ci')) {
  tauriArgs.push('--ci');
}
if (!hasOption(forwardedArgs, '--no-sign')) {
  tauriArgs.push('--no-sign');
}
if (fast) {
  tauriArgs.push('--config', JSON.stringify({
    build: {
      beforeBuildCommand: isWindows ? 'cmd /c exit 0' : 'true',
    },
  }));
}
tauriArgs.push(...forwardedArgs);

console.log(fast
  ? 'Packaging desktop app in fast mode: reusing existing dist directory.'
  : 'Packaging desktop app: running the configured frontend build once, then bundling.');
console.log(`Running: tauri ${tauriArgs.join(' ')}`);

const result = spawnSync(process.execPath, [tauriCli, ...tauriArgs], {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  console.error(result.error);
}

const artifacts = findArtifacts(projectRoot, startTime);
if (result.status === 0) {
  printArtifacts(artifacts);
  process.exit(0);
}

if (artifacts.length > 0) {
  console.warn('\nTauri exited with a non-zero status, but installer artifacts were produced.');
  console.warn('This commonly happens when updater signing is configured with a public key but TAURI_SIGNING_PRIVATE_KEY is not set.');
  printArtifacts(artifacts);
  process.exit(0);
}

process.exit(result.status ?? 1);

function hasOption(list, longName, shortName) {
  return list.some((arg, index) => (
    arg === longName
    || arg.startsWith(`${longName}=`)
    || (shortName ? arg === shortName || arg.startsWith(`${shortName}=`) : false)
    || (shortName && list[index - 1] === shortName)
    || list[index - 1] === longName
  ));
}

function findArtifacts(root, since) {
  const bundleRoot = join(root, 'target', 'release', 'bundle');
  if (!existsSync(bundleRoot)) {
    return [];
  }

  const extensions = new Set(['.exe', '.msi', '.dmg', '.app', '.AppImage', '.deb', '.rpm']);
  const found = [];
  walk(bundleRoot, found, extensions, since);
  return found.sort((a, b) => b.mtimeMs - a.mtimeMs);
}

function walk(dir, found, extensions, since) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, found, extensions, since);
      continue;
    }

    const stat = statSync(fullPath);
    const matched = [...extensions].some((extension) => entry.name.endsWith(extension));
    if (matched && stat.mtimeMs >= since - 1000) {
      found.push({
        path: fullPath,
        sizeMb: stat.size / 1024 / 1024,
        mtimeMs: stat.mtimeMs,
      });
    }
  }
}

function printArtifacts(artifacts) {
  if (artifacts.length === 0) {
    console.log('\nNo new installer artifacts were detected.');
    return;
  }

  console.log('\nInstaller artifacts:');
  for (const artifact of artifacts) {
    console.log(`- ${artifact.path} (${artifact.sizeMb.toFixed(2)} MB)`);
  }
}

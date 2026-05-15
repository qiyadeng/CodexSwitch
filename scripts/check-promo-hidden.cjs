const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const appSource = read('src/App.tsx');
const bannerSource = read('src/components/TopCenterPromoBanner.tsx');

assert(
  !appSource.includes('useTopRightAdStore'),
  'App.tsx should not initialize or fetch promotional ad state while promotion is hidden.',
);
assert(
  !appSource.includes('topRightAdState.ad'),
  'App.tsx should not render dashboard promotion content while promotion is hidden.',
);
assert(
  !appSource.includes('TOP_RIGHT_AD_REFRESH_INTERVAL_MS'),
  'App.tsx should not keep the promotional refresh interval while promotion is hidden.',
);
assert(
  /return\s+null\s*;/.test(bannerSource),
  'TopCenterPromoBanner should render null while promotion is hidden.',
);

console.log('Promotion UI is hidden.');

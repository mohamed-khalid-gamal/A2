const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const watchDir = path.join(__dirname, '..', 'imgs');
let timer = null;
const DEBOUNCE_MS = 300;

function runGenerator() {
  const proc = spawn(process.execPath, [path.join(__dirname, 'generate-images.js')], {
    stdio: 'inherit',
  });
  proc.on('error', (err) => console.error('generator error:', err));
}

if (!fs.existsSync(watchDir)) {
  console.error('watch directory not found:', watchDir);
  process.exit(1);
}

console.log('Watching', watchDir, 'for image changes... (ctrl+C to stop)');

fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  // debounce rapid changes
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('\nChange detected in imgs/', filename, '- regenerating images.json');
    runGenerator();
  }, DEBOUNCE_MS);
});

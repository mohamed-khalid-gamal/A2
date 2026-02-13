const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'imgs');
const outFile = path.join(__dirname, '..', 'images.json');
const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];

function scanFolder(folderPath) {
  try {
    return fs.readdirSync(folderPath).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return allowed.includes(ext) && fs.statSync(path.join(folderPath, f)).isFile();
    });
  } catch (err) {
    return [];
  }
}

function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error('imgs/ folder not found');
    process.exit(1);
  }

  const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const result = {};

  folders.forEach((folder) => {
    const full = path.join(imagesDir, folder);
    const files = scanFolder(full);
    if (files.length) result[folder] = files;
  });

  // Also scan top-level imgs (non-folder) images that match the transform gallery
  const topLevelFiles = scanFolder(imagesDir).filter((f) => /^\d+\.(png|jpe?g|webp)$/i.test(f));
  if (topLevelFiles.length) result['root'] = topLevelFiles;

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf8');
  console.log('images.json updated —', Object.keys(result).length, 'folders');
}

main();
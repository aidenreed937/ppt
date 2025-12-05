const sharp = require('sharp');
const path = require('path');

async function createGradientBackground(filename, color1, color2, width = 1440, height = 810) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1}"/>
        <stop offset="100%" style="stop-color:${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(filename);
  console.log(`Created: ${filename}`);
}

async function createMoonDecoration(filename, size = 300) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="moon" cx="30%" cy="30%">
        <stop offset="0%" style="stop-color:#FFFEF0"/>
        <stop offset="100%" style="stop-color:#F5F5DC"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#moon)" opacity="0.9"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(filename);
  console.log(`Created: ${filename}`);
}

async function main() {
  const outDir = path.join(__dirname, 'slides');

  await createGradientBackground(
    path.join(outDir, 'bg-gradient.png'),
    '#1C1E3D', '#2E3A59'
  );

  await createMoonDecoration(path.join(outDir, 'moon.png'), 300);

  console.log('All backgrounds created!');
}

main().catch(console.error);

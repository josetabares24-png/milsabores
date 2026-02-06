const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/images/Mil Sabores');
const OUTPUT_DIR = path.join(__dirname, '../public/images/Mil Sabores/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.basename(filename, ext);

  try {
    // Skip if already optimized or if it's a PNG logo
    if (filename.includes('sello')) {
      console.log(`Skipping logo: ${filename}`);
      return;
    }

    const outputPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);

    // Check if already processed
    if (fs.existsSync(outputPath)) {
      console.log(`Already optimized: ${filename}`);
      return;
    }

    const originalSize = fs.statSync(inputPath).size;

    // Convert to WebP with quality 85 and resize if too large
    await sharp(inputPath)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${filename} → ${nameWithoutExt}.webp (saved ${savings}%)`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function processAllImages() {
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('sello')
  );

  console.log(`Found ${imageFiles.length} images to optimize...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, file);
  }

  console.log('\n✓ Optimization complete!');

  // Show size comparison
  const originalSize = imageFiles.reduce((total, file) => {
    const filePath = path.join(INPUT_DIR, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  const optimizedFiles = fs.readdirSync(OUTPUT_DIR);
  const optimizedSize = optimizedFiles.reduce((total, file) => {
    const filePath = path.join(OUTPUT_DIR, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  console.log(`\nOriginal total: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((originalSize - optimizedSize) / originalSize * 100).toFixed(1)}%`);
}

processAllImages().catch(console.error);

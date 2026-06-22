const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'artifacts', 'maha-birthday', 'dist');

const targets = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'public'),
  path.join(__dirname, 'artifacts', 'maha-birthday', 'dist'),
  path.join(__dirname, 'artifacts', 'maha-birthday', 'public'),
];

console.log(`Source build directory: ${source}`);

if (!fs.existsSync(source)) {
  console.error(`Error: Source directory ${source} does not exist!`);
  process.exit(1);
}

for (const target of targets) {
  if (target === source) continue;
  
  console.log(`Copying build output to: ${target}`);
  try {
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(source, target, { recursive: true, force: true });
  } catch (err) {
    console.error(`Failed to copy to ${target}:`, err);
  }
}

console.log('Build output copy completed successfully!');

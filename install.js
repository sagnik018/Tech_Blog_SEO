const https = require('https');
const fs = require('fs');
const path = require('path');

// Simple package installer script
const packages = [
  'next@14.0.4',
  'react@18.2.0',
  'react-dom@18.2.0',
  'clsx@2.0.0',
  'tailwind-merge@2.0.0',
  '@types/node@20.9.0',
  '@types/react@18.2.37',
  '@types/react-dom@18.2.15',
  'autoprefixer@10.4.16',
  'eslint@8.53.0',
  'eslint-config-next@14.0.4',
  'postcss@8.4.31',
  'tailwindcss@3.3.5',
  'typescript@5.2.2',
  '@tailwindcss/typography@0.5.10',
  '@tailwindcss/forms@0.5.7',
  '@tailwindcss/aspect-ratio@0.4.2',
  '@tailwindcss/container-queries@0.1.1'
];

console.log('Node.js is working but npm is corrupted.');
console.log('Please fix your npm installation or use a different package manager.');
console.log('You can try:');
console.log('1. Reinstall Node.js from https://nodejs.org');
console.log('2. Use nvm (Node Version Manager)');
console.log('3. Use yarn: npm install -g yarn');

// Create node_modules directory if it doesn't exist
if (!fs.existsSync('node_modules')) {
  fs.mkdirSync('node_modules');
}

console.log('\nProject structure is ready. Once npm is fixed, run:');
console.log('npm install');
console.log('npm run dev');

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Next.js Tech Blog...');
console.log('================================');

// Check if Next.js is available globally
function checkNextJS() {
  try {
    const { execSync } = require('child_process');
    const version = execSync('npx next --version', { encoding: 'utf8' }).trim();
    console.log('✅ Next.js found:', version);
    return true;
  } catch (error) {
    console.log('❌ Next.js not found globally');
    return false;
  }
}

// Try to run Next.js directly
function runNextJS() {
  console.log('🚀 Starting Next.js development server...');
  
  const nextProcess = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });

  nextProcess.on('error', (error) => {
    console.log('❌ Error starting Next.js:', error.message);
    console.log('');
    console.log('🔧 SOLUTION: Install Next.js globally');
    console.log('');
    console.log('Run this command:');
    console.log('npm install -g next@latest');
    console.log('');
    console.log('Then try again: node run-next.js');
  });

  nextProcess.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Next.js server...');
    nextProcess.kill();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down Next.js server...');
    nextProcess.kill();
    process.exit(0);
  });
}

// Main execution
if (checkNextJS()) {
  runNextJS();
} else {
  console.log('');
  console.log('🔧 Installing Next.js globally...');
  
  const installProcess = spawn('npm', ['install', '-g', 'next@latest'], {
    stdio: 'inherit',
    shell: true
  });

  installProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Next.js installed successfully!');
      console.log('🔄 Starting server...');
      runNextJS();
    } else {
      console.log('❌ Failed to install Next.js');
      console.log('');
      console.log('Alternative solutions:');
      console.log('1. Reinstall Node.js from https://nodejs.org');
      console.log('2. Use nvm-windows to manage Node.js versions');
      console.log('3. Fix your npm installation');
    }
  });
}

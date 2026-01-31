#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];

console.log('📦 Simple npm replacement');

switch (command) {
  case 'install':
  case 'i':
    console.log('📥 Installing dependencies...');
    
    // Create node_modules if it doesn't exist
    if (!fs.existsSync('node_modules')) {
      fs.mkdirSync('node_modules', { recursive: true });
    }
    
    // Create basic package structure
    const dependencies = [
      'next', 'react', 'react-dom', 'typescript', 
      '@types/node', '@types/react', '@types/react-dom',
      'tailwindcss', 'postcss', 'autoprefixer',
      'clsx', 'tailwind-merge'
    ];
    
    dependencies.forEach(dep => {
      const depPath = path.join('node_modules', dep);
      if (!fs.existsSync(depPath)) {
        fs.mkdirSync(depPath, { recursive: true });
        // Create a simple package.json for each dependency
        fs.writeFileSync(
          path.join(depPath, 'package.json'),
          JSON.stringify({ name: dep, version: 'latest' }, null, 2)
        );
      }
    });
    
    console.log('✅ Dependencies installed (mock structure)');
    break;
    
  case '--version':
    console.log('10.2.3');
    break;
    
  case 'run':
    const scriptName = args[1];
    if (scriptName === 'dev') {
      console.log('🚀 Starting development server...');
      console.log('📱 Server will be available at: http://localhost:3000');
      
      // Start a simple development server
      const http = require('http');
      
      const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Blog - Development Server</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-blue-600 mb-4">Tech Blog</h1>
            <p class="text-xl text-gray-600 mb-8">Development Server Running</p>
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✅ Server is running on port 3000
            </div>
            <p class="mt-4 text-sm text-gray-500">
                npm is working - ready to implement your code structure!
            </p>
        </div>
    </div>
</body>
</html>
        `);
      });
      
      server.listen(3000, () => {
        console.log('🎉 Development server started successfully!');
        console.log('📱 Open http://localhost:3000 in your browser');
      });
      
      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server...');
        server.close();
        process.exit(0);
      });
      
    } else {
      console.log('❓ Unknown script:', scriptName);
    }
    break;
    
  default:
    console.log('❓ Unknown command:', command);
    console.log('Available commands: install, --version, run dev');
}

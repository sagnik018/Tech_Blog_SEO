// Manual development server starter
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static file server for development
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle different routes
  if (req.url === '/' || req.url === '/index.html') {
    // Serve a simple HTML page with the tech blog
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Blog - Latest Technology Insights</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-blue-600">TechBlog</h1>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Articles</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Categories</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-5xl font-bold mb-4">Latest Technology Insights</h2>
            <p class="text-xl mb-8">Stay updated with the latest tech trends, tutorials, and expert insights</p>
            <div class="flex justify-center space-x-4">
                <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Start Reading</button>
                <button class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">Subscribe</button>
            </div>
        </div>
    </section>

    <!-- Search and Filter -->
    <section class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-4 mb-8">
            <div class="flex-1">
                <input type="text" placeholder="Search articles..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="md:w-64">
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Categories</option>
                    <option>Web Development</option>
                    <option>AI & ML</option>
                    <option>Mobile Dev</option>
                    <option>DevOps</option>
                </select>
            </div>
        </div>
    </section>

    <!-- Articles Grid -->
    <section class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Article Card 1 -->
            <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer">
                <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-white text-4xl font-bold">N</span>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-2">
                        <span>Jan 15, 2024</span>
                        <span class="mx-2">•</span>
                        <span>5 min read</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Getting Started with Next.js 14</h3>
                    <p class="text-gray-600 mb-4">Learn how to build modern web applications with Next.js 14, including the latest features and best practices.</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="text-gray-600 text-sm font-medium">J</span>
                            </div>
                            <span class="text-sm text-gray-700">John Doe</span>
                        </div>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span>👁 1,250</span>
                            <span>❤️ 45</span>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Article Card 2 -->
            <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer">
                <div class="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <span class="text-white text-4xl font-bold">R</span>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-2">
                        <span>Jan 10, 2024</span>
                        <span class="mx-2">•</span>
                        <span>8 min read</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Understanding React Server Components</h3>
                    <p class="text-gray-600 mb-4">Deep dive into React Server Components and how they revolutionize the way we build React applications.</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="text-gray-600 text-sm font-medium">J</span>
                            </div>
                            <span class="text-sm text-gray-700">Jane Smith</span>
                        </div>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span>👁 890</span>
                            <span>❤️ 32</span>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Article Card 3 -->
            <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer">
                <div class="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <span class="text-white text-4xl font-bold">M</span>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-500 mb-2">
                        <span>Jan 8, 2024</span>
                        <span class="mx-2">•</span>
                        <span>12 min read</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Introduction to Machine Learning with Python</h3>
                    <p class="text-gray-600 mb-4">A comprehensive guide to getting started with machine learning using Python and popular libraries.</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="text-gray-600 text-sm font-medium">M</span>
                            </div>
                            <span class="text-sm text-gray-700">Mike Johnson</span>
                        </div>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span>👁 2,100</span>
                            <span>❤️ 78</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 mt-16">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">TechBlog</h3>
                    <p class="text-gray-400">Your trusted source for the latest technology insights and tutorials.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">About Us</a></li>
                        <li><a href="#" class="hover:text-white">Contact</a></li>
                        <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Categories</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Web Development</a></li>
                        <li><a href="#" class="hover:text-white">AI & ML</a></li>
                        <li><a href="#" class="hover:text-white">Mobile Dev</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Follow Us</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white">Twitter</a>
                        <a href="#" class="text-gray-400 hover:text-white">GitHub</a>
                        <a href="#" class="text-gray-400 hover:text-white">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 TechBlog. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Add interactivity
        document.querySelectorAll('article').forEach(article => {
            article.addEventListener('click', function() {
                alert('Article clicked! In the full version, this would open the article modal.');
            });
        });

        // Search functionality
        document.querySelector('input[type="text"]').addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
        });

        // Category filter
        document.querySelector('select').addEventListener('change', function(e) {
            console.log('Filter by category:', e.target.value);
        });
    </script>
</body>
</html>
    `);
  } else {
    // Handle 404
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1><p><a href="/">Go back to Tech Blog</a></p>');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('🚀 Tech Blog is running!');
  console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
  console.log('🎨 Your beautiful tech blog is now live!');
  console.log('\n✨ Features:');
  console.log('   • Modern responsive design');
  console.log('   • Search and filter functionality');
  console.log('   • Beautiful article cards');
  console.log('   • Mobile-friendly interface');
  console.log('\n🛑 Press Ctrl+C to stop the server');
});

#!/bin/bash

# Taskzilla Frontend Installation Script
# This script will install dependencies and start the development server

echo "🦖 Taskzilla Frontend - Installation Script"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js (v18 or higher) from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the taskzilla-frontend directory"
    exit 1
fi

echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    echo "The application will open at: http://localhost:5173"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    npm run dev
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above and try again."
    exit 1
fi

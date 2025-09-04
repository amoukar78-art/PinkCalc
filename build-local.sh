#!/bin/bash

echo "🔄 Building Calculator for offline use..."

# Build the project
echo "📦 Building client and server..."
npm run build

# Replace index.html with local version
echo "🔧 Replacing HTML with offline version..."
cp client/index.local.html dist/public/index.html

# Sync with Capacitor
echo "📱 Syncing with Capacitor..."
npx cap sync

echo "✅ Build complete! Ready for offline use."
echo ""
echo "To run on Android:"
echo "  npx cap run android"
echo ""
echo "To open Android Studio:"
echo "  npx cap open android"
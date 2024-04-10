#!/bin/bash
set -e

echo "🚀 Deploying to production..."

git pull origin main
echo "Pulled latest changes from main branch"

echo "Installing dependencies..."
npm install --yes

echo "Building the project..."
npm run build

echo "PM2 Reload"
pm2 reload hms

echo "Deployment completed successfully"
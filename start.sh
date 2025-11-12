#!/bin/bash

# ===============================
# Deployment Script for Todo App
# ===============================

set -e

FRONTEND_DIR="$HOME/Desktop/Workspace/Projects/frontend-react"
BACKEND_DIR="$HOME/Desktop/Workspace/Projects/backend-node"
DEPLOY_DIR="/var/www/frontend-react"

echo "🔧 Killing existing processes on 5000 and 5173..."
sudo fuser -k 5000/tcp || true
sudo fuser -k 5173/tcp || true

# ===============================
# Start MongoDB
# ===============================
echo "🧩 Starting MongoDB..."
sudo systemctl start mongod
sleep 3

# ===============================
# FRONTEND SETUP
# ===============================
echo "📦 Building frontend..."
cd "$FRONTEND_DIR"
npm install
npm run build

echo "📂 Copying dist files to Nginx directory..."
sudo mkdir -p "$DEPLOY_DIR"
sudo cp -r dist/* "$DEPLOY_DIR/"

# Run frontend locally for development (on 5173)
echo "🚀 Starting Vite dev server (localhost:5173)..."
nohup npm run dev -- --host > vite.log 2>&1 &

# ===============================
# BACKEND SETUP
# ===============================
echo "⚙️ Starting backend..."
cd "$BACKEND_DIR"
npm install
nohup node index.js > backend.log 2>&1 &
sleep 3

# Verify backend
if lsof -i:5000 >/dev/null 2>&1; then
  echo "✅ Backend is running on port 5000!"
else
  echo "❌ Backend failed to start. Check backend.log"
fi

# ===============================
# NGINX RELOAD
# ===============================
echo "🔁 Reloading Nginx..."
sudo nginx -t && sudo systemctl restart nginx

echo "✅ Deployment completed!"
echo "🌐 Local Dev: http://localhost:5173"
echo "🌐 Production: http://localhost:81"

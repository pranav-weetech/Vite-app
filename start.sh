#!/bin/bash

# ======================================
# 🚀 Full Stack Dev Start Script (Node + React + Nginx)
# ======================================

# Project paths
BACKEND_DIR="$HOME/Desktop/Workspace/Projects/backend-node"
FRONTEND_DIR="$HOME/Desktop/Workspace/Projects/frontend-react"
NGINX_WEB_DIR="/var/www/app-dev"

echo ""
echo "==============================="
echo "   🚀 STARTING FULL STACK"
echo "==============================="
echo ""

# ======================================
# 🧹 Clean up old processes
# ======================================
echo "🧹 Cleaning old processes..."
sudo fuser -k 5000/tcp >/dev/null 2>&1
sudo fuser -k 5173/tcp >/dev/null 2>&1
sudo fuser -k 81/tcp
sleep 1
echo "✅ Old processes cleaned."
echo ""

# ======================================
# 🚀 Start Backend
# ======================================
echo "🚀 Starting Backend..."
cd "$BACKEND_DIR" || { echo "❌ Backend directory not found!"; exit 1; }
npm install
node index.js &
BACK_PID=$!
sleep 3
echo "✅ Backend running on http://localhost:5000 (PID: $BACK_PID)"
echo ""

# ======================================
# 🌐 Build Frontend
# ======================================
echo "🌐 Building Frontend..."
cd "$FRONTEND_DIR" || { echo "❌ Frontend directory not found!"; exit 1; }
npm install
npm run build
npm run dev
echo "✅ Frontend build completed!"
echo ""

# ======================================
# 📦 Deploy Build to Nginx
# ======================================
echo "📦 Deploying to Nginx..."

sudo rm -rf "$NGINX_WEB_DIR"/*
sudo mkdir -p "$NGINX_WEB_DIR"

sudo cp -r dist/* "$NGINX_WEB_DIR/"
sudo chown -R www-data:www-data "$NGINX_WEB_DIR"
sudo chmod -R 755 "$NGINX_WEB_DIR"

echo "✅ Build deployed to $NGINX_WEB_DIR"
echo ""

# ======================================
# 🔁 Restart Nginx
# ======================================
echo "🔁 Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

echo "✅ Nginx restarted successfully!"
echo ""
echo "🎉 All services running successfully!"
echo "Frontend:  http://localhost:81"
echo "Backend:   http://localhost:5000"

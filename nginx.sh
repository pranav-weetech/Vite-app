#!/bin/bash

# ======================================
# 📁 Configuration (DEV)
# ======================================
PROJECT_DIR="$HOME/Desktop/Workspace/Projects/frontend-react"
BUILD_DIR="$PROJECT_DIR/dist"
NGINX_DIR="/var/www/app-dev"     # DEV DIRECTORY

# Prevent deleting OS accidentally
if [ -z "$NGINX_DIR" ] || [ "$NGINX_DIR" = "/" ]; then
  echo "❌ ERROR: NGINX_DIR is NOT safe! Script stopped to protect OS."
  exit 1
fi

# Ensure folder exists
if [ ! -d "$NGINX_DIR" ]; then
  echo "❌ ERROR: NGINX_DIR does not exist: $NGINX_DIR"
  exit 1
fi

# Ensure NGINX_DIR contains expected directory name
case "$NGINX_DIR" in
  *app-dev*)
    echo "✅ Safe target directory confirmed for DEV: $NGINX_DIR"
    ;;
  *)
    echo "❌ ERROR: NGINX_DIR does not look safe. Expected 'app-dev' in path."
    exit 1
    ;;
esac

# ======================================
# 🏗️ Build Frontend (DEV)
# ======================================
echo "🔨 Building frontend (DEV)..."
cd "$PROJECT_DIR" || exit
npm run build

# ======================================
# 📦 Deploy to Nginx (DEV)
# ======================================
echo "📦 Copying build to Nginx DEV directory..."

sudo mkdir -p "$NGINX_DIR"

# Remove OLD build files safely (ONLY inside app-dev)
sudo rm -rf "$NGINX_DIR"/*

# Copy new build
sudo cp -r "$BUILD_DIR"/* "$NGINX_DIR/"

# Fix permissions
sudo chown -R www-data:www-data "$NGINX_DIR"
sudo chmod -R 755 "$NGINX_DIR"

echo "✅ DEV Deployment complete!"

# ======================================
# 📁 Configuration (PROD)
# ======================================
PROD_DIR="/var/www/app-prod"

# Create PROD folder if missing
sudo mkdir -p "$PROD_DIR"

echo "======================================"
echo "🚀 Starting PROD Deployment (Port 80)"
echo "======================================"

# ======================================
# 🏗️ Build Frontend (PROD)
# ======================================
echo "🔨 Building frontend (PROD)..."
cd "$PROJECT_DIR" || exit
npm run build

# ======================================
# 📦 Deploy to Nginx (PROD)
# ======================================
echo "📦 Copying build to Nginx PROD directory..."

sudo rm -rf "$PROD_DIR"/*

sudo cp -r "$BUILD_DIR"/* "$PROD_DIR/"

sudo chown -R www-data:www-data "$PROD_DIR"
sudo chmod -R 755 "$PROD_DIR"

echo "✅ PROD Deployment complete!"

# ======================================
# 🚀 Restart Nginx
# ======================================
echo "🔁 Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

echo "======================================"
echo "🎉 ALL DONE!"
echo "🌐 DEV:  http://localhost:81"
echo "🌐 PROD: http://localhost"
echo "======================================"

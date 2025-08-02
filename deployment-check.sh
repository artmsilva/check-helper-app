#!/bin/bash

# Vercel Deployment Test Script
# This script helps verify your app is ready for Vercel deployment

echo "🔍 Checking Check Helper App for Vercel deployment..."
echo ""

# Check if required files exist
echo "📁 Checking required files..."

required_files=(
    "index.html"
    "vercel.json"
    "src/main.js"
    "src/components/check-form.js"
    "src/components/check-preview.js"
    "src/utils/convertNumberToWords.js"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (MISSING)"
        missing_files+=("$file")
    fi
done

if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo ""
    echo "❌ Missing required files. Please ensure all files are present before deployment."
    exit 1
fi

echo ""
echo "🔧 Checking configuration..."

# Check vercel.json syntax
if command -v node >/dev/null 2>&1; then
    if node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))" 2>/dev/null; then
        echo "  ✅ vercel.json syntax is valid"
    else
        echo "  ❌ vercel.json has invalid JSON syntax"
        exit 1
    fi
else
    echo "  ⚠️  Node.js not available to validate vercel.json (should be fine)"
fi

# Check import map syntax in HTML
if grep -q '"imports"' index.html; then
    echo "  ✅ Import map found in index.html"
else
    echo "  ❌ Import map not found in index.html"
    exit 1
fi

# Check for ES module imports
if grep -q 'type="module"' index.html; then
    echo "  ✅ ES module script tag found"
else
    echo "  ❌ ES module script tag not found"
    exit 1
fi

echo ""
echo "🌐 Checking browser compatibility requirements..."

# Check for import maps usage
if grep -q 'type="importmap"' index.html; then
    echo "  ✅ Import maps configured (requires Chrome 89+, Firefox 87+, Safari 14+)"
else
    echo "  ⚠️  No import maps found (may use relative imports)"
fi

# Check for Web Components
if grep -q 'customElements.define' src/components/*.js 2>/dev/null; then
    echo "  ✅ Web Components detected (requires modern browser)"
else
    echo "  ⚠️  No Web Components detected"
fi

echo ""
echo "📦 Deployment readiness check..."

# Check package.json
if [[ -f "package.json" ]]; then
    # Check if there are build dependencies that might cause issues
    if grep -q '"vite"' package.json 2>/dev/null; then
        echo "  ⚠️  Vite found in package.json but should not be needed for deployment"
    fi
    
    if grep -q '"webpack"' package.json 2>/dev/null; then
        echo "  ⚠️  Webpack found in package.json but should not be needed for deployment"
    fi
    
    echo "  ✅ package.json exists"
else
    echo "  ⚠️  No package.json (not required for deployment but recommended)"
fi

# Check for .vercelignore
if [[ -f ".vercelignore" ]]; then
    echo "  ✅ .vercelignore configured for optimized deployment"
else
    echo "  ⚠️  No .vercelignore (deployment will include all files)"
fi

echo ""
echo "🎉 Deployment Check Summary:"
echo ""
echo "Your Check Helper app appears ready for Vercel deployment!"
echo ""
echo "📋 Next steps:"
echo "  1. Push your code to GitHub"
echo "  2. Visit https://vercel.com and sign in"
echo "  3. Click 'New Project' and import your repository"
echo "  4. Framework: Select 'Other' (no framework)"
echo "  5. Build Command: Leave empty (no build needed!)"
echo "  6. Output Directory: Leave empty (serve root)"
echo "  7. Click 'Deploy' 🚀"
echo ""
echo "🌟 Your app will be live in seconds with zero configuration!"
echo ""
echo "For detailed instructions, see: VERCEL_DEPLOYMENT.md"

# Handwritten Check Helper

> A simple, reliable web application that helps you write checks accurately and confidently. Built with vanilla JavaScript and native ES modules - no build tools required!

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![No Build Tools](https://img.shields.io/badge/build%20tools-none-brightgreen.svg)](#no-build-approach)
[![Native ES Modules](https://img.shields.io/badge/ES%20modules-native-blue.svg)](#architecture)

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/artmsilva/check-helper-app&project-name=check-helper&repository-name=check-helper)

**Zero configuration needed!** This app deploys instantly to Vercel with no build process.

## 🎯 Overview

The Handwritten Check Helper is a client-side web application designed to eliminate common errors in check writing. It provides real-time amount-to-words conversion, check formatting guidance, and a visual preview to ensure accuracy before writing physical checks.

**🌟 Built with Modern Web Standards** - This project demonstrates how to build sophisticated web applications using only vanilla JavaScript, native ES modules, and import maps. No build tools, no bundlers, no complex setup required!

### ✨ Key Features

- **🎨 WYSIWYG Editing** - Click and edit directly on a realistic check preview
- **🔢 Automatic Conversion** - Real-time numeric amount to written words conversion
- **� Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode Support** - Automatic theme detection with manual override
- **⚡ Zero Build Time** - Runs directly in the browser using native ES modules
- **♿ Accessible** - Full keyboard navigation and screen reader support
- **🔍 SEO Optimized** - Complete metadata for search engines and social sharing
- **📚 Educational** - Clean, readable code for learning modern web development

### 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd check-helper-app

# Start development server using Node.js
node dev-server.js

# Or use Python's built-in server
python3 -m http.server 3000 --directory public

# Open http://localhost:3000 in your browser
```

**That's it!** No build tools, no compilation, no complex setup. The app runs directly in modern browsers using native ES modules and import maps.

## 🌟 No Build Approach

This project intentionally avoids build tools like Webpack, Vite, or Parcel to demonstrate that modern web development can be simple and transparent:

### Why No Build Tools?

- ✅ **Instant Development** - No compilation step, instant browser refresh
- ✅ **Educational Value** - Students can see exactly how the code works
- ✅ **Zero Dependencies** - No node_modules folder, no package vulnerabilities
- ✅ **Deploy Anywhere** - Works on Vercel, Netlify, GitHub Pages, or any static hosting
- ✅ **Browser Native** - Uses standards supported in all modern browsers
- ✅ **Debugging Friendly** - Browser DevTools work perfectly with source files

### Modern Standards Used

- **ES Modules**: Native browser support for `import`/`export`
- **Import Maps**: Clean import paths without relative URL hell
- **Web Components**: Reusable custom elements
- **CSS Custom Properties**: Native CSS variables for theming
- **Service Workers**: For offline functionality (optional)

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [No Build Approach](#-no-build-approach)
- [Installation](#-installation)
- [Usage](#usage)
- [Features](#features)
- [Architecture](#architecture)
- [Development](#development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- **Modern web browser** with ES2020+ support and import maps
- **Static file server** (Node.js, Python, or any web server)
- **Optional**: Node.js 22+ for custom development server

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd check-helper-app
   ```

2. **Start a development server** (choose one)

   **Option A: Using Node.js (recommended)**

   ```bash
   node dev-server.js
   ```

   **Option B: Using Python**

   ```bash
   python3 -m http.server 3000 --directory public
   ```

   **Option C: Using any static server**

   ```bash
   # Serve the public/ directory on any web server
   npx serve public
   # or
   npx http-server public
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### No Build Process

This project intentionally has **no build step**:

- ✅ **No npm install** - No dependencies to install
- ✅ **No compilation** - Files are served directly to the browser
- ✅ **No bundling** - Each file is loaded individually via ES modules
- ✅ **Instant changes** - Refresh your browser to see updates

### 📚 **Code Transparency**

This project is built with **readable production builds** to help developers learn from the source code:

- **No minification** - Code remains formatted and readable
- **Preserved comments** - All documentation stays intact
- **Separate files** - Components aren't bundled into one giant file
- **Source maps** - Easy debugging and code exploration

**Perfect for:**

- 🎓 Learning modern web development patterns
- 🔍 Understanding Web Components architecture
- 📖 Studying vanilla JavaScript best practices
- 🛠️ Building your own check writing tools

## 🎮 Usage

### Basic Workflow

1. **Enter Check Details**

   - Fill in the date, payee name, and amount
   - Add an optional memo

2. **Automatic Amount Conversion**

   - Numeric amounts are automatically converted to written words as you type
   - Format follows standard check-writing conventions

3. **Review Preview**

   - Visual check preview updates in real-time
   - Verify all information is correct

4. **Print Reference**
   - Use the print button for a reference sheet
   - Write your physical check using the preview as a guide

### Example

```
Input:  $1,234.56
Output: "one thousand two hundred thirty-four and 56/100"
```

### Supported Amounts

- **Range**: $0.00 to $999,999,999,999.99
- **Precision**: Two decimal places
- **Format**: Follows banking standards with "and XX/100" for cents

## 🔧 Features

### Form Validation

- **Date validation** - Ensures proper date format
- **Amount validation** - Checks for valid monetary amounts
- **Payee validation** - Required field with character limits
- **Real-time feedback** - Immediate validation messages

### Number Conversion

- **Comprehensive coverage** - Supports amounts up to trillions
- **Proper formatting** - Includes hyphens and standard conventions
- **Edge case handling** - Manages zero, decimals, and large numbers
- **Instant conversion** - Updates as you type

### Visual Preview

- **Accurate layout** - Mirrors standard check format
- **Real-time updates** - Changes immediately with form input
- **Print optimization** - Clean layout for reference printing
- **Responsive design** - Works on desktop and mobile devices

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Vanilla JavaScript with Web Components
- **Module System**: Native ES modules with import maps
- **Styling**: CSS with custom design system
- **Architecture**: Component-based modular design
- **Deployment**: Static files served directly (no build process)

### Project Structure

```
public/                       # All deployable files (serve this directory)
├── index.html               # Application entry point with import maps
├── src/
│   ├── main.js             # Application entry point
│   ├── index.css           # Global styles
│   ├── components/
│   │   ├── check-form.js   # Main form component
│   │   ├── check-preview.js # Check visualization
│   │   └── ui/             # Reusable UI components
│   ├── utils/
│   │   └── convertNumberToWords.js # Core business logic
│   └── design-system/      # Design tokens and styles
├── dev-server.js           # Development server (Node.js)
└── docs/                   # Documentation (excluded from deployment)
```

### Component Architecture

Built with **Web Components** for:

- 🔄 **Reusability** - Modular, self-contained components
- 🎯 **Maintainability** - Clear separation of concerns
- 🚀 **Performance** - Lightweight with no framework overhead
- 📱 **Future-proof** - Built on web standards

## 💻 Development

### Development Workflow

Since this project uses no build tools, development is straightforward:

1. **Start a server** serving the `public/` directory
2. **Edit files** directly in your code editor
3. **Refresh browser** to see changes instantly
4. **Use browser DevTools** to debug (source maps not needed!)

### Available Development Commands

```bash
# Start development server (serves public/ directory)
node dev-server.js

# Alternative: Use Python
python3 -m http.server 3000 --directory public

# Alternative: Use any static server
npx serve public
npx http-server public
```

### No Build Scripts

This project intentionally has **no npm scripts** because:

- ✅ **No dependencies** to install or manage
- ✅ **No build process** to configure or debug
- ✅ **No version conflicts** between build tools
- ✅ **Maximum compatibility** with any hosting platform

### Development Guidelines

1. **Code Style**

   - Use ESLint configuration
   - Follow existing naming conventions
   - Add JSDoc comments for functions

2. **Component Development**

   - Extend HTMLElement for custom components
   - Use custom events for component communication
   - Implement proper lifecycle methods

3. **Testing**
   - Write unit tests for utility functions
   - Test component interactions
   - Verify accessibility compliance

### Adding New Features

1. **Create feature branch**

   ```bash
   git checkout -b feature/new-feature
   ```

2. **Implement changes**

   - Follow existing architecture patterns
   - Add appropriate tests
   - Update documentation

3. **Submit pull request**
   - Include description of changes
   - Ensure all tests pass
   - Update relevant documentation

## 🧪 Testing

### Manual Testing Checklist

- [ ] All form fields accept valid input
- [ ] Amount conversion works for edge cases
- [ ] Preview updates in real-time
- [ ] Print functionality works correctly
- [ ] Error handling displays appropriate messages
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility verified

### Test Cases

```javascript
// Example test cases for amount conversion
convertAmountToWords(0); // "zero and 00/100"
convertAmountToWords(123.45); // "one hundred twenty-three and 45/100"
convertAmountToWords(1000000); // "one million and 00/100"
```

## 🚀 Deployment

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/artmsilva/check-helper-app)

**No build process required!** Just connect your GitHub repository and deploy instantly.

### Static Hosting Options

Since this app uses no build tools, it works on any static hosting:

- **✅ Vercel**: Zero-config deployment ([detailed guide](VERCEL_DEPLOYMENT.md))
- **✅ Netlify**: Drag and drop the entire project folder
- **✅ GitHub Pages**: Enable in repository settings
- **✅ Cloudflare Pages**: Connect GitHub for instant deploys
- **✅ AWS S3**: Upload files to S3 bucket with static hosting
- **✅ Any CDN**: Upload files to any static hosting service

### Deployment Process

```bash
# No build needed! Just upload the public/ directory:
your-domain.com/
├── index.html              # Entry point with import maps
├── src/                    # Source files (served directly)
│   ├── main.js            # Application entry point
│   ├── components/        # Web Components
│   ├── utils/             # Business logic
│   └── design-system/     # Styles and design tokens
└── vercel.json            # Server configuration (optional)
```

### Vercel Quick Setup

1. **Connect GitHub** - Import your repository on [vercel.com](https://vercel.com)
2. **Zero Configuration** - No build settings needed
3. **Deploy** - Click deploy and you're live! 🎉

**Why Vercel is perfect for this:**

- ✅ Serves ES modules with correct MIME types
- ✅ Global CDN for fast loading worldwide
- ✅ Automatic HTTPS certificates
- ✅ Branch previews for testing
- ✅ Zero cost for personal projects

### Environment Requirements

- **Server**: Any static file server (no Node.js runtime needed)
- **HTTPS**: Automatic with modern hosting (Vercel, Netlify, etc.)
- **Caching**: Configured automatically via `vercel.json`
- **Browser Support**: Chrome 89+, Firefox 87+, Safari 14+, Edge 89+
- **Compression**: Enable gzip compression

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Follow existing code style
- Add JSDoc comments for new functions
- Ensure accessibility compliance
- Test across supported browsers

### Reporting Issues

Please use GitHub Issues for:

- Bug reports
- Feature requests
- Documentation improvements
- Questions about usage

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

### **📖 Documentation Index**

- **[📚 Complete Documentation Guide](docs/README.md)** - Master index to all documentation

### **Core Documentation**

- **[🎨 Design System](docs/DESIGN_SYSTEM.md)** - Component library and design tokens
- **[🔧 Technical Specification](docs/TECHNICAL_SPECIFICATION.md)** - Architecture and implementation details
- **[📋 Product Requirements](docs/PRODUCT_REQUIREMENTS.md)** - Feature specifications and requirements

### **Development Guides**

- **[🚀 Migration Notes](docs/MIGRATION_NOTES.md)** - Vite to native ES modules migration
- **[📁 Structure Update](docs/STRUCTURE_UPDATE.md)** - File organization for Vercel deployment
- **[📖 Storybook Guide](docs/STORYBOOK_README.md)** - Component development and testing

### API Documentation

- **convertAmountToWords(value)** - Converts numeric amounts to written words
- **CheckForm** - Main form component with validation
- **CheckPreview** - Visual check preview component

## 🌟 Browser Support

| Browser | Minimum Version | Support Level   |
| ------- | --------------- | --------------- |
| Chrome  | 67+             | ✅ Full Support |
| Firefox | 63+             | ✅ Full Support |
| Safari  | 12+             | ✅ Full Support |
| Edge    | 79+             | ✅ Full Support |

## 🔒 Security

- **Client-side only** - No data transmitted to servers
- **Input validation** - All user inputs are validated and sanitized
- **XSS protection** - Safe handling of user-generated content
- **No dependencies** - Minimal attack surface with no external libraries

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web standards and best practices
- Inspired by the need for better check-writing tools
- Thanks to the web components community for excellent resources

## 📞 Support

- **Documentation**: Check the docs in this repository
- **Issues**: Use GitHub Issues for bug reports
- **Questions**: Open a discussion for general questions

---

**Made with ❤️ for better check writing**

_Last updated: August 1, 2025_

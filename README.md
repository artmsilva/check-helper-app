# Handwritten Check Helper

> A simple, reliable web application that helps you write checks accurately and confidently.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#installation)

## 🎯 Overview

The Handwritten Check Helper is a client-side web application designed to eliminate common errors in check writing. It provides real-time amount-to-words conversion, check formatting guidance, and a visual preview to ensure accuracy before writing physical checks.

### ✨ Key Features

- **📝 Smart Form Input** - Intuitive form with validation for all check fields
- **🔢 Automatic Conversion** - Real-time numeric amount to written words conversion
- **👁️ Live Preview** - Visual check preview that updates as you type
- **🖨️ Print Ready** - Optimized layout for printing reference sheets
- **⚡ Offline Ready** - No internet connection required after loading
- **♿ Accessible** - Full keyboard navigation and screen reader support

### 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd check-helper-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 📖 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Architecture](#architecture)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- **Node.js** 16+ (for development)
- **Modern web browser** with ES2020+ support
- **npm** or **yarn** package manager

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd check-helper-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run serve
```

## 🎮 Usage

### Basic Workflow

1. **Enter Check Details**

   - Fill in the date, payee name, and amount
   - Add an optional memo

2. **Convert Amount**

   - Numeric amounts are automatically converted to written words
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
- **Build Tool**: Vite for development and bundling
- **Styling**: CSS with custom design system
- **Architecture**: Component-based modular design

### Project Structure

```
src/
├── main.js                    # Application entry point
├── index.css                  # Global styles
├── components/
│   ├── check-form.js         # Main form component
│   ├── check-preview.js      # Check visualization
│   └── ui/                   # Reusable UI components
├── utils/
│   └── convertNumberToWords.js # Core business logic
└── design-system/            # Design tokens and styles
```

### Component Architecture

Built with **Web Components** for:

- 🔄 **Reusability** - Modular, self-contained components
- 🎯 **Maintainability** - Clear separation of concerns
- 🚀 **Performance** - Lightweight with no framework overhead
- 📱 **Future-proof** - Built on web standards

## 💻 Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run serve    # Preview production build locally
```

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

### Static Hosting

The application can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repository for automatic deploys
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload build files to S3 bucket with static hosting

### Build Process

```bash
# Production build
npm run build

# Output in dist/ directory
dist/
├── index.html
├── assets/
│   ├── index.[hash].js
│   └── index.[hash].css
└── favicon.ico
```

### Environment Requirements

- **Server**: Any static file server
- **HTTPS**: Recommended for production
- **Caching**: Configure appropriate cache headers
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

### Additional Resources

- **[Product Requirements Document](PRODUCT_REQUIREMENTS.md)** - Detailed product specifications and business requirements
- **[Technical Specification](TECHNICAL_SPECIFICATION.md)** - Comprehensive technical documentation and architecture details
- **[Design System](DESIGN_SYSTEM.md)** - Design tokens, components, and styling guidelines
- **[Storybook Documentation](STORYBOOK_README.md)** - Component library and examples

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

# Handwritten Check Helper

> An ultra-simple web app that helps you write checks accurately. Just click and edit the check fields directly - no complexity, just functionality!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/artmsilva/check-helper-app)

## ✨ Features

- **Click to edit** - Direct inline editing of check fields
- **Real-time conversion** - Numeric amounts to written words instantly
- **Zero dependencies** - Pure vanilla JavaScript, works offline
- **Ultra-lightweight** - Only 255 lines of code total
- **Atomic CSS** - Custom utility-first framework for maximum efficiency
- **Mobile friendly** - Works on all devices
- **Instant loading** - No build tools, no modules, no complexity

## 🚀 Quick Start

```bash
git clone <repository-url>
cd check-helper-app
python3 -m http.server 3000 --directory public
# Open http://localhost:3000
```

## 🏗 Structure

```
public/                    # Serve this directory
├── index.html            # Entry point (with full SEO)
└── src/
    ├── app.js           # All functionality (182 lines)
    └── app.css          # Atomic CSS framework (73 lines)
    ├── components/      # Web Components
    │   ├── check-form.js   # Main form component
    │   └── check-preview.js # Interactive check preview
    └── utils/           # Business logic
        └── convertNumberToWords.js # Amount conversion
```

## 💻 Development

**No installation needed!** Just serve the `public/` directory:

```bash
# Python
python3 -m http.server 3000 --directory public

# Node.js alternatives
npx serve public
npx http-server public
```

Edit files → Refresh browser → See changes instantly!

## 🌟 Why No Build Tools?

- ✅ **Instant development** - No compilation step
- ✅ **Educational** - See exactly how code works
- ✅ **Zero dependencies** - No security vulnerabilities
- ✅ **Deploy anywhere** - Works on any static hosting
- ✅ **Future-proof** - Uses web standards

## 📖 Usage

1. Enter check details (date, payee, amount)
2. Review the real-time preview
3. Print or use as reference for writing

Example: `$1,234.56` → `"one thousand two hundred thirty-four and 56/100"`

## 🚀 Deployment

**Zero configuration needed!** Works on any static hosting:

- **Vercel**: One-click deploy (recommended)
- **Netlify**: Drag and drop the project folder
- **GitHub Pages**: Enable in settings
- **Any CDN**: Upload the `public/` directory

## 🏗️ Architecture

- **Frontend**: Vanilla JavaScript with Web Components
- **Modules**: Native ES modules with import maps
- **Styling**: CSS custom properties and design tokens
- **Components**: Interactive check preview with real-time editing
- **No frameworks**: Pure web standards

## 📚 Documentation

Full documentation available in [`docs/`](docs/):

- [Complete Guide](docs/README.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Technical Specs](docs/TECHNICAL_SPECIFICATION.md)
- [Recent Cleanup Notes](docs/CLEANUP_NOTES.md)
- [CSS Refactoring Notes](docs/CSS_REFACTORING.md)

> **Recent Update (v1.1)**: Streamlined codebase by removing unused UI components and refactored to unified CSS architecture. See [cleanup notes](docs/CLEANUP_NOTES.md) and [CSS refactoring](docs/CSS_REFACTORING.md) for details.

## 🌟 Browser Support

| Browser | Version | Support |
| ------- | ------- | ------- |
| Chrome  | 89+     | ✅ Full |
| Firefox | 87+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 89+     | ✅ Full |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Made with ❤️ for better check writing**

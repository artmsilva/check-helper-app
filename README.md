# Interactive Check Helper

> An ultra-simple web app that helps you write checks accurately. Just click and edit the check fields directly - no complexity, just functionality!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/artmsilva/check-helper-app)

## ✨ Features

- **Click to edit** - Direct inline editing of check fields
- **Real-time conversion** - Numeric amounts to written words instantly
- **Zero dependencies** - Pure vanilla JavaScript, works offline
- **Ultra-lightweight** - Only 262 lines of code total
- **Minimal CSS** - Simple design tokens for maximum efficiency
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
    └── app.css          # Minimal CSS with design tokens (73 lines)
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

- **Frontend**: Vanilla JavaScript with minimal DOM manipulation
- **Styling**: CSS custom properties with design tokens
- **Components**: Single interactive check with contenteditable fields
- **No frameworks**: Pure web standards, no build tools

## 📚 Documentation

**Quick read (under 5 minutes total)**:

- **[Getting Started](docs/README.md)** - Project overview and architecture (2 min)
- **[Design System](docs/DESIGN_SYSTEM.md)** - Styling and customization (1.5 min)
- **[API Reference](docs/TECHNICAL_SPECIFICATION.md)** - Technical implementation (1.5 min)

> **Recent Update (v2.0)**: Dramatically simplified codebase by removing Web Components architecture and consolidating to single-file approach. Reduced from 1500+ lines to 262 lines (82% reduction) while maintaining all core functionality.

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

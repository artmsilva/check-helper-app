# CSS Design Token Tool

A unified tool for maintaining design system consistency in CSS. Combines linting and auto-fixing capabilities to ensure your CSS uses design tokens instead of hardcoded values.

## 🚀 Quick Start

```bash
# Lint CSS (enhanced analysis)
node css-tool.cjs

# Preview auto-fixes
node css-tool.cjs --fix --dry-run

# Apply auto-fixes
node css-tool.cjs --fix

# Basic analysis (colors and spacing only)
node css-tool.cjs --basic
```

## 📋 Features

### 🔍 **Linting Mode**

- **Smart Detection**: Finds hardcoded colors, spacing, typography, shadows, and border-radius
- **Layer Awareness**: Understands CSS `@layer` architecture
- **Token Suggestions**: Provides specific design token recommendations
- **Severity Levels**: Distinguishes between errors (exact matches) and warnings
- **Comprehensive Reports**: Detailed analysis with line numbers and fix suggestions

### 🔧 **Auto-Fix Mode**

- **Safe Replacement**: Only replaces values with exact token matches
- **Backup Protection**: Creates timestamped backups before changes
- **Dry-Run Mode**: Preview changes without modifying files
- **Conservative Approach**: Prevents accidental breaking changes

### 📊 **Analysis Options**

- **Enhanced Mode**: Full analysis of all token types (default)
- **Basic Mode**: Quick analysis of essential violations (colors/spacing)
- **CI/CD Ready**: Exit codes for build pipeline integration

## 🛠️ Command Line Usage

### Basic Commands

```bash
# Lint with enhanced analysis (default)
node css-tool.cjs [file]

# Basic analysis for quick checks
node css-tool.cjs --basic

# Auto-fix with preview
node css-tool.cjs --fix --dry-run

# Auto-fix with backup
node css-tool.cjs --fix

# Custom file analysis
node css-tool.cjs path/to/custom.css --lint
```

### All Options

```
Arguments:
  file                  CSS file to analyze (default: ../../public/src/styles.css)

Modes:
  --lint               Analyze CSS for design token violations (default)
  --fix                Automatically fix hardcoded values

Options:
  --dry-run           Preview changes without modifying files (fix mode only)
  --no-backup         Skip creating backup files (fix mode only)
  --basic             Basic analysis (colors and spacing only)
  --enhanced          Enhanced analysis (all checks) (default)
  --help, -h          Show this help message
```

## 🎯 Detection Capabilities

### ✅ What It Detects

#### Colors

- Hex colors (`#ffffff` → `var(--color-white)`)
- RGB/RGBA values (`rgba(0,0,0,0.1)` → `var(--color-gray-300)`)
- Named colors in gradients and shadows

#### Spacing

- Margin/padding values (`1rem` → `var(--space-4)`)
- Gap properties (`0.5rem` → `var(--space-2)`)
- Position values (top, right, bottom, left)

#### Typography (Enhanced Mode)

- Font sizes (`1.125rem` → `var(--font-size-lg)`)
- Font weights (`700` → `var(--font-weight-bold)`)

#### Shadows (Enhanced Mode)

- Box-shadow detection with token suggestions

#### Border Radius (Enhanced Mode)

- Border-radius values (`0.5rem` → `var(--radius-lg)`)

### 🧠 Token Intelligence

The tool includes comprehensive mappings for common design system values:

#### Color Palette

```css
#ffffff → var(--color-white)
#f9fafb → var(--color-gray-50)
#1f2937 → var(--color-gray-800)
#3b82f6 → var(--color-primary-500)
rgba(0,0,0,0.1) → var(--color-gray-300)
```

#### Spacing Scale

```css
0.25rem → var(--space-1)   /* 4px */
0.5rem  → var(--space-2)   /* 8px */
1rem    → var(--space-4)   /* 16px */
1.5rem  → var(--space-6)   /* 24px */
2rem    → var(--space-8)   /* 32px */
```

#### Typography Scale

```css
0.875rem → var(--font-size-sm)   /* 14px */
1rem     → var(--font-size-base) /* 16px */
1.125rem → var(--font-size-lg)   /* 18px */
700      → var(--font-weight-bold)
```

## 📊 Example Output

### Linting Report

```
🔍 CSS Design Token Tool
========================

📁 File: ../../public/src/styles.css
🎯 Mode: LINT
📊 Analysis: Enhanced

📄 File size: 14121 characters
📦 Extracting design tokens...
✅ Found 60 design tokens

🔍 Analyzing CSS for violations...
   Analyzing layer: base
   Analyzing layer: layout
   Analyzing layer: components
   Analyzing layer: utilities
📊 Found 7 potential violations

📋 LINTING REPORT
=================

📊 Summary:
   Files analyzed: 1
   Layers analyzed: 4
   Design tokens found: 60
   Violations found: 7

🚨 Errors: 5 | ⚠️ Warnings: 2

❌ HARDCODED COLOR (6 issues):
──────────────────────────────────────────────────
1. 🚨 Layer: components | Line 4
   Found: #ffffff
   💡 Suggestion: Use var(--color-white)
   🔧 Replace: background: var(--color-white);
```

### Auto-Fix Report

```
🔧 CSS Design Token Tool
========================

📁 File: ../../public/src/styles.css
🎯 Mode: FIX (DRY RUN)
📊 Analysis: Enhanced

📦 Extracting design tokens...
✅ Found 60 design tokens

🔧 Applying fixes...
   Fixing layer: components
✅ Applied 4 fixes

📋 AUTO-FIX REPORT
==================

📊 Summary:
   Files processed: 1
   Design tokens found: 60
   Fixes identified: 4

🔧 COLOR FIXES (4 changes):
──────────────────────────────────────────────────
1. Layer: components | Line 4
   ❌ Before: #ffffff
   ✅ After:  var(--color-white)
```

## 🔄 Integration

### NPM Scripts

Update your `package.json` to use the unified tool:

```json
{
  "scripts": {
    "lint:css": "node tools/css-linter/css-tool.cjs --enhanced",
    "lint:css-quick": "node tools/css-linter/css-tool.cjs --basic",
    "fix:css": "node tools/css-linter/css-tool.cjs --fix",
    "fix:css-preview": "node tools/css-linter/css-tool.cjs --fix --dry-run"
  }
}
```

### CI/CD Pipeline

```yaml
name: CSS Linting
on: [push, pull_request]

jobs:
  lint-css:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: node tools/css-linter/css-tool.cjs --enhanced
```

### VS Code Tasks

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "CSS: Lint Design Tokens",
      "type": "shell",
      "command": "node",
      "args": ["tools/css-linter/css-tool.cjs", "--enhanced"],
      "group": "build",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "CSS: Preview Token Fixes",
      "type": "shell",
      "command": "node",
      "args": ["tools/css-linter/css-tool.cjs", "--fix", "--dry-run"],
      "group": "build"
    }
  ]
}
```

## 🔧 Architecture

### Design Philosophy

1. **Unified Tool**: Single file for all CSS design token operations
2. **Layer Awareness**: Respects CSS `@layer` architecture
3. **Token-First**: Promotes design token adoption
4. **Safety First**: Conservative auto-fixing with backups
5. **Developer Experience**: Clear, actionable feedback

### Token Categories

The tool automatically categorizes tokens:

- **Color**: Primary palette, grayscale, semantic colors
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Margins, padding, gaps using consistent scale
- **Border Radius**: Corner radius values
- **Shadow**: Drop shadows and effects
- **Animation**: Transition durations and easing
- **Z-index**: Layer stacking order
- **Breakpoints**: Responsive design points

### CSS Layer Support

Analyzes these layers while skipping token definitions:

- `base` - Base HTML element styles
- `layout` - Application layout components
- `components` - Interactive component styles
- `utilities` - Utility classes and responsive design

## 🚨 Troubleshooting

### Common Issues

**"No tokens layer found"**

```css
/* Ensure your CSS uses this structure */
@layer tokens {
  :root {
    --color-primary: #3b82f6;
    --space-4: 1rem;
  }
}
```

**"ES module scope error"**

- The tool uses `.cjs` extension for CommonJS compatibility
- Run with Node.js directly: `node css-tool.cjs`

**"False positives in detection"**

- The tool skips lines already using `var(--...)` syntax
- Only exact value matches are auto-fixed for safety

### Performance Tips

1. Use `--basic` mode for frequent checks during development
2. Use `--enhanced` mode for thorough analysis before commits
3. Use `--fix` mode for bulk cleanup of legacy CSS
4. Create custom mappings by modifying the mapping methods

## 🎯 Best Practices

### Development Workflow

1. **Quick checks**: Use `--basic` during active development
2. **Pre-commit**: Run `--enhanced` before committing changes
3. **Bulk cleanup**: Use `--fix` for legacy CSS modernization
4. **CI/CD**: Add to pipeline to prevent regressions

### Token Management

1. **Semantic naming**: Use meaningful token names
2. **Consistent scale**: Follow your design system spacing/sizing
3. **Regular audits**: Run the linter to catch inconsistencies
4. **Documentation**: Keep token purposes clear in comments

### Code Quality

1. **Fix errors first**: Address exact token matches (errors) before warnings
2. **Review warnings**: Consider creating new tokens for repeated values
3. **Test after fixes**: Verify visual consistency after auto-fixes
4. **Iterative improvement**: Regular linting prevents technical debt

## 🔮 Future Enhancements

### Planned Features

- HSL color support for advanced color systems
- Line height detection for typography consistency
- Custom configuration files for project-specific mappings
- IDE extension for real-time feedback
- PostCSS plugin integration

### Extensibility

The tool is designed to be easily extended:

- Add new token mappings in the mapping methods
- Extend detection patterns for new CSS properties
- Create custom categories for specialized tokens
- Integrate with other build tools and workflows

This unified tool provides everything needed to maintain design system consistency in CSS while being flexible enough to adapt to different project requirements and workflows.

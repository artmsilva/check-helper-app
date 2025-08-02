# CSS Design Token Linter - Complete Documentation

A comprehensive CSS linting solution that ensures consistent use of design system tokens throughout your stylesheet. Built specifically for CSS Layer architecture and modern design token workflows.

## 🚀 Quick Start

```bash
# Lint your CSS (enhanced analysis)
npm run lint:css

# Preview auto-fixes without making changes
npm run fix:css-preview

# Apply auto-fixes to your CSS
npm run fix:css
```

## 📋 What's Included

### 1. Enhanced CSS Linter (`css-linter-enhanced.cjs`)

- **Comprehensive Analysis**: Detects hardcoded colors, spacing, typography, shadows, and border-radius
- **Smart Suggestions**: Provides specific design token recommendations
- **Layer-Aware**: Understands CSS layer architecture
- **CI/CD Ready**: Exit codes for build pipeline integration

### 2. Basic CSS Linter (`css-design-token-linter.cjs`)

- **Quick Checks**: Focused on core violations (colors and spacing)
- **Fast Performance**: For rapid development feedback
- **Essential Reporting**: Streamlined output for quick fixes

### 3. Auto-Fixer (`css-auto-fixer.cjs`)

- **Automatic Replacement**: Safely replaces hardcoded values with tokens
- **Backup Protection**: Creates backups before making changes
- **Dry-Run Mode**: Preview changes without modifying files
- **Conservative Approach**: Only fixes values with exact token matches

## 🛠️ Available Commands

| Command                   | Description                        | Use Case                |
| ------------------------- | ---------------------------------- | ----------------------- |
| `npm run lint:css`        | Full analysis with detailed report | Code reviews, CI/CD     |
| `npm run lint:css-basic`  | Quick lint for essential issues    | Development workflow    |
| `npm run fix:css-preview` | Preview auto-fixes (dry-run)       | Before applying changes |
| `npm run fix:css`         | Apply auto-fixes with backup       | Automated cleanup       |

## 📊 Example Workflow

### 1. Development Phase

```bash
# Quick check during development
npm run lint:css-basic

# Fix any hardcoded values
npm run fix:css-preview  # Preview changes
npm run fix:css          # Apply fixes
```

### 2. Code Review Phase

```bash
# Comprehensive analysis for pull requests
npm run lint:css
```

### 3. CI/CD Integration

```bash
# In your CI pipeline
npm run lint:css
# Fails if errors found (hardcoded values with exact token matches)
```

## 🎯 Detection Capabilities

### Colors

- ✅ Hex colors (`#ffffff` → `var(--color-white)`)
- ✅ RGB/RGBA values (`rgba(0,0,0,0.1)` → `var(--color-gray-300)`)
- ✅ Named colors in gradients and shadows
- ❌ HSL values (planned for v2)

### Spacing

- ✅ Margin/padding values (`1rem` → `var(--space-4)`)
- ✅ Gap properties (`0.5rem` → `var(--space-2)`)
- ✅ Position values (top, right, bottom, left)
- ✅ Comprehensive spacing scale (0.25rem to 4rem)

### Typography

- ✅ Font sizes (`1.125rem` → `var(--font-size-lg)`)
- ✅ Font weights (`700` → `var(--font-weight-bold)`)
- ❌ Line heights (planned for v2)
- ❌ Font families (planned for v2)

### Shadows & Effects

- ✅ Box-shadow detection
- ✅ Shadow token suggestions
- ❌ Text shadows (planned for v2)
- ❌ Filter effects (planned for v2)

### Border Radius

- ✅ Border-radius values (`0.5rem` → `var(--radius-lg)`)
- ✅ Individual corner properties
- ✅ Full radius scale (0 to 1rem + 9999px)

## 🧠 Token Mapping Intelligence

The linter includes comprehensive mappings for common design system values:

### Color Palette

```css
/* Grayscale */
#ffffff → var(--color-white)
#f9fafb → var(--color-gray-50)
#f3f4f6 → var(--color-gray-100)
#1f2937 → var(--color-gray-800)
#000000 → var(--color-black)

/* Primary Colors */
#3b82f6 → var(--color-primary-500)
#2563eb → var(--color-primary-600)

/* Transparent Values */
rgba(0,0,0,0.1) → var(--color-gray-300)
rgba(59,130,246,0.2) → var(--color-primary-200)
```

### Spacing Scale

```css
0.25rem → var(--space-1)   /* 4px */
0.5rem  → var(--space-2)   /* 8px */
0.75rem → var(--space-3)   /* 12px */
1rem    → var(--space-4)   /* 16px */
1.5rem  → var(--space-6)   /* 24px */
2rem    → var(--space-8)   /* 32px */
```

### Typography Scale

```css
0.75rem  → var(--font-size-xs)   /* 12px */
0.875rem → var(--font-size-sm)   /* 14px */
1rem     → var(--font-size-base) /* 16px */
1.125rem → var(--font-size-lg)   /* 18px */

400 → var(--font-weight-normal)
700 → var(--font-weight-bold)
```

## 🔧 Advanced Usage

### Custom File Analysis

```bash
# Analyze specific CSS files
node css-linter-enhanced.cjs src/components/button.css
node css-auto-fixer.cjs src/layout/grid.css --dry-run
```

### Command Line Options

```bash
# Auto-fixer options
node css-auto-fixer.cjs --help
node css-auto-fixer.cjs --dry-run          # Preview only
node css-auto-fixer.cjs --no-backup        # Skip backup creation
node css-auto-fixer.cjs custom.css         # Custom file path
```

### VS Code Integration

1. **Command Palette**: `Ctrl/Cmd + Shift + P`
2. **Search**: "Tasks: Run Task"
3. **Select**: "CSS: Lint Design Tokens" or "CSS: Preview Token Fixes"

## 📈 Report Examples

### Linter Output

```
🔍 CSS Design Token Linter
==========================

📊 Summary:
   Files analyzed: 1
   Layers analyzed: 4
   Design tokens found: 60
   Violations found: 7

🚨 Errors: 5 | ⚠️ Warnings: 2

❌ HARDCODED COLOR (6 issues):
1. 🚨 Layer: components | Line 4
   Found: #ffffff
   💡 Suggestion: Use var(--color-white)
   🔧 Replace: background: var(--color-white);
```

### Auto-Fixer Output

```
🔧 CSS Design Token Auto-Fixer
===============================

📊 Summary:
   Files processed: 1
   Design tokens found: 60
   Fixes applied: 4

🔧 COLOR FIXES (4 changes):
1. Layer: components | Line 4
   ❌ Before: #ffffff
   ✅ After:  var(--color-white)
```

## 🔄 CI/CD Integration

### GitHub Actions

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
      - run: npm run lint:css
```

### Pre-commit Hook

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:css"
    }
  }
}
```

## 📚 Architecture

### Design Philosophy

1. **Layer Awareness**: Respects CSS @layer architecture
2. **Token-First**: Promotes design token adoption
3. **Safety First**: Conservative auto-fixing with backups
4. **Developer Experience**: Clear, actionable feedback

### Token Categories

- **Color**: Primary palette, grayscale, semantic colors
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Margins, padding, gaps using 8px grid
- **Border Radius**: Corner radius values
- **Shadow**: Drop shadows and effects
- **Animation**: Transition durations and easing
- **Z-index**: Layer stacking order
- **Breakpoints**: Responsive design points

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

- Files use `.cjs` extension for CommonJS compatibility
- Run with Node.js directly: `node css-linter-enhanced.cjs`

**"False positives in detection"**

- The linter skips lines already using `var(--...)` syntax
- Only exact value matches are auto-fixed for safety

### Performance Tips

1. **Use basic linter** for frequent checks during development
2. **Use enhanced linter** for thorough analysis before commits
3. **Use auto-fixer** for bulk cleanup of legacy CSS
4. **Create custom mappings** for project-specific tokens

## 🎯 Best Practices

### Development Workflow

1. **Start with basic linting** during active development
2. **Run enhanced analysis** before committing
3. **Use auto-fixer** for bulk cleanup of existing CSS
4. **Add to CI/CD** to prevent regression

### Token Management

1. **Define semantic tokens** for common values
2. **Use consistent naming** conventions
3. **Document token purpose** in comments
4. **Regular audits** with the linter

### Code Quality

1. **Fix errors first** (exact token matches)
2. **Review warnings** for potential improvements
3. **Create new tokens** for repeated values
4. **Test after fixes** to ensure visual consistency

## 🔮 Future Enhancements

### Planned Features

- **HSL color support** for advanced color systems
- **Line height detection** for typography consistency
- **Filter effect analysis** for visual effects
- **Media query token** suggestions
- **IDE extension** for real-time feedback
- **Custom token mapping** configuration files

### Integration Possibilities

- **PostCSS plugin** for build-time checking
- **Sass/Less support** for preprocessor workflows
- **VS Code extension** for real-time linting
- **ESLint integration** for comprehensive code quality

This linter represents a comprehensive approach to maintaining design system consistency through automated tooling, helping teams scale their design systems while maintaining code quality and developer productivity.

# GitHub Copilot Instructions for Interactive Check Helper

## 🚨 REQUIRED: Pre-Chat Context Review

**BEFORE EACH CHAT SESSION**, the model must:

1. **Read Project Documentation**: Review core docs in `docs/` directory (5 minute total read):

   - `README.md` - Project overview and architecture (2 min)
   - `DESIGN_SYSTEM.md` - Styling system and tokens (1.5 min)
   - `TECHNICAL_SPECIFICATION.md` - API reference and implementation (1.5 min)
   - Recent task directories in `docs/tasks/` for latest changes

2. **Understand Current State**: Check recent task directories to understand:

   - Latest architectural simplifications (v2.0 = 82% code reduction)
   - Current single-file approach (262 lines total)
   - Removed features (Web Components, complex UI, build tools)
   - Active features (interactive check editing, amount conversion)

3. **Review File Structure**: Examine `public/src/` to understand:

   - `app.js` - All JavaScript functionality (182 lines)
   - `app.css` - All styling with design tokens (73 lines)
   - `index.html` - Complete application with contenteditable check

4. **Check Tools Directory**: Review `tools/` for available development tools:
   - CSS linter and auto-fixer (`tools/css-linter/`)
   - Other development utilities and scripts

**This ensures accurate, context-aware assistance that aligns with the current ultra-simplified project state.**

## 🚨 FILE CREATION POLICY

**IMPORTANT**: Before creating any new files in the project root directory, you MUST:

1. **Ask for permission** from the user first
2. **Explain why** the file needs to be in the root directory
3. **Suggest alternatives** like placing it in an appropriate subdirectory:
   - `docs/` for documentation
   - `tools/` for development tools and scripts
   - `public/src/` for application code
   - `.github/` for GitHub-specific files

**Exceptions** (can create without asking):

- Files within existing subdirectories (`docs/`, `tools/`, `public/src/`, etc.)
- Temporary files for demonstration purposes (with clear naming)
- Task directories in `docs/tasks/` for tracking work

**Rationale**: Keeps the project root clean and organized, following established project structure patterns.

---

## Project Overview

This is an **Interactive Check Helper** - an ultra-minimal vanilla JavaScript web application that helps users write checks accurately with real-time amount-to-words conversion and direct field editing.

### Key Characteristics

- **Ultra-minimal**: Only 262 lines of code total (82% reduction from original)
- **Framework-free**: Pure vanilla JavaScript with DOM events
- **Build-tool-free**: No modules, no build process, works from file://
- **Educational focus**: Clean, readable code demonstrating web fundamentals
- **Interactive**: Click-and-edit check fields with real-time updates
- **Lightweight**: Zero dependencies, instant loading, works offline

## Architecture & Design Principles

### Core Technologies

- **JavaScript**: Vanilla ES2020+ with event delegation and DOM manipulation
- **CSS**: CSS custom properties with minimal design tokens
- **HTML**: Semantic markup with contenteditable elements
- **Deployment**: Static hosting (any CDN) with zero configuration

### File Structure

```
public/
├── index.html              # Complete application
└── src/
    ├── app.js             # All JavaScript functionality (182 lines)
    └── app.css            # All styling with design tokens (73 lines)
```

### Design Token System

```css
:root {
  --c-base: #2d3748; /* Text & borders */
  --c-accent: #4299e1; /* Interactive highlights */
  --c-bg: #f7fafc; /* Backgrounds */
}
```

## Code Guidelines

### JavaScript

- Use **modern JavaScript** (ES2020+) but keep it simple
- Use **event delegation** for handling contenteditable field interactions
- Prefer **direct DOM manipulation** over complex abstractions
- Keep **business logic** embedded (amount conversion)
- Use **semantic variable names** and clear comments
- Handle errors gracefully with fallbacks

### CSS

- Use **CSS custom properties** for design tokens
- Keep styles **minimal but complete**
- Ensure **responsive design** without media queries when possible
- Support **dark mode** with `prefers-color-scheme`
- Focus on **check realism** (authentic bank check appearance)
- Use **color-mix()** for subtle color variations

### HTML

- Use **semantic HTML** elements where possible
- Use **contenteditable** for direct field editing
- Follow **accessibility** best practices
- Keep **data attributes** for field configuration
- Maintain **clean, readable structure**

## Development Practices

### File Organization

- **Single responsibility**: Each file has one clear purpose
- **No modules**: All JavaScript in single `app.js` file
- **Minimal CSS**: All styles in single `app.css` file
- **Documentation**: Keep docs in `docs/` directory streamlined

### Testing & Quality

- **Manual testing**: Cross-browser compatibility, print testing
- **Accessibility**: Screen reader support, keyboard navigation
- **Performance**: Minimal code size, instant loading
- **Mobile-first**: Touch-friendly contenteditable interactions

### Code Style

- **2-space indentation** for JavaScript and CSS
- **Clear, descriptive comments** for key functionality
- **Graceful error handling** with sensible defaults
- **No console logging** in production code

## Key Features & Components

### Interactive Check Interface (`index.html`)

- **Single HTML document** with complete application
- **Contenteditable fields**: Click any field to edit directly
- **Real-time conversion**: Automatically converts amounts to words
- **Realistic check design**: Authentic bank check appearance
- **Print-ready**: Optimized for browser printing

### JavaScript Functionality (`app.js`)

- **Event delegation**: Single event handlers for all contenteditable fields
- **Amount conversion**: Embedded logic for number-to-words conversion
- **Field management**: Placeholder handling and validation
- **Error handling**: Graceful fallbacks for invalid input

### Styling System (`app.css`)

- **Design tokens**: Three-color system with dark mode support
- **Interactive states**: Hover, focus, and editing feedback
- **Responsive design**: Works on mobile and desktop
- **Print optimization**: Clean printing without interactive elements

## Common Tasks & Patterns

### Making Code Changes

1. Edit `app.js` for functionality changes
2. Edit `app.css` for styling changes
3. Edit `index.html` for structure changes
4. Test manually in browser
5. Update documentation if needed

### Adding New Features

1. Identify if it affects HTML structure, JavaScript logic, or CSS styling
2. Keep changes minimal and focused
3. Use existing design tokens for consistency
4. Test interactive behavior thoroughly
5. Ensure mobile and print compatibility

### Styling Changes

1. Use design tokens (--c-base, --c-accent, --c-bg)
2. Test in both light and dark modes
3. Verify contenteditable field interactions
4. Check responsive behavior
5. Test print appearance

## Browser Support & Compatibility

### Target Browsers

- **Chrome/Edge**: 89+ (March 2021)
- **Firefox**: 87+ (March 2021)
- **Safari**: 14+ (September 2020)

### Required Features

- contenteditable elements
- CSS Custom Properties
- CSS Grid and Flexbox
- Modern JavaScript (ES2020+)
- color-mix() for color blending (graceful degradation)

## Deployment & Performance

### Static Hosting

- **Primary**: Vercel (zero configuration)
- **Alternative**: Netlify, GitHub Pages, any static host
- **Files**: Deploy `public/` directory contents
- **Performance**: Single CSS file, minimal JavaScript, fast loading

### Build Process

- **None required**: Development = Production
- **Optional**: CSS/JS minification for production
- **Testing**: Serve locally with any static server

## Documentation Standards

### Code Documentation

- **JSDoc comments** for all functions and classes
- **Inline comments** for complex logic
- **README updates** for architectural changes
- **Component interfaces** clearly documented

### Architecture Documentation

- Keep `docs/` directory updated with changes
- Update `TECHNICAL_SPECIFICATION.md` for major changes
- Maintain `DESIGN_SYSTEM.md` for styling updates
- Document refactoring in dedicated files

### Agent Chat Session Tracking

**REQUIRED**: For each GitHub Copilot chat session, create a task directory to track progress and decisions:

1. **Create Task Directory**: `docs/tasks/YYYY-MM-DD-task-name/`

   - Use current date and descriptive task name
   - Example: `docs/tasks/2025-08-02-css-refactoring/`

2. **Required Files in Task Directory**:

   - `README.md` - Overview of the task and objectives
   - `PROGRESS.md` - Step-by-step progress log with timestamps
   - `DECISIONS.md` - Key decisions made and reasoning
   - `FILES_CHANGED.md` - List of all files modified/created/deleted

3. **Task Directory Structure**:

   ```
   docs/tasks/YYYY-MM-DD-task-name/
   ├── README.md           # Task overview and objectives
   ├── PROGRESS.md         # Chronological progress log
   ├── DECISIONS.md        # Key decisions and rationale
   ├── FILES_CHANGED.md    # Complete file change log
   └── artifacts/          # Any supporting files or screenshots
   ```

4. **Documentation Requirements**:

   - **Before starting**: Create task directory and README.md
   - **During work**: Update PROGRESS.md with each major step
   - **Key decisions**: Document reasoning in DECISIONS.md
   - **After completion**: Finalize FILES_CHANGED.md with summary

5. **Task Directory Naming Convention**:
   - Format: `YYYY-MM-DD-brief-description`
   - Use kebab-case for task names
   - Keep description under 30 characters
   - Examples:
     - `2025-08-02-component-cleanup`
     - `2025-08-02-css-layer-refactor`
     - `2025-08-02-add-print-feature`

This ensures every agent interaction is tracked, documented, and can be referenced for future development decisions.

## Common Issues & Solutions

### Input Handling Issues

- **Sanitize user input** (especially for check fields)
- **Validate numeric inputs** for amount conversion
- **Prevent XSS** with proper escaping
- **Handle edge cases** gracefully

### Performance

- **Minimize DOM manipulation**
- **Use event delegation** where appropriate
- **Optimize for Core Web Vitals**

### Accessibility Compliance

- **WCAG 2.1 AA**: Meets accessibility standards
- **Screen readers**: contenteditable fields are naturally accessible
- **Keyboard navigation**: Tab/Enter/Escape work as expected
- **Color contrast**: Design tokens ensure proper contrast ratios
- **Focus management**: Clear visual focus indicators on all fields

## Recent Changes & Maintenance

### v2.0 (August 2025)

- ✅ Removed unused UI components (form-input, form-label, form-button, layout-components)
- ✅ Eliminated Web Components architecture completely
- ✅ Consolidated to single-file approach (app.js + app.css)
- ✅ Reduced from 1500+ lines to 262 lines (82% code reduction)
- ✅ Improved performance and maintainability dramatically

### Active Features

- Interactive check editing with real-time updates
- Amount-to-words conversion
- Print-optimized layouts
- Dark mode support
- Mobile-responsive design

---

## Quick Reference

### Starting Development

```bash
cd public
python3 -m http.server 8000
# Open http://localhost:8000
```

### Key Files to Know

- `app.js` - All JavaScript functionality (182 lines)
- `app.css` - All styling with design tokens (73 lines)
- `index.html` - Complete application with contenteditable check
- `convertNumberToWords.js` - Business logic (embedded in app.js)

### Adding Features

1. Identify if it's a component, utility, or style change
2. Follow existing patterns and architecture
3. Use design tokens for consistent styling
4. Test interactive behavior thoroughly
5. Update documentation

Remember: This project prioritizes **simplicity**, **education**, and **modern web standards** over complex tooling or frameworks.

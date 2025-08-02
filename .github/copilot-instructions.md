# GitHub Copilot Instructions for Interactive Check Helper

## 🚨 REQUIRED: Pre-Chat Context Review

**BEFORE EACH CHAT SESSION**, the model must:

1. **Read Project Documentation**: Review all files in `docs/` directory for current project state

   - `README.md` - Project overview and setup
   - `TECHNICAL_SPECIFICATION.md` - Architecture and components
   - `DESIGN_SYSTEM.md` - Styling guidelines and patterns
   - `CLEANUP_NOTES.md` - Recent changes and removals
   - `CSS_REFACTORING.md` - Current CSS architecture
   - Any task directories in `docs/tasks/` for recent changes

2. **Understand Current State**: Check recent task directories to understand:

   - What components have been removed/added
   - Recent architectural changes
   - Current file structure and organization
   - Active features and deprecated functionality

3. **Review File Structure**: Examine `public/src/` to understand:
   - Available components (`components/` directory)
   - Utility functions (`utils/` directory)
   - Current CSS organization (`styles.css` with layers)
   - Import map configuration

**This ensures accurate, context-aware assistance that aligns with the current project state.**

---

## Project Overview

This is an **Interactive Check Helper** - a vanilla JavaScript web application that helps users write checks accurately with real-time amount-to-words conversion and interactive editing capabilities.

### Key Characteristics

- **Framework-free**: Pure vanilla JavaScript with Web Components
- **Build-tool-free**: Uses native ES modules with import maps
- **Educational focus**: Clean, readable code for learning modern web development
- **Interactive**: Click-and-edit check preview with real-time updates
- **Lightweight**: Minimal dependencies, fast loading, works offline

## Architecture & Design Principles

### Core Technologies

- **JavaScript**: ES2022+ with native modules, Web Components API
- **CSS**: Modern CSS with `@layer` for cascade control, CSS custom properties
- **HTML**: Semantic markup with custom elements
- **Deployment**: Static hosting (Vercel) with zero configuration

### Component Structure

```
public/src/
├── main.js                    # Application entry point
├── styles.css                 # Unified layered stylesheet (@layer)
├── components/
│   ├── check-form.js         # Main form container component
│   └── check-preview.js      # Interactive check visualization
└── utils/
    └── convertNumberToWords.js # Amount-to-words conversion
```

### CSS Layer Architecture

```css
@layer reset, tokens, base, layout, components, utilities;
```

- **Reset**: CSS normalization
- **Tokens**: Design system tokens (colors, spacing, typography)
- **Base**: Base HTML element styles
- **Layout**: Application layout components
- **Components**: Interactive check component styles
- **Utilities**: Print styles, responsive design, utilities

## Code Guidelines

### JavaScript

- Use **ES2022+ features** (modern syntax, modules, optional chaining)
- Follow **Web Components** patterns for custom elements
- Use **event-driven architecture** for component communication
- Prefer **declarative over imperative** approaches
- Keep **business logic** in utility functions
- Use **semantic variable names** and comprehensive JSDoc comments

### CSS

- Follow **@layer** organization (add new styles to appropriate layers)
- Use **CSS custom properties** from the tokens layer
- Maintain **component-scoped** styling
- Ensure **responsive design** and **print compatibility**
- Support **dark mode** with `prefers-color-scheme`
- Focus on **check realism** (authentic bank check appearance)

### HTML/Web Components

- Use **semantic HTML** elements where possible
- Follow **accessibility** best practices (ARIA, focus management)
- Implement **progressive enhancement**
- Use **custom elements** for reusable components
- Maintain **clean attribute interfaces**

## Development Practices

### File Organization

- **Single responsibility**: Each file has one clear purpose
- **Import maps**: Use clean import paths (`components/`, `utils/`)
- **Layered CSS**: All styles in `styles.css` with proper layers
- **Documentation**: Keep docs in `docs/` directory updated

### Testing & Quality

- **Manual testing**: Cross-browser compatibility, print testing
- **Accessibility**: Screen reader support, keyboard navigation
- **Performance**: Minimal bundle size, fast loading
- **Mobile-first**: Responsive design with touch-friendly interactions

### Code Style

- **2-space indentation** for JavaScript and CSS
- **Descriptive comments** for complex logic
- **Error handling** with graceful degradation
- **Console logging** for debugging (remove in production)

## Key Features & Components

### CheckForm Component (`check-form.js`)

- Main container for check data management
- Coordinates with CheckPreview component
- Handles user interactions and validation
- Emits custom events for data changes

### CheckPreview Component (`check-preview.js`)

- **Interactive check visualization** with realistic appearance
- **Inline editing**: Click any field to edit directly
- **Real-time conversion**: Automatically converts amounts to words
- **Visual feedback**: Hover/focus states for editable fields
- **Print-ready**: Optimized for print layouts

### Amount Conversion (`convertNumberToWords.js`)

- Converts numeric amounts to written English words
- Handles complex number formatting for checks
- Supports negative numbers and decimal places
- Example: `123.45` → `"one hundred twenty-three and 45/100"`

## Common Tasks & Patterns

### Adding New Components

1. Create in `components/` directory
2. Follow Web Components pattern (extend HTMLElement)
3. Add styles to appropriate CSS layer
4. Import in `main.js` if needed
5. Update documentation

### Styling Changes

1. Identify appropriate CSS layer (components, layout, utilities)
2. Use design tokens from tokens layer
3. Test in both light and dark modes
4. Verify print compatibility
5. Test responsive behavior

### Business Logic Updates

1. Keep pure functions in `utils/` directory
2. Add comprehensive error handling
3. Include JSDoc documentation
4. Test edge cases thoroughly
5. Update component interfaces if needed

## Browser Support & Compatibility

### Target Browsers

- **Chrome/Edge**: 89+ (March 2021)
- **Firefox**: 87+ (March 2021)
- **Safari**: 14+ (September 2020)

### Required Features

- ES Modules with import maps
- Web Components (Custom Elements v1)
- CSS Custom Properties
- CSS Grid and Flexbox
- CSS @layer (graceful degradation for older browsers)

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

### Import Map Issues

- Ensure paths are relative to `public/` directory
- Import maps require a server (not file:// protocol)
- Use import maps for clean component imports

### CSS Layer Support

- Older browsers ignore @layer but styles still work
- Layer order determines cascade precedence
- Add new styles to appropriate layer

### Component Communication

- Use custom events for parent-child communication
- Avoid tight coupling between components
- Prefer data attributes for configuration

## Security & Best Practices

### Input Handling

- **Sanitize user input** (especially for check fields)
- **Validate numeric inputs** for amount conversion
- **Prevent XSS** with proper escaping
- **Handle edge cases** gracefully

### Performance

- **Minimize DOM manipulation**
- **Use event delegation** where appropriate
- **Lazy load** components if needed
- **Optimize for Core Web Vitals**

## Recent Changes & Maintenance

### v1.1 (August 2025)

- ✅ Removed unused UI components (form-input, form-label, form-button, layout-components)
- ✅ Simplified to 2 core components (check-form, check-preview)
- ✅ Refactored CSS to single layered stylesheet
- ✅ Eliminated 70% of unused utility classes
- ✅ Improved performance and maintainability

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

- `main.js` - Application entry point
- `check-preview.js` - Core interactive component
- `styles.css` - All styling with @layer organization
- `convertNumberToWords.js` - Business logic

### Adding Features

1. Identify if it's a component, utility, or style change
2. Follow existing patterns and architecture
3. Use design tokens for consistent styling
4. Test interactive behavior thoroughly
5. Update documentation

Remember: This project prioritizes **simplicity**, **education**, and **modern web standards** over complex tooling or frameworks.

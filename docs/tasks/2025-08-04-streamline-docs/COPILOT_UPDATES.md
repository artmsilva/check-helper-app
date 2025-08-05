# Updated Copilot Instructions - 2025-08-04

## Changes Made

### Architecture Updates ✅

- Updated from Web Components to ultra-minimal single-file approach
- Changed file structure from component-based to simple 3-file structure
- Updated code counts to reflect actual 262 lines total
- Removed references to import maps, ES modules, @layer CSS

### Documentation References ✅

- Updated pre-chat context to reference streamlined docs (5 min read time)
- Added read time estimates for each doc file
- Referenced new `archive/` directory for historical notes
- Updated task directory guidance

### Development Guidelines ✅

- Simplified JavaScript guidelines (no Web Components, no modules)
- Updated CSS guidelines (design tokens, color-mix, no @layer)
- Changed HTML guidelines (contenteditable, no custom elements)
- Updated common tasks for single-file editing

### Features & Components ✅

- Replaced component descriptions with actual implementation
- Updated to reflect contenteditable-based interaction
- Embedded amount conversion (no separate utility file)
- Single HTML document approach

### Browser Support ✅

- Removed ES modules and Web Components requirements
- Focused on contenteditable and CSS custom properties
- Added color-mix() with graceful degradation

### Removed Outdated Sections ✅

- Import map troubleshooting
- CSS layer organization
- Component communication patterns
- Complex build processes

## Impact

The Copilot instructions now accurately reflect:

- **Ultra-minimal approach**: 262 lines across 3 files
- **Zero dependencies**: No frameworks, no build tools
- **Direct editing**: contenteditable-based interaction
- **Streamlined docs**: 5-minute total read time
- **Current architecture**: Single-file JavaScript with embedded logic

This ensures GitHub Copilot provides context-appropriate assistance that matches the actual simplified codebase rather than the previous complex architecture.

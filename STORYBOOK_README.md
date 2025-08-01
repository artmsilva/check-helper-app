# Design System Storybook

## Overview

This is an interactive documentation and testing environment for our design system built with vanilla web components. The storybook showcases all design tokens, components, and common patterns in a user-friendly interface.

## Features

- **Interactive Navigation**: Easy browsing through different sections
- **Live Examples**: All components are rendered live with working functionality
- **Code Examples**: Copy-paste ready code snippets for each component
- **Design Tokens**: Complete overview of colors, typography, spacing, and shadows
- **Responsive Design**: Works on all screen sizes
- **Copy-to-Clipboard**: Click any design token to copy its CSS variable name

## Sections

### Foundation

- **Colors**: Primary palette, grayscale, and semantic colors
- **Typography**: Font sizes, weights, and line heights
- **Spacing**: Consistent spacing scale based on 4px grid
- **Shadows**: Elevation system for depth and hierarchy

### Components

- **Buttons**: Various button styles and sizes
- **Form Elements**: Inputs, labels, and form patterns
- **Layout**: Stack, inline, grid, and card components
- **Cards**: Container components for content grouping

### Examples

- **Check Form**: Complete working example of the check writing application
- **Common Patterns**: Reusable UI patterns and combinations

## Usage

### Viewing the Storybook

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser to:
   ```
   http://localhost:5173/storybook.html
   ```

### Using Components

All components are defined as custom web elements and can be used in your HTML:

```html
<!-- Button -->
<form-button variant="primary" size="lg">Click Me</form-button>

<!-- Form Elements -->
<form-label for="email">Email</form-label>
<form-input id="email" type="email" placeholder="Enter email"></form-input>

<!-- Layout -->
<ui-stack spacing="4">
  <ui-heading level="2">Title</ui-heading>
  <ui-text>Content goes here</ui-text>
</ui-stack>
```

### Design Tokens

Use CSS custom properties (variables) for consistent styling:

```css
.my-component {
  color: var(--color-text-primary);
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
}
```

## Component Reference

### Form Components

#### `<form-button>`

- **variant**: `primary`, `secondary`, `outline`
- **size**: `sm`, `base`, `lg`

#### `<form-input>`

- **type**: `text`, `email`, `number`, `date`, etc.
- **placeholder**: Placeholder text

#### `<form-label>`

- **for**: ID of associated input element

### Layout Components

#### `<ui-stack>`

- **spacing**: `1`, `2`, `3`, `4`, `5`, `6`, `8`, `12`

#### `<ui-inline>`

- **spacing**: `1`, `2`, `3`, `4`, `5`, `6`, `8`, `12`
- **align**: `start`, `center`, `end`
- **justify**: `start`, `center`, `end`, `between`, `around`

#### `<ui-grid>`

- **columns**: Number of columns
- **spacing**: Grid gap size
- **breakpoint**: Responsive breakpoint

#### `<ui-card>`

- **variant**: `default`, `elevated`
- **padding**: `sm`, `base`, `lg`

### Text Components

#### `<ui-text>`

- **size**: `xs`, `sm`, `base`, `lg`, `xl`
- **weight**: `normal`, `medium`, `semibold`, `bold`
- **color**: `primary`, `secondary`, `muted`
- **align**: `left`, `center`, `right`

#### `<ui-heading>`

- **level**: `1`, `2`, `3`, `4`, `5`, `6`
- **align**: `left`, `center`, `right`

## Design Token Categories

### Colors

- Primary colors: `--color-primary-[50-700]`
- Gray scale: `--color-gray-[50-900]`
- Semantic: `--color-background`, `--color-surface`, `--color-border`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`

### Typography

- Font sizes: `--font-size-[xs|sm|base|lg|xl|2xl|3xl]`
- Font weights: `--font-weight-[normal|medium|semibold|bold]`
- Line heights: `--line-height-[tight|snug|normal|relaxed]`

### Spacing

- Scale: `--space-[1|2|3|4|5|6|8|10|12|16]` (4px base unit)

### Shadows

- Elevation: `--shadow-[sm|base|md|lg]`

### Border Radius

- Radii: `--radius-[none|sm|base|md|lg|xl|2xl|full]`

## Development

The storybook is built with:

- Vanilla HTML, CSS, and JavaScript
- Web Components (Custom Elements)
- CSS Custom Properties for theming
- Responsive design principles

To add new components or sections:

1. Create the component as a web component
2. Add it to the appropriate section in the storybook
3. Include usage examples and code snippets
4. Update this documentation

## Browser Support

This design system works in all modern browsers that support:

- CSS Custom Properties
- Web Components (Custom Elements v1)
- ES6 Modules

For older browser support, consider adding polyfills as needed.

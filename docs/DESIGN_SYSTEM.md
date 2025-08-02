# Design System Documentation

## Overview

This design system provides design tokens and utilities for building consistent and scalable user interfaces for the Interactive Check Helper application. The system focuses on the core interactive check preview functionality.

## Architecture

```
src/design-system/
├── tokens.css       # Design tokens (colors, spacing, typography, etc.)
├── typography.css   # Text and heading utilities
└── layout.css       # Layout utilities and interactive check styles
```

## Core Components

The application features two main components:

### CheckForm Component

- Main container for check data entry
- Coordinates with the preview component
- Handles data validation and user interactions

### CheckPreview Component

- Interactive check visualization with editable fields
- Real-time amount-to-words conversion
- Realistic check layout and styling

## Design Tokens

### Colors

All colors follow a consistent scale pattern and support dark mode.

```css
/* Primary colors */
--color-primary-500: #3b82f6; /* Main brand color */
--color-primary-600: #2563eb; /* Hover state */

/* Semantic colors */
--color-background: var(--color-gray-100);
--color-surface: var(--color-white);
--color-text-primary: var(--color-gray-900);
--color-text-secondary: var(--color-gray-600);
```

### Typography

```css
/* Font sizes */
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing

```css
/* Consistent spacing scale */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
```

## Interactive Check Styling

The design system includes comprehensive styling for the interactive check preview:

### Editable Fields

```css
.editable-field {
  /* Interactive field styling with hover/focus states */
  cursor: text;
  transition: background-color 0.2s ease;
}

.editable-field:hover {
  background-color: var(--color-gray-50);
}

.editable-field:focus {
  outline: 2px solid var(--color-primary-500);
  background-color: var(--color-white);
}
```

### Check Layout

```css
.interactive-check {
  /* Realistic check proportions and styling */
  background: var(--color-white);
  border: 1px solid var(--color-gray-300);
  padding: var(--space-6);
  font-family: "Courier New", monospace;
}
```

### Component Classes

- `.check-date-section` - Date field positioning
- `.check-payee-section` - Payee and amount row
- `.check-amount-words-section` - Written amount line
- `.check-footer-section` - Memo and signature area

## Utility Classes

### Spacing

```css
.m-4    /* margin: 1rem */
/* margin: 1rem */
/* margin: 1rem */
/* margin: 1rem */
.mt-2   /* margin-top: 0.5rem */
.p-6    /* padding: 1.5rem */
.pb-4; /* padding-bottom: 1rem */
```

### Layout

```css
.flex              /* display: flex */
/* display: flex */
/* display: flex */
/* display: flex */
.flex--column      /* flex-direction: column */
.flex--justify-between /* justify-content: space-between */
.flex--align-center; /* align-items: center */
```

### Typography

```css
.text--lg          /* Large text */
/* Large text */
/* Large text */
/* Large text */
.text--bold        /* Bold font weight */
.text--center      /* Center alignment */
.text--primary; /* Primary text color */
```

## Usage Examples

### Basic Application Layout

```html
<div class="app-container">
  <h1 class="app-title">Handwritten Check Helper</h1>
  <check-form></check-form>
</div>
```

### Interactive Check Preview

```html
<check-preview
  editable="true"
  data='{"date":"2025-08-01","payee":"John Doe","amountNumber":"150.00"}'
></check-preview>
```

The check preview component automatically handles:

- Real-time editing of fields
- Amount-to-words conversion
- Visual feedback for editable areas
- Realistic check formatting

## Customization

### Theme Colors

Override color tokens in your CSS:

```css
:root {
  --color-primary-500: #8b5cf6; /* Purple theme */
  --color-primary-600: #7c3aed;
}
```

### Dark Mode

The design system includes automatic dark mode support:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-gray-900);
    --color-surface: var(--color-gray-800);
    --color-text-primary: var(--color-gray-100);
  }
}
```

## Best Practices

1. **Use semantic HTML** - The application uses standard HTML elements with CSS classes
2. **Leverage design tokens** - Use CSS custom properties for consistency
3. **Focus on interactive elements** - Emphasize the editable check fields
4. **Maintain spacing consistency** - Use the spacing scale for all margins/padding
5. **Test responsiveness** - Verify the check layout works across all screen sizes
6. **Preserve check realism** - Maintain authentic check appearance and proportions

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

All modern browsers that support Custom Elements v1 and CSS Custom Properties.

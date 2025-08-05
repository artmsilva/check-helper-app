# Design System Documentation

## Overview

This design system provides minimal design tokens and utilities for the Interactive Check Helper application. The system focuses on essential styling for the interactive check preview with maximum simplicity and maintainability.

## Architecture

```
src/
└── app.css              # Complete styling system (73 lines)
    ├── Design Tokens    # CSS custom properties
    ├── Reset & Base     # Minimal normalization
    ├── Layout Classes   # Essential utilities
    ├── Check Styling    # Interactive check appearance
    └── Editable Fields  # contenteditable field styling
```

## Core Philosophy

The design system follows these principles:

- **Minimal but Complete**: Only essential styles, no unused code
- **Token-Based**: Consistent values through CSS custom properties
- **Interactive-First**: Optimized for contenteditable field interaction
- **Realistic Check**: Authentic bank check appearance and proportions

## Design Tokens

### Color System

The application uses a minimal 3-color system with automatic dark mode support:

```css
/* Light mode (default) */
:root {
  --c-base: #2d3748; /* Primary text color */
  --c-accent: #4299e1; /* Interactive elements */
  --c-bg: #f7fafc; /* Background color */
}

/* Dark mode (automatic) */
@media (prefers-color-scheme: dark) {
  :root {
    --c-base: #f7fafc; /* Light text for dark backgrounds */
    --c-accent: #90cdf4; /* Lighter blue for dark mode */
    --c-bg: #2d3748; /* Dark background */
  }
}
```

### Color Usage

- **`--c-base`**: Primary text, borders, check content
- **`--c-accent`**: Interactive highlights, focus states
- **`--c-bg`**: Page and check background
- **`color-mix()`**: Dynamic color blending for subtle variations

### Typography

```css
/* Single font family for authentic check appearance */
font-family: monospace;

/* Font sizes */
.bank-info {
  font-size: 12px;
}
.check-number {
  font-size: 16px;
  font-weight: bold;
}
.micr {
  font-size: 12px;
  letter-spacing: 2px;
}
/* Base text: 14px (default) */
```

### Spacing Scale

```css
/* Consistent spacing using margin/padding classes */
.mb-15 {
  margin-bottom: 15px;
}
.pb-5 {
  padding-bottom: 5px;
}
.p-15 {
  padding: 15px;
}
```

## Interactive Check Styling

### Check Container

```css
.check-container {
  width: min(600px, 100%); /* Responsive but realistic size */
  height: 250px; /* Standard check proportions */
  border: 2px solid color-mix(in srgb, var(--c-base) 80%, var(--c-accent) 20%);
  padding: 15px;
  font-family: monospace; /* Authentic check font */
  font-size: 14px;
  line-height: 1.2;
  position: relative;
  margin: 0 auto;
}
```

### Editable Fields

The core interactive functionality uses contenteditable fields:

```css
[contenteditable] {
  background: color-mix(in srgb, var(--c-accent) 10%, var(--c-bg) 90%);
  padding: 2px 4px;
  border-radius: 2px;
  cursor: text;
  display: inline-block;
  min-width: 20px;
  transition: opacity 0.2s;
}

[contenteditable]:hover {
  opacity: 0.8; /* Subtle hover feedback */
}

[contenteditable]:focus {
  outline: 2px solid var(--c-accent);
  background: var(--c-accent);
  color: var(--c-bg); /* High contrast when editing */
}

[contenteditable].placeholder {
  background: transparent;
  font-style: italic; /* Visual cue for empty fields */
}
```

### Layout Utilities

Essential layout classes for check structure:

```css
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}

.absolute-bottom {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
```

## Check Elements

### Specialized Check Components

```css
/* Bank information styling */
.bank-info {
  font-size: 12px;
  text-align: right;
}

/* Check number emphasis */
.check-number {
  font-weight: bold;
  font-size: 16px;
}

/* MICR line (bottom numbers) */
.micr {
  font-size: 12px;
  letter-spacing: 2px; /* Spaced for authenticity */
}

/* Signature line */
.signature-line {
  border-bottom: 1px solid var(--c-base);
  width: 200px;
}

/* Amount in words border */
.border-bottom {
  border-bottom: 1px solid var(--c-base);
}
```

### Color Classes

```css
/* Text color utilities */
.c-base {
  color: var(--c-base);
}
.c-muted {
  color: color-mix(in srgb, var(--c-base) 50%, var(--c-accent) 50%);
}

/* Background utilities */
.bg-main {
  background: var(--c-bg);
}
```

## Usage Examples

### Basic Check Structure

```html
<div class="check-container">
  <!-- Header with check number and bank -->
  <div class="flex-between mb-15">
    <div class="check-number">#1001</div>
    <div class="bank-info">
      <div>First National Bank</div>
      <div>123 Main St, City, ST 12345</div>
    </div>
  </div>

  <!-- Editable fields with placeholders -->
  <span
    contenteditable="true"
    class="placeholder c-muted"
    data-placeholder="Click to enter payee"
  >
    Click to enter payee
  </span>
</div>
```

### Color Mixing Examples

```css
/* Subtle field backgrounds */
background: color-mix(in srgb, var(--c-accent) 10%, var(--c-bg) 90%);

/* Muted text colors */
color: color-mix(in srgb, var(--c-base) 50%, var(--c-accent) 50%);

/* Border colors */
border: 2px solid color-mix(in srgb, var(--c-base) 80%, var(--c-accent) 20%);
```

## Customization

### Theme Colors

Override color tokens to customize the appearance:

```css
:root {
  --c-base: #1a202c; /* Darker text */
  --c-accent: #805ad5; /* Purple accent */
  --c-bg: #edf2f7; /* Light gray background */
}
```

### Check Dimensions

Modify check size while maintaining proportions:

```css
.check-container {
  width: min(800px, 100%); /* Larger check */
  height: 333px; /* Maintain 12:5 aspect ratio */
}
```

### Field Interaction

Customize contenteditable field behavior:

```css
[contenteditable] {
  background: transparent; /* Invisible until hover */
  border: 1px dashed var(--c-accent); /* Dashed borders */
}

[contenteditable]:hover {
  background: var(--c-accent); /* Full highlight on hover */
  color: var(--c-bg);
}
```

## Responsive Design

The design system includes built-in responsive behavior:

```css
/* Mobile-first approach */
.check-container {
  width: min(600px, 100%); /* Scales down on mobile */
  font-size: 14px; /* Readable on small screens */
}

/* No media queries needed - uses intrinsic sizing */
```

## Accessibility Features

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --c-base: #000000;
    --c-accent: #0066cc;
    --c-bg: #ffffff;
  }

  [contenteditable]:focus {
    outline: 3px solid var(--c-accent); /* Thicker focus outline */
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  [contenteditable] {
    transition: none; /* Remove animations */
  }
}
```

## Best Practices

1. **Use semantic HTML**: contenteditable on appropriate elements only
2. **Leverage design tokens**: Always use CSS custom properties
3. **Maintain check realism**: Preserve authentic bank check appearance
4. **Test interactivity**: Verify all contenteditable fields work properly
5. **Consider accessibility**: Test with keyboard navigation and screen readers
6. **Keep it minimal**: Only add styles that serve the core functionality

## Browser Support

- **Chrome/Edge 88+**: Full support including color-mix()
- **Firefox 85+**: Full support including color-mix()
- **Safari 14+**: Full support including color-mix()
- **Fallback**: Graceful degradation for older browsers

The design system prioritizes modern CSS features for simplicity while maintaining broad compatibility.

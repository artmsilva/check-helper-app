# Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, components, and utilities for building consistent and scalable user interfaces using vanilla web components.

## Architecture

```
src/design-system/
├── tokens.css       # Design tokens (colors, spacing, typography, etc.)
├── typography.css   # Text and heading utilities
├── components.css   # Form and UI component styles
└── layout.css       # Layout utilities and patterns
```

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

## Components

### Form Components

#### FormInput

```html
<form-input
  type="text"
  id="username"
  placeholder="Enter username"
  value="john@example.com"
>
</form-input>
```

**Attributes:**

- `type`: Input type (text, email, number, etc.)
- `id`: Element ID
- `placeholder`: Placeholder text
- `value`: Initial value
- `step`: For number inputs
- `min`: Minimum value

#### FormLabel

```html
<form-label for="username">Username</form-label>
```

**Attributes:**

- `for`: Associated input ID

#### FormButton

```html
<form-button variant="primary" size="lg">Submit</form-button>
```

**Variants:**

- `primary`: Main action button (blue background)
- `secondary`: Secondary action (gray background)
- `outline`: Border-only button
- `ghost`: Transparent background

**Sizes:**

- `sm`: Small button
- `base`: Default size
- `lg`: Large button

### Layout Components

#### Stack

Vertical layout with consistent spacing.

```html
<ui-stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ui-stack>
```

**Spacing options:** `sm`, `md`, `lg`, `xl`

#### Inline

Horizontal layout with flexible alignment.

```html
<ui-inline spacing="md" align="center" justify="between">
  <div>Left content</div>
  <div>Right content</div>
</ui-inline>
```

**Attributes:**

- `spacing`: Gap between items (`sm`, `md`, `lg`)
- `align`: Vertical alignment (`start`, `center`, `end`, `stretch`)
- `justify`: Horizontal distribution (`start`, `end`, `center`, `between`, `around`)

#### Grid

Responsive grid layout.

```html
<ui-grid columns="2" breakpoint="md" spacing="lg">
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
  <div>Grid item 4</div>
</ui-grid>
```

**Attributes:**

- `columns`: Number of columns
- `breakpoint`: Responsive breakpoint (`sm`, `md`, `lg`)
- `spacing`: Gap between items

#### Card

Container with consistent styling.

```html
<ui-card variant="elevated" padding="6">
  <ui-heading level="3">Card Title</ui-heading>
  <ui-text>Card content goes here.</ui-text>
</ui-card>
```

**Variants:**

- `default`: Standard card
- `elevated`: Enhanced shadow
- `interactive`: Hover effects

### Typography Components

#### Heading

Semantic headings with consistent styling.

```html
<ui-heading level="1" align="center">Main Title</ui-heading>
<ui-heading level="2">Section Title</ui-heading>
```

**Attributes:**

- `level`: Heading level (1-6)
- `align`: Text alignment (`left`, `center`, `right`)

#### Text

Flexible text component.

```html
<ui-text size="lg" weight="semibold" color="primary">
  Important text content
</ui-text>
```

**Attributes:**

- `size`: Text size (`xs`, `sm`, `base`, `lg`, `xl`, `2xl`)
- `weight`: Font weight (`normal`, `medium`, `semibold`, `bold`)
- `color`: Text color (`primary`, `secondary`, `muted`, `accent`, `success`, `warning`, `danger`)
- `align`: Text alignment

## Utility Classes

### Spacing

```css
.m-4    /* margin: 1rem */
/* margin: 1rem */
.mt-2   /* margin-top: 0.5rem */
.p-6    /* padding: 1.5rem */
.pb-4; /* padding-bottom: 1rem */
```

### Layout

```css
.flex              /* display: flex */
/* display: flex */
.flex--column      /* flex-direction: column */
.flex--justify-between /* justify-content: space-between */
.flex--align-center; /* align-items: center */
```

### Typography

```css
.text--lg          /* Large text */
/* Large text */
.text--bold        /* Bold font weight */
.text--center      /* Center alignment */
.text--primary; /* Primary text color */
```

## Usage Examples

### Form Layout

```html
<ui-stack spacing="lg">
  <ui-heading level="2">Contact Form</ui-heading>

  <ui-grid columns="2" breakpoint="md">
    <div class="form-field">
      <form-label for="first-name">First Name</form-label>
      <form-input id="first-name" placeholder="John"></form-input>
    </div>

    <div class="form-field">
      <form-label for="last-name">Last Name</form-label>
      <form-input id="last-name" placeholder="Doe"></form-input>
    </div>
  </ui-grid>

  <div class="form-field">
    <form-label for="email">Email</form-label>
    <form-input
      type="email"
      id="email"
      placeholder="john@example.com"
    ></form-input>
  </div>

  <ui-inline justify="end" spacing="md">
    <form-button variant="ghost">Cancel</form-button>
    <form-button variant="primary">Submit</form-button>
  </ui-inline>
</ui-stack>
```

### Card Grid

```html
<ui-grid columns="3" breakpoint="md" spacing="lg">
  <ui-card variant="interactive">
    <ui-heading level="4">Feature 1</ui-heading>
    <ui-text color="secondary">Description of the first feature.</ui-text>
  </ui-card>

  <ui-card variant="interactive">
    <ui-heading level="4">Feature 2</ui-heading>
    <ui-text color="secondary">Description of the second feature.</ui-text>
  </ui-card>

  <ui-card variant="interactive">
    <ui-heading level="4">Feature 3</ui-heading>
    <ui-text color="secondary">Description of the third feature.</ui-text>
  </ui-card>
</ui-grid>
```

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

1. **Use semantic components** - Prefer `<ui-heading>` over plain `<h1>` tags
2. **Leverage design tokens** - Use CSS custom properties for consistency
3. **Compose layouts** - Combine layout components for complex designs
4. **Maintain spacing consistency** - Use the spacing scale for all margins/padding
5. **Test responsiveness** - Verify layouts work across all breakpoints

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

All modern browsers that support Custom Elements v1 and CSS Custom Properties.

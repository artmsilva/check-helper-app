# Handwritten Check Helper - Technical Specification

**Version:** 1.0  
**Date:** August 1, 2025  
**Status:** Active Development

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Component Specifications](#component-specifications)
4. [API Documentation](#api-documentation)
5. [Data Flow](#data-flow)
6. [Error Handling](#error-handling)
7. [Performance Considerations](#performance-considerations)
8. [Testing Strategy](#testing-strategy)
9. [Deployment](#deployment)
10. [Maintenance](#maintenance)

## System Overview

### High-Level Architecture

The Handwritten Check Helper is a client-side single-page application built with vanilla JavaScript and Web Components. The application follows a component-based architecture with clear separation of concerns.

```
┌─────────────────────────────────────┐
│            Browser                  │
├─────────────────────────────────────┤
│        Application Layer            │
│  ┌─────────────┬─────────────────┐  │
│  │ check-form  │  check-preview  │  │
│  └─────────────┴─────────────────┘  │
├─────────────────────────────────────┤
│        Business Logic Layer        │
│  ┌─────────────────────────────────┐ │
│  │  convertNumberToWords Utility   │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│         Presentation Layer          │
│  ┌─────────────────────────────────┐ │
│  │      Design System CSS          │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Technology Stack Details

| Layer         | Technology      | Version | Purpose                           |
| ------------- | --------------- | ------- | --------------------------------- |
| Runtime       | Modern Browsers | ES2020+ | Application execution environment |
| Module System | Native ES       | Native  | Import/export functionality       |
| Components    | Web Components  | Native  | Custom element architecture       |
| Styling       | CSS3            | Native  | Styling with design system        |
| Deployment    | Static Hosting  | Any     | File serving (Vercel, etc.)       |

## Architecture Design

### Component Architecture

#### 1. Web Components Pattern

All UI components extend `HTMLElement` and use the Custom Elements API:

```javascript
class ComponentName extends HTMLElement {
  constructor() {
    super();
    // Initialize component state
  }

  connectedCallback() {
    // Component mounted to DOM
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    // Component removed from DOM
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Handle attribute changes
  }

  static get observedAttributes() {
    return ["attribute-list"];
  }
}
```

#### 2. Event-Driven Communication

Components communicate through custom events:

```javascript
// Dispatch custom event
this.dispatchEvent(
  new CustomEvent("eventName", {
    detail: { data },
    bubbles: true,
  })
);

// Listen for events
this.addEventListener("eventName", this.handleEvent.bind(this));
```

#### 3. State Management

Each component manages its own state with optional sharing through:

- Custom events for parent-child communication
- Attributes for configuration
- Direct property access for tight coupling

### Module Organization

```
public/src/
├── main.js                    # Application entry point
├── index.css                  # Global styles
├── components/
│   ├── check-form.js         # Main form container
│   └── check-preview.js      # Interactive check visualization
├── utils/
│   └── convertNumberToWords.js # Business logic
└── design-system/
    ├── tokens.css            # Design tokens
    ├── typography.css        # Typography utilities
    └── layout.css           # Layout and component styles
```

## Component Specifications

### CheckForm Component

**File**: `public/src/components/check-form.js`

#### Purpose

Main container component that manages check data input and coordinates with preview component.

#### State Management

```javascript
this.formData = {
  date: "", // ISO date string
  payee: "", // String, max 100 characters
  amountNumber: "", // String representation of number
  amountWords: "", // Auto-generated words
  memo: "", // Optional string, max 50 characters
};
```

#### Public Methods

- `updatePreview()`: Synchronizes form data with preview component
- `convertAmount()`: Triggers amount-to-words conversion
- `printCheck()`: Initiates print functionality
- `resetForm()`: Clears all form data

#### Events Emitted

- `form-updated`: When any form field changes
- `amount-converted`: When amount conversion completes
- `form-validated`: When form validation runs

#### Validation Rules

- Date: Must be valid date format
- Payee: Required, 1-100 characters
- Amount: Must be positive number, max 13 digits
- Memo: Optional, max 50 characters

### CheckPreview Component

**File**: `public/src/components/check-preview.js`

#### Purpose

Displays visual representation of the check based on current form data.

#### Data Flow

Receives data through the `data` attribute as JSON string:

```javascript
<check-preview data='{"date":"2025-08-01","payee":"John Doe",...}'></check-preview>
```

#### Rendering Logic

- Interactive inline editing of check fields
- Real-time updates when data changes
- Handles empty/missing data gracefully with placeholders
- Maintains realistic check layout proportions
- Uses contenteditable for direct field editing
- Auto-converts numeric amounts to words

#### CSS Classes

- `.interactive-check`: Main container
- `.editable-field`: Clickable/editable fields
- `.check-date-section`: Date positioning
- `.check-payee-section`: Payee and amount row
- `.check-amount-words-section`: Written amount line
- `.check-footer-section`: Memo and signature area

### UI Components

The application uses a simplified component architecture with two main components:

#### CheckForm Component

- Manages check data and coordinates with preview
- Handles form validation and user interactions
- Emits events for data synchronization

#### CheckPreview Component

- Displays interactive check with editable fields
- Supports real-time inline editing
- Auto-converts amounts to words
- Provides realistic check visualization

### Utility Functions

#### convertNumberToWords Module

**File**: `public/src/utils/convertNumberToWords.js`

##### Core Algorithm

```javascript
function convertWholeNumberToWords(num) {
  // 1. Handle special case of zero
  // 2. Break number into chunks of 1000
  // 3. Convert each chunk using convertBelowThousand()
  // 4. Add appropriate scale (thousand, million, etc.)
  // 5. Combine results with proper spacing
}
```

##### Supported Range

- Minimum: 0
- Maximum: 999,999,999,999,999 (999 trillion)
- Precision: 2 decimal places for cents

##### Error Handling

- Returns empty string for invalid input
- Handles edge cases (null, undefined, NaN)
- Validates numeric range

##### Performance Characteristics

- O(log n) time complexity relative to number size
- No external dependencies
- Minimal memory allocation

## API Documentation

### Public Component APIs

#### CheckForm

```javascript
// Get current form data
const data = checkForm.getFormData();

// Set form data programmatically
checkForm.setFormData({
  date: "2025-08-01",
  payee: "John Doe",
  amountNumber: "150.00",
});

// Validate form
const isValid = checkForm.validate();

// Reset form to initial state
checkForm.reset();
```

#### CheckPreview

```javascript
// Update preview data
checkPreview.setAttribute("data", JSON.stringify(formData));

// Get preview HTML for printing
const printHTML = checkPreview.getPrintHTML();
```

### Utility APIs

#### convertAmountToWords

```javascript
import { convertAmountToWords } from "./utils/convertNumberToWords.js";

// Convert numeric amount to words
const words = convertAmountToWords(123.45);
// Returns: "one hundred twenty-three and 45/100"

// Handle edge cases
convertAmountToWords(""); // Returns: ''
convertAmountToWords(null); // Returns: ''
convertAmountToWords("abc"); // Returns: ''
convertAmountToWords(-50); // Returns: 'minus fifty and 00/100'
```

## Data Flow

### Form Input Flow

```
User Input → FormInput Component → Custom Event → CheckForm → State Update → CheckPreview Update
```

### Amount Conversion Flow

```
Numeric Input (real-time) → convertAmountToWords() → Words Output → Form State Update → Preview Update
```

### Print Flow

```
Print Button → CheckForm.handlePrint() → window.print() → Browser Print Dialog
```

### Component Lifecycle

```
1. HTML Parsed → customElements.define() called
2. Element Created → constructor() called
3. Element Added to DOM → connectedCallback() called
4. Attributes Change → attributeChangedCallback() called
5. Element Removed → disconnectedCallback() called
```

## Error Handling

### Client-Side Error Strategy

#### Input Validation

```javascript
// Immediate validation on input
function validateAmount(value) {
  if (value === "") return { valid: true, error: null };
  if (isNaN(value)) return { valid: false, error: "Invalid number format" };
  if (value < 0) return { valid: false, error: "Amount must be positive" };
  if (value > 999999999999.99)
    return { valid: false, error: "Amount too large" };
  return { valid: true, error: null };
}
```

#### Component Error Boundaries

```javascript
// Graceful error handling in components
try {
  this.render();
} catch (error) {
  console.error("Component render error:", error);
  this.innerHTML = '<div class="error">Unable to display component</div>';
}
```

#### User Feedback

- Inline validation messages for form fields
- Toast notifications for successful actions
- Clear error states with recovery suggestions
- Fallback content for component failures

### Error Categories

| Error Type       | Handling Strategy     | User Experience         |
| ---------------- | --------------------- | ----------------------- |
| Input Validation | Real-time validation  | Inline error messages   |
| Component Errors | Graceful degradation  | Fallback UI             |
| Print Errors     | Retry mechanism       | Error notification      |
| Network Errors   | Offline functionality | No impact (offline app) |

## Performance Considerations

### Bundle Size Optimization

- No external dependencies for core functionality
- Tree-shaking with Vite build tool
- CSS bundling and minification
- Gzip compression for production

### Runtime Performance

- Minimal DOM manipulation
- Event delegation where appropriate
- Debounced input handlers
- Lazy component initialization

### Memory Management

- Proper event listener cleanup
- Component lifecycle management
- No memory leaks in custom elements

### Loading Strategy

```javascript
// Progressive enhancement approach
if ("customElements" in window) {
  // Load modern components
  import("./components/check-form.js");
} else {
  // Fallback for older browsers
  document.body.innerHTML = "Please upgrade your browser";
}
```

## Testing Strategy

### Unit Testing

```javascript
// Test individual utility functions
describe("convertAmountToWords", () => {
  test("converts basic amounts correctly", () => {
    expect(convertAmountToWords(123.45)).toBe(
      "one hundred twenty-three and 45/100"
    );
  });

  test("handles edge cases", () => {
    expect(convertAmountToWords(0)).toBe("zero and 00/100");
    expect(convertAmountToWords("")).toBe("");
  });
});
```

### Integration Testing

```javascript
// Test component interactions
describe("CheckForm Integration", () => {
  test("updates preview when amount changes", () => {
    const form = document.createElement("check-form");
    const preview = form.querySelector("check-preview");

    // Simulate user input
    const amountInput = form.querySelector("#amount-number");
    amountInput.value = "150.00";
    amountInput.dispatchEvent(new Event("input"));

    // Verify preview updates
    expect(preview.getAttribute("data")).toContain('"amountNumber":"150.00"');
  });
});
```

### End-to-End Testing

- User workflow testing
- Cross-browser compatibility
- Print functionality testing
- Accessibility testing

### Manual Testing Checklist

- [ ] All form fields accept valid input
- [ ] Amount conversion works for various inputs
- [ ] Preview updates in real-time
- [ ] Print functionality works correctly
- [ ] Error handling displays appropriate messages
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility

## Deployment

### Build Process

Since this project uses no build tools, development is simple:

```bash
# Development server options
python3 -m http.server 3000 --directory public
# or
npx serve public
# or
npx http-server public
```

### Deployment Output

```
public/                     # Deploy this directory
├── index.html             # Entry point with import maps
├── src/
│   ├── main.js           # Application JavaScript
│   ├── index.css         # Application styles
│   ├── components/       # Web Components
│   │   ├── check-form.js    # Main form component
│   │   └── check-preview.js # Interactive check preview
│   ├── utils/            # Utility functions
│   │   └── convertNumberToWords.js # Amount conversion
│   └── design-system/    # CSS design tokens
│       ├── tokens.css       # Design tokens
│       ├── typography.css   # Typography utilities
│       └── layout.css       # Layout and component styles
└── manifest.json         # PWA manifest
```

### Deployment Targets

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Self-Hosted**: Any web server with static file support

### Environment Configuration

- Production builds minify and optimize code
- Development builds include source maps
- Environment variables for feature flags

## Maintenance

### Code Quality

- No build tool configuration needed
- Prettier for code formatting (optional)
- JSDoc comments for documentation
- Consistent naming conventions

### Version Management

- Semantic versioning (semver)
- Git tags for releases
- Changelog maintenance
- Backward compatibility considerations

### Performance Monitoring

- Bundle size tracking
- Core Web Vitals monitoring
- User feedback collection
- Error tracking and reporting

### Security Considerations

- Input sanitization
- XSS prevention
- CSP headers for production
- Regular dependency updates

### Browser Support Matrix

| Browser        | Minimum Version | Support Level |
| -------------- | --------------- | ------------- |
| Chrome         | 67+             | Full Support  |
| Firefox        | 63+             | Full Support  |
| Safari         | 12+             | Full Support  |
| Edge           | 79+             | Full Support  |
| Mobile Safari  | 12+             | Full Support  |
| Chrome Android | 67+             | Full Support  |

### Accessibility Compliance

- WCAG 2.1 AA compliance
- Screen reader testing
- Keyboard navigation support
- Color contrast validation
- Focus management

---

**Document Maintenance**: This specification should be updated with any architectural changes, new features, or significant refactoring efforts. Version history is tracked in git commits and release notes.

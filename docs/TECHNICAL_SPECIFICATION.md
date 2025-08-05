# API Reference - Interactive Check Helper

> **Read time: ~1.5 minutes** - Technical implementation details for developers.

## 🏗️ Architecture Overview

**Ultra-minimal approach**: 262 lines total across 3 files.

```
public/
├── index.html    # Complete app with contenteditable check
├── src/
│   ├── app.js    # All JavaScript (182 lines)
│   └── app.css   # All styling (73 lines)
```

**No frameworks, no build tools, no dependencies.**

## 🔧 Core Implementation

### Event System

```javascript
// Single event delegation handles all field interactions
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      const text = e.target.textContent.trim();
      const placeholder = e.target.dataset.placeholder;

      // Handle empty fields
      if (!text) {
        e.target.textContent = placeholder;
        e.target.classList.add("placeholder", "c-muted");
      } else {
        e.target.classList.remove("placeholder", "c-muted");
      }

      // Convert amounts to words
      if (text && !isNaN(parseFloat(text))) {
        updateAmountWords(text);
      }
    }
  },
  true
);
```

### Amount Conversion API

```javascript
convertAmountToWords(123.45); // → "one hundred twenty-three and 45/100"
convertAmountToWords(""); // → "Amount in words"
convertAmountToWords("abc"); // → "Amount in words" (graceful failure)
```

**Supports**: 0 to 999 trillion with 2 decimal places.

### Field State Management

```javascript
// Placeholder state
<span contenteditable="true"
      class="placeholder c-muted"
      data-placeholder="Click to enter payee">
  Click to enter payee
</span>

// Active state (user typing)
<span contenteditable="true">John Doe</span>
```

## 🎯 Key Functions

### Input Handling

- **Focus**: Clear placeholder text, remove muted styling
- **Blur**: Validate input, restore placeholder if empty, convert amounts
- **Enter**: Submit field (blur and move focus)

### Amount Processing

```javascript
// Real-time conversion pipeline
Input → parseFloat() → Split integer/cents → Convert to words → Update DOM
```

### Error Handling

- **Invalid input**: Graceful fallback to placeholder
- **Large numbers**: Handles up to 999 trillion
- **Edge cases**: Empty, null, undefined → default placeholder

## 🚀 Performance Characteristics

- **Bundle size**: 262 lines unminified (~8KB total)
- **Load time**: Instantaneous (no network requests)
- **Memory**: Minimal (no component state or virtual DOM)
- **Runtime**: O(1) for field updates, O(log n) for amount conversion

## 🌐 Browser Support

| Feature          | Chrome       | Firefox      | Safari       | Edge         |
| ---------------- | ------------ | ------------ | ------------ | ------------ |
| contenteditable  | ✅ Universal | ✅ Universal | ✅ Universal | ✅ Universal |
| CSS custom props | ✅ 49+       | ✅ 31+       | ✅ 9.1+      | ✅ 16+       |
| Event delegation | ✅ Universal | ✅ Universal | ✅ Universal | ✅ Universal |
| color-mix()      | ✅ 111+      | ✅ 113+      | ✅ 16.2+     | ✅ 111+      |

**Minimum viable**: Any browser supporting contenteditable (IE9+)
**Full experience**: Modern browsers with CSS custom properties

## 🔒 Security Model

- **No external requests**: Fully offline application
- **No user data storage**: Everything is ephemeral
- **No innerHTML usage**: Only textContent manipulation
- **Input sanitization**: Basic validation on numeric fields

## 📦 Deployment

```bash
# Development
python3 -m http.server 3000 --directory public

# Production
# Just upload public/ directory to any static host
# No build process required
```

**Works on**: Vercel, Netlify, GitHub Pages, any CDN, or file:// protocol.

## 🧪 Testing Strategy

```javascript
// Manual testing checklist (no test framework needed)
// ✅ Click each field and verify editing works
// ✅ Tab between fields with keyboard
// ✅ Test amount conversion with various inputs
// ✅ Verify mobile touch interaction
// ✅ Test print functionality
```

---

**Philosophy**: Keep it simple. Every line of code serves the core check functionality.
| Runtime | Modern Browsers | ES2020+ | Application execution environment |
| Module System | None | N/A | Single file approach |
| Components | Native DOM | Native | Direct contenteditable elements |
| Styling | CSS3 | Native | Minimal design tokens |
| Deployment | Static Hosting | Any | File serving (Vercel, etc.) |

## Architecture Design

### Single-File Pattern

The application uses a simplified architecture pattern with direct DOM manipulation:

```javascript
// Event delegation for all contenteditable fields
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      // Handle field updates
      handleFieldUpdate(e.target);
    }
  },
  true
);

// Centralized amount conversion
function convertAmountToWords(value) {
  // Embedded conversion logic
  return convertedWords;
}
```

### Event-Driven Updates

All interactions are handled through native DOM events:

```javascript
// Focus events - clear placeholder text
document.addEventListener("focus", handleFocus, true);

// Blur events - update fields and convert amounts
document.addEventListener("blur", handleBlur, true);

// Keydown events - handle Enter key submission
document.addEventListener("keydown", handleKeydown, true);
```

### State Management

State is managed directly through DOM element content and attributes:

- Field values stored in `textContent`
- Placeholder states managed via CSS classes
- No external state management required

### File Organization

```
public/
├── index.html            # Complete application
└── src/
    ├── app.js           # All JavaScript functionality (182 lines)
    └── app.css          # All styling with design tokens (73 lines)
```

## Implementation Details

### Core Functionality

The application consists of a single interactive check with contenteditable fields:

#### HTML Structure

```html
<div class="check-container">
  <!-- Check header with number and bank info -->
  <div class="flex-between mb-15">
    <div class="check-number">#1001</div>
    <div class="bank-info">...</div>
  </div>

  <!-- Editable date field -->
  <div class="text-right mb-15">
    Date:
    <span contenteditable="true" data-placeholder="Click to set date"
      >2025-08-04</span
    >
  </div>

  <!-- Payee and amount fields -->
  <div class="mb-15">
    Pay to the order of
    <span
      contenteditable="true"
      class="placeholder c-muted"
      data-placeholder="Click to enter payee"
      >Click to enter payee</span
    >
    $
    <span
      contenteditable="true"
      class="placeholder c-muted"
      data-placeholder="0.00"
      >0.00</span
    >
  </div>

  <!-- Amount in words (auto-generated) -->
  <div class="mb-15 pb-5 border-bottom">
    <span class="words c-muted">Amount in words</span> DOLLARS
  </div>

  <!-- Memo and signature line -->
  <div class="flex-center mb-15">
    Memo:
    <span
      contenteditable="true"
      class="placeholder c-muted"
      data-placeholder="Optional memo"
      >Optional memo</span
    >
    <div class="signature-line text-center">_________________________</div>
  </div>

  <!-- MICR line -->
  <div class="absolute-bottom micr">⑆123456789⑆ 1234567890 ⑆ 1001</div>
</div>
```

#### JavaScript Event Handling

```javascript
// Handle field blur events (when user finishes editing)
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      const text = e.target.textContent.trim();
      const placeholder = e.target.dataset.placeholder;

      // Handle empty field
      if (!text) {
        e.target.textContent = placeholder;
        e.target.classList.add("placeholder", "c-muted");
      } else {
        e.target.classList.remove("placeholder", "c-muted");
      }

      // Update amount words if this is an amount field
      if (text && !isNaN(parseFloat(text))) {
        const wordsEl = document.querySelector(".words");
        const convertedWords = convertAmountToWords(text);
        wordsEl.textContent = convertedWords;
      }
    }
  },
  true
);
```

### Amount-to-Words Conversion

Embedded conversion algorithm handles numbers up to 999 trillion:

```javascript
function convertAmountToWords(value) {
  const num = parseFloat(value);
  if (!value || isNaN(num)) return "Amount in words";

  // Conversion logic with units, teens, tens arrays
  const units = ["", "one", "two", "three", ...];
  const teens = ["ten", "eleven", "twelve", ...];
  const tens = ["", "", "twenty", "thirty", ...];

  // Convert integer part and cents separately
  const intPart = Math.floor(Math.abs(num));
  const cents = Math.round((Math.abs(num) - intPart) * 100);

  // Return formatted result: "one hundred twenty-three and 45/100"
  return `${words.trim()} and ${cents.toString().padStart(2, '0')}/100`;
}
```

## API Documentation

### DOM Event APIs

#### Field Interaction

```javascript
// Focus event - clear placeholder
document.addEventListener(
  "focus",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      const placeholder = e.target.dataset.placeholder;
      if (e.target.textContent === placeholder) {
        e.target.textContent = "";
        e.target.classList.remove("placeholder", "c-muted");
      }
    }
  },
  true
);

// Blur event - update field and convert amounts
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      // Field validation and amount conversion logic
    }
  },
  true
);

// Keydown event - handle Enter key
document.addEventListener(
  "keydown",
  (e) => {
    if (e.target.matches("[contenteditable]") && e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  },
  true
);
```

### Amount Conversion API

#### convertAmountToWords Function

```javascript
// Convert numeric amount to written words
const words = convertAmountToWords(123.45);
// Returns: "one hundred twenty-three and 45/100"

// Handle edge cases
convertAmountToWords(""); // Returns: "Amount in words"
convertAmountToWords(null); // Returns: "Amount in words"
convertAmountToWords("abc"); // Returns: "Amount in words"
convertAmountToWords(0); // Returns: "zero and 00/100"
```

#### Supported Input Formats

- Integers: `123` → `"one hundred twenty-three and 00/100"`
- Decimals: `123.45` → `"one hundred twenty-three and 45/100"`
- Strings: `"123.45"` → `"one hundred twenty-three and 45/100"`
- Edge cases: Empty/null/invalid → `"Amount in words"`

## Data Flow

### User Interaction Flow

```
User clicks field → Focus event → Clear placeholder → User types → Blur event → Update field → Convert amount (if numeric) → Update words display
```

### Amount Conversion Flow

```
Numeric input → parseFloat() → Split into integer/cents → Convert integer to words → Format with cents → Update DOM
```

### Field State Management

```
Empty field → Show placeholder text with muted styling
Field has content → Show content with normal styling
Field focused → Clear placeholder, remove muted styling
Field blurred → Validate content, restore placeholder if empty
```

### DOM Update Cycle

```
1. User interaction triggers DOM event
2. Event handler processes the change
3. Field validation occurs
4. Amount conversion (if applicable)
5. DOM elements updated directly
6. CSS classes toggled for visual feedback
```

## Error Handling

### Input Validation Strategy

```javascript
// Real-time validation during field updates
function validateAmount(value) {
  if (value === "") return { valid: true, error: null };
  if (isNaN(parseFloat(value)))
    return { valid: false, error: "Invalid number" };
  if (parseFloat(value) < 0)
    return { valid: false, error: "Amount must be positive" };
  if (parseFloat(value) > 999999999999.99)
    return { valid: false, error: "Amount too large" };
  return { valid: true, error: null };
}
```

### Graceful Degradation

```javascript
// Handle conversion errors gracefully
function convertAmountToWords(value) {
  try {
    const num = parseFloat(value);
    if (!value || isNaN(num)) return "Amount in words";

    // Conversion logic here...
    return convertedWords;
  } catch (error) {
    console.warn("Amount conversion failed:", error);
    return "Amount in words";
  }
}
```

### User Feedback Strategy

- **Visual feedback**: CSS classes for validation states
- **Placeholder restoration**: Empty fields show helpful placeholder text
- **Silent error handling**: Invalid inputs default to placeholder state
- **No error dialogs**: Maintains simple, non-intrusive experience

### Error Categories

| Error Type       | Handling Strategy      | User Experience       |
| ---------------- | ---------------------- | --------------------- |
| Invalid Amount   | Default to placeholder | Silent graceful fail  |
| Empty Fields     | Show placeholder text  | Visual guidance       |
| Conversion Error | Return default message | Fallback to safe text |
| DOM Errors       | Console logging only   | No user interruption  |

## Performance Considerations

### Code Size Optimization

- **Total code size**: 262 lines across 3 files (app.js: 182 lines, app.css: 73 lines, index.html: minimal)
- **No external dependencies**: Zero npm packages or CDN resources
- **No build process**: Direct file serving, no compilation overhead
- **Minimal DOM**: Single check container with contenteditable fields

### Runtime Performance

```javascript
// Efficient event delegation - single listener handles all fields
document.addEventListener("blur", handleAllFields, true);

// Minimal DOM queries - cache when possible
const wordsElement = document.querySelector(".words");

// Debounced updates not needed - blur events are naturally debounced
```

### Memory Management

- **No memory leaks**: Native event listeners automatically cleaned up
- **No component lifecycle**: Direct DOM manipulation, no complex state
- **Minimal object creation**: Reuse of conversion arrays and functions
- **No closures**: Event handlers are direct function references

### Loading Strategy

```html
<!-- Synchronous loading for instant interaction -->
<script src="./src/app.js"></script>

<!-- No lazy loading needed - total payload is tiny -->
<!-- No code splitting needed - single file approach -->
```

### Browser Compatibility

| Feature          | Support Level | Fallback Strategy    |
| ---------------- | ------------- | -------------------- |
| contenteditable  | Universal     | None needed          |
| Event delegation | Universal     | None needed          |
| CSS custom props | Modern only   | Graceful degradation |
| Arrow functions  | Modern only   | Convert to function  |

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

### Zero-Build Deployment

Since this project requires no build process, deployment is extremely simple:

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
public/                     # Deploy this directory exactly as-is
├── index.html             # Complete application with SEO meta tags
├── src/
│   ├── app.js            # All JavaScript (182 lines)
│   └── app.css           # All CSS with design tokens (73 lines)
├── manifest.json         # PWA manifest
├── robots.txt            # SEO robots file
└── sitemap.xml           # SEO sitemap
```

### Deployment Targets

- **Static Hosting**: Netlify, Vercel, GitHub Pages (zero configuration)
- **CDN**: CloudFlare, AWS CloudFront, any CDN service
- **Self-Hosted**: Apache, Nginx, any web server with static file support
- **File System**: Works directly from `file://` protocol (no server needed)

### Production Optimization

```bash
# Optional minification (not required)
# CSS can be minified from 73 lines to ~20 lines
# JavaScript can be minified from 182 lines to ~50 lines
# But original is already very small and readable
```

### Environment Configuration

- **No environment variables needed**
- **No configuration files**
- **No API keys or secrets**
- **Works offline immediately**
- **No external service dependencies**

## Maintenance

### Code Quality

- **No build tool maintenance**: Zero configuration to maintain
- **No dependency updates**: Zero npm packages to manage
- **Self-documenting code**: Simple, readable vanilla JavaScript
- **Consistent naming**: Clear variable and function names throughout

### Version Management

- **Semantic versioning**: Major.Minor.Patch (currently v2.0)
- **Git tags for releases**: Tag stable versions for easy rollback
- **Simple changelog**: Document feature additions and bug fixes
- **No breaking changes**: API is just DOM events and functions

### Performance Monitoring

```javascript
// Built-in performance tracking (optional)
console.time("amount-conversion");
const result = convertAmountToWords(amount);
console.timeEnd("amount-conversion");

// No external analytics needed - application is fully self-contained
```

### Security Considerations

```javascript
// Input sanitization for contenteditable fields
function sanitizeInput(text) {
  // Basic HTML entity encoding if needed
  return text.replace(/[<>]/g, "");
}

// No XSS risks - no innerHTML usage, only textContent
// No external API calls - fully offline application
// No user data persistence - everything is ephemeral
```

### Browser Support Matrix

| Browser        | Minimum Version | Support Level | Notes                    |
| -------------- | --------------- | ------------- | ------------------------ |
| Chrome         | 60+             | Full Support  | contenteditable + ES6    |
| Firefox        | 55+             | Full Support  | contenteditable + ES6    |
| Safari         | 12+             | Full Support  | contenteditable + ES6    |
| Edge           | 79+             | Full Support  | contenteditable + ES6    |
| Mobile Safari  | 12+             | Full Support  | Touch-friendly interface |
| Chrome Android | 60+             | Full Support  | Mobile optimization      |

### Accessibility Compliance

- **WCAG 2.1 AA**: Meets accessibility standards
- **Screen readers**: contenteditable fields are naturally accessible
- **Keyboard navigation**: Tab/Enter/Escape work as expected
- **Color contrast**: Design tokens ensure proper contrast ratios
- **Focus management**: Clear visual focus indicators on all fields

### Testing Strategy

```javascript
// Simple manual testing checklist:
// ✅ Click each field and type content
// ✅ Tab between fields with keyboard
// ✅ Enter various amounts and verify word conversion
// ✅ Test with screen reader
// ✅ Test print functionality
// ✅ Verify mobile touch interaction
```

---

**Document Maintenance**: This specification reflects the ultra-simplified v2.0 architecture. Major changes (like adding components or external dependencies) would warrant a new major version and specification update.

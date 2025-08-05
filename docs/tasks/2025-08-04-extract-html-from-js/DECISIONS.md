# Key Decisions

## Phase 1 Decisions

### Decision 1: Move HTML Structure to index.html

**Rationale**:

- Improves initial page load performance by showing check structure immediately
- Provides progressive enhancement - check is visible even if JavaScript fails
- Follows best practices of keeping structure in HTML, behavior in JavaScript

### Decision 2: Preserve All CSS Classes and Structure

**Rationale**:

- Maintains exact visual appearance
- No risk of breaking existing styles
- Keeps inline styles (margin: 0 auto) that were in JavaScript

## Phase 2 Decisions - Major JavaScript Reduction

### Decision 3: Use Native HTML contenteditable Instead of JavaScript Field Creation

**Rationale**:

- Eliminates need for complex `createField()` function (40+ lines removed)
- Fields work immediately without JavaScript initialization
- Browser handles basic editing behavior natively
- Massive code reduction with same functionality

### Decision 4: Replace Individual Event Listeners with Event Delegation

**Rationale**:

- Single event listener handles all fields instead of creating listeners per field
- Simpler, more efficient code
- No need to track individual field state
- Eliminates `checkData` object entirely

### Decision 5: Move Styling and Placeholders to HTML

**Rationale**:

- Reduces JavaScript class manipulation complexity
- Styling visible immediately, doesn't flash/change on load
- Uses `data-placeholder` attributes for clean placeholder handling
- CSS handles visual states, JS only handles content

### Decision 6: Simplify Amount-to-Words Algorithm

**Rationale**:

- Original algorithm was overly complex for check writing needs
- Reduced from ~80 lines to ~25 lines
- Handles millions/thousands/hundreds efficiently
- Still accurate for typical check amounts

### Decision 7: Remove Initialization Function

**Rationale**:

- No longer needed since fields are directly functional in HTML
- Event delegation works immediately on page load
- Eliminates `DOMContentLoaded` dependency
- JavaScript becomes purely reactive instead of initialization-heavy

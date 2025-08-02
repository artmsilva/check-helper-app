# CSS Design Token Linter

## Task Overview

Create a comprehensive CSS linter that ensures we use design system tokens consistently throughout our stylesheets instead of hardcoded values.

## Objectives

1. **Extract Design Tokens**: Parse our CSS layers to identify all design tokens from the tokens layer
2. **Detect Violations**: Find hardcoded values in CSS that should use design tokens instead
3. **Provide Suggestions**: Suggest appropriate design tokens for hardcoded values
4. **Support CSS Layers**: Understand our `@layer` architecture and lint accordingly
5. **Generate Reports**: Create detailed reports with file locations and suggested fixes

## Scope

- Analyze `public/src/styles.css` and any future CSS files
- Focus on color values, spacing, typography, and other design tokens
- Respect our CSS layer architecture (reset, tokens, base, layout, components, utilities)
- Provide actionable suggestions for improvements

## Success Criteria

- Accurately identifies design tokens from the tokens layer
- Detects hardcoded values that could use tokens
- Provides specific suggestions for fixes
- Runs as a standalone Node.js script
- Generates clear, actionable reports
- Can be integrated into our development workflow

## Implementation Approach

1. Create a Node.js script that parses CSS using PostCSS or similar
2. Extract all CSS custom properties from the tokens layer
3. Scan other layers for hardcoded values
4. Match hardcoded values to available tokens
5. Generate detailed reports with suggestions

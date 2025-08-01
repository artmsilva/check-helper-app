/**
 * Card Component - A reusable card layout component
 */
class Card extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute("variant") || "default";
    const padding = this.getAttribute("padding") || "default";

    const variantClass = variant !== "default" ? `card--${variant}` : "";
    const paddingClass = padding !== "default" ? `p-${padding}` : "";

    this.innerHTML = `
      <div class="card ${variantClass} ${paddingClass}">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Stack Component - A vertical layout component
 */
class Stack extends HTMLElement {
  connectedCallback() {
    const spacing = this.getAttribute("spacing") || "md";

    this.innerHTML = `
      <div class="stack stack--${spacing}">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Inline Component - A horizontal layout component
 */
class Inline extends HTMLElement {
  connectedCallback() {
    const spacing = this.getAttribute("spacing") || "md";
    const align = this.getAttribute("align") || "center";
    const justify = this.getAttribute("justify") || "start";

    const alignClass = align !== "center" ? `flex--align-${align}` : "";
    const justifyClass = justify !== "start" ? `flex--justify-${justify}` : "";

    this.innerHTML = `
      <div class="inline inline--${spacing} ${alignClass} ${justifyClass}">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Text Component - A semantic text component
 */
class TextElement extends HTMLElement {
  connectedCallback() {
    const size = this.getAttribute("size") || "base";
    const weight = this.getAttribute("weight") || "normal";
    const color = this.getAttribute("color") || "primary";
    const align = this.getAttribute("align") || "left";

    const sizeClass = size !== "base" ? `text--${size}` : "";
    const weightClass = weight !== "normal" ? `text--${weight}` : "";
    const colorClass = color !== "primary" ? `text--${color}` : "";
    const alignClass = align !== "left" ? `text--${align}` : "";

    this.innerHTML = `
      <span class="text ${sizeClass} ${weightClass} ${colorClass} ${alignClass}">
        <slot></slot>
      </span>
    `;
  }
}

/**
 * Heading Component - A semantic heading component
 */
class HeadingElement extends HTMLElement {
  connectedCallback() {
    const level = this.getAttribute("level") || "1";
    const align = this.getAttribute("align") || "left";

    const alignClass = align !== "left" ? `text--${align}` : "";
    const HeadingTag = `h${level}`;

    this.innerHTML = `
      <${HeadingTag} class="heading heading--${level} ${alignClass}">
        <slot></slot>
      </${HeadingTag}>
    `;
  }
}

/**
 * Grid Component - A responsive grid layout component
 */
class GridLayout extends HTMLElement {
  connectedCallback() {
    const columns = this.getAttribute("columns") || "1";
    const spacing = this.getAttribute("spacing") || "base";
    const breakpoint = this.getAttribute("breakpoint") || "md";

    const spacingClass = spacing !== "base" ? `grid--${spacing}` : "";
    const responsiveClass = `grid--${breakpoint}-cols-${columns}`;

    this.innerHTML = `
      <div class="grid grid--cols-1 ${responsiveClass} ${spacingClass}">
        <slot></slot>
      </div>
    `;
  }
}

// Register all utility components
customElements.define("ui-card", Card);
customElements.define("ui-stack", Stack);
customElements.define("ui-inline", Inline);
customElements.define("ui-text", TextElement);
customElements.define("ui-heading", HeadingElement);
customElements.define("ui-grid", GridLayout);

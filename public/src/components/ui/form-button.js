/**
 * FormButton - A custom button element web component
 */
class FormButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "base";
    const text = this.textContent || "";

    const sizeClass = size !== "base" ? `form-button--${size}` : "";

    this.innerHTML = `
      <button class="form-button form-button--${variant} ${sizeClass}">
        ${text}
      </button>
    `;

    // Forward click events
    const button = this.querySelector("button");
    button.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent("click", {
          bubbles: true,
        })
      );
    });
  }
}

customElements.define("form-button", FormButton);

/**
 * FormLabel - A custom label element web component
 */
class FormLabel extends HTMLElement {
  connectedCallback() {
    const htmlFor = this.getAttribute("for") || "";
    const text = this.textContent || "";

    this.innerHTML = `
      <label for="${htmlFor}" class="form-label">
        ${text}
      </label>
    `;
  }
}

customElements.define("form-label", FormLabel);

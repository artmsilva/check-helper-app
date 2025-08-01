/**
 * FormInput - A custom input element web component
 */
class FormInput extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type") || "text";
    const id = this.getAttribute("id") || "";
    const placeholder = this.getAttribute("placeholder") || "";
    const value = this.getAttribute("value") || "";
    const step = this.getAttribute("step") || "";
    const min = this.getAttribute("min") || "";

    const stepAttr = step ? `step="${step}"` : "";
    const minAttr = min ? `min="${min}"` : "";

    this.innerHTML = `
      <input
        type="${type}"
        id="${id}"
        class="form-input"
        placeholder="${placeholder}"
        value="${value}"
        ${stepAttr}
        ${minAttr}
      />
    `;

    // Forward events
    const input = this.querySelector("input");
    input.addEventListener("input", (e) => {
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: { value: e.target.value },
          bubbles: true,
        })
      );
    });

    input.addEventListener("change", (e) => {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: e.target.value },
          bubbles: true,
        })
      );
    });
  }

  get value() {
    const input = this.querySelector("input");
    return input ? input.value : "";
  }

  set value(val) {
    const input = this.querySelector("input");
    if (input) input.value = val;
  }
}

customElements.define("form-input", FormInput);

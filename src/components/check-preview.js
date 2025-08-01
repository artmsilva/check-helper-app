/**
 * CheckPreview - Displays a preview of the check based on form data
 */
class CheckPreview extends HTMLElement {
  constructor() {
    super();
    this.data = {
      date: "",
      payee: "",
      amountNumber: "",
      amountWords: "",
      memo: "",
    };
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && newValue) {
      try {
        this.data = JSON.parse(newValue);
        this.render();
      } catch (e) {
        console.error("Invalid JSON data passed to check-preview:", e);
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { date, payee, amountNumber, amountWords, memo } = this.data;

    this.innerHTML = `
      <div class="check-preview">
        <!-- Date -->
        <div class="check-date">
          <span>${date || ""}</span>
        </div>
        
        <!-- Payee and amount number -->
        <div class="check-payee-amount">
          <div class="check-payee">
            <span class="check-payee-label">Pay to the order of</span>
            <span class="check-payee-value">${payee || "\u00a0"}</span>
          </div>
          <div class="check-amount">
            <span class="check-amount-label">$</span>
            <span class="check-amount-value">${amountNumber || "\u00a0"}</span>
          </div>
        </div>
        
        <!-- Amount in words -->
        <div class="check-amount-words">
          <span class="check-amount-words-value">${
            amountWords || "\u00a0"
          }</span>
        </div>
        
        <!-- Memo and signature -->
        <div class="check-footer">
          <div class="check-memo">
            <span class="check-memo-label">Memo</span>
            <span class="check-memo-value">${memo || "\u00a0"}</span>
          </div>
          <div class="check-signature">
            <span class="check-signature-label">Signature</span>
            <span class="check-signature-line">&nbsp;</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("check-preview", CheckPreview);

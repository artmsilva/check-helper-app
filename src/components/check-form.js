import { convertAmountToWords } from "../utils/convertNumberToWords.js";

/**
 * CheckForm - Main form component for entering check details
 */
class CheckForm extends HTMLElement {
  constructor() {
    super();
    this.formData = {
      date: "",
      payee: "",
      amountNumber: "",
      amountWords: "",
      memo: "",
    };
  }

  connectedCallback() {
    this.render();
    // Use setTimeout to ensure all child components are fully initialized
    setTimeout(() => {
      this.attachEventListeners();
    }, 0);
  }

  render() {
    this.innerHTML = `
      <div class="form-container">
        <div class="form-grid">
          <div class="form-field">
            <form-label for="date">Date (MM/DD/YYYY)</form-label>
            <form-input
              id="date"
              type="date"
              value="${this.formData.date}"
            ></form-input>
          </div>
          
          <div class="form-field">
            <form-label for="payee">Payee name</form-label>
            <form-input
              id="payee"
              type="text"
              placeholder="Enter payee name"
              value="${this.formData.payee}"
            ></form-input>
          </div>
          
          <div class="form-field">
            <form-label for="amount-number">Amount (numeric)</form-label>
            <form-input
              id="amount-number"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value="${this.formData.amountNumber}"
            ></form-input>
          </div>
          
          <div class="form-field">
            <form-label for="amount-words">Amount in words</form-label>
            <form-input
              id="amount-words"
              type="text"
              placeholder="Amount in words"
              value="${this.formData.amountWords}"
            ></form-input>
          </div>
          
          <div class="form-field full-width">
            <form-label for="memo">Memo (optional)</form-label>
            <form-input
              id="memo"
              type="text"
              placeholder="Memo"
              value="${this.formData.memo}"
            ></form-input>
          </div>
        </div>
        
        <div class="form-actions">
          <form-button id="convert-btn" variant="primary">Convert Amount to Words</form-button>
          <form-button id="print-btn" variant="outline">Print</form-button>
        </div>
        
        <check-preview></check-preview>
      </div>
    `;
  }

  attachEventListeners() {
    // Input change handlers
    const inputs = this.querySelectorAll("form-input");
    console.log(`Found ${inputs.length} form-input elements`);

    inputs.forEach((input, index) => {
      console.log(`Setting up listener for input ${index}:`, input.id);
      input.addEventListener("input", (e) => {
        console.log("Input event received:", e.target.id, e.detail);
        const field = this.getFieldNameFromId(e.target.id);
        if (field && e.detail && e.detail.value !== undefined) {
          this.formData[field] = e.detail.value;
          this.updatePreview();
        } else {
          console.warn("Invalid event or missing field mapping:", {
            field,
            detail: e.detail,
          });
        }
      });
    });

    // Convert button
    const convertBtn = this.querySelector("#convert-btn");
    convertBtn.addEventListener("click", () => {
      this.handleConvert();
    });

    // Print button
    const printBtn = this.querySelector("#print-btn");
    printBtn.addEventListener("click", () => {
      this.handlePrint();
    });
  }

  getFieldNameFromId(id) {
    const fieldMap = {
      date: "date",
      payee: "payee",
      "amount-number": "amountNumber",
      "amount-words": "amountWords",
      memo: "memo",
    };
    return fieldMap[id];
  }

  handleConvert() {
    const convertedWords = convertAmountToWords(this.formData.amountNumber);
    this.formData.amountWords = convertedWords;

    // Update the input value using the component's setter
    const amountWordsInput = this.querySelector("#amount-words");
    if (amountWordsInput) {
      amountWordsInput.value = convertedWords;

      // Also trigger an input event to ensure the form data is synchronized
      amountWordsInput.dispatchEvent(
        new CustomEvent("input", {
          detail: { value: convertedWords },
          bubbles: true,
        })
      );
    }

    this.updatePreview();
  }

  handlePrint() {
    window.print();
  }

  updatePreview() {
    const preview = this.querySelector("check-preview");
    if (preview) {
      preview.setAttribute("data", JSON.stringify(this.formData));
    }
  }
}

customElements.define("check-form", CheckForm);

import { convertAmountToWords } from "utils/convertNumberToWords.js";

/**
 * CheckForm - Main form component for entering check details
 */
class CheckForm extends HTMLElement {
  constructor() {
    super();
    // Get today's date in YYYY-MM-DD format for date input
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    this.formData = {
      date: todayString,
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
      // Pass initial data to the interactive preview
      this.updatePreview();
    }, 0);
  }

  render() {
    this.innerHTML = `
      <div class="check-editor-container">
        <div class="editor-header">
          <h1>✨ Interactive Check Editor</h1>
          <p>Click on any field in the check below to edit it directly</p>
        </div>
        
        <!-- Full-width Interactive Check -->
        <div class="interactive-check-container">
          <check-preview editable="true"></check-preview>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Listen for data changes from the interactive check preview
    const preview = this.querySelector("check-preview");
    if (preview) {
      preview.addEventListener("dataChanged", (e) => {
        console.log("Data changed from preview:", e.detail);
        this.formData = { ...this.formData, ...e.detail };

        // Auto-convert amount if it was changed
        if (e.detail.amountNumber !== undefined) {
          this.autoConvertAmount(e.detail.amountNumber);
          // Update only the amount words without re-rendering the whole component
          const wordsElement = preview.querySelector(".amount-words-value");
          if (wordsElement) {
            wordsElement.textContent = this.formData.amountWords;
          }
        }
      });
    }
  }

  autoConvertAmount(value) {
    if (value && !isNaN(parseFloat(value))) {
      const convertedWords = convertAmountToWords(value);
      this.formData.amountWords = convertedWords;
    } else if (value === "" || value == null) {
      // Clear the words field if amount is empty
      this.formData.amountWords = "";
    }
  }

  updatePreview() {
    const preview = this.querySelector("check-preview");
    if (preview) {
      preview.updateData(this.formData);
    }
  }
}

customElements.define("check-form", CheckForm);

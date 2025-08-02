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
      <!-- App Header -->
      <header class="app-header">
        <div class="app-header-content">
          <div class="app-logo">
            <div class="logo-icon">💳</div>
            <div class="logo-text">
              <h1>Check Helper</h1>
              <span class="logo-tagline">Write checks with confidence</span>
            </div>
          </div>
          <nav class="app-nav">
            <button class="nav-btn" data-action="print">
              <span class="nav-icon">🖨️</span>
              <span class="nav-text">Print</span>
            </button>
            <button class="nav-btn" data-action="clear">
              <span class="nav-icon">🗑️</span>
              <span class="nav-text">Clear</span>
            </button>
            <button class="nav-btn" data-action="help">
              <span class="nav-icon">❓</span>
              <span class="nav-text">Help</span>
            </button>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="app-main">
        <div class="app-layout">
          <!-- Sidebar -->
          <aside class="app-sidebar">
            <div class="sidebar-card">
              <h2 class="sidebar-title">How to use</h2>
              <div class="instruction-steps">
                <div class="instruction-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>Click any field</h3>
                    <p>Tap on the check fields to edit them directly</p>
                  </div>
                </div>
                <div class="instruction-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>Enter amount</h3>
                    <p>Type the dollar amount - words are generated automatically</p>
                  </div>
                </div>
                <div class="instruction-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>Fill details</h3>
                    <p>Add payee name, date, and memo as needed</p>
                  </div>
                </div>
                <div class="instruction-step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h3>Print & use</h3>
                    <p>Print the check and copy the information to your real check</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="sidebar-card">
              <h2 class="sidebar-title">💡 Tips</h2>
              <div class="tips-list">
                <div class="tip-item">
                  <span class="tip-icon">✓</span>
                  <span>Double-check all amounts before writing</span>
                </div>
                <div class="tip-item">
                  <span class="tip-icon">✓</span>
                  <span>Use a pen with permanent ink</span>
                </div>
                <div class="tip-item">
                  <span class="tip-icon">✓</span>
                  <span>Keep your checks in a secure location</span>
                </div>
                <div class="tip-item">
                  <span class="tip-icon">✓</span>
                  <span>Record checks in your register</span>
                </div>
              </div>
            </div>
          </aside>

          <!-- Check Editor Area -->
          <div class="check-editor-area">
            <div class="editor-intro">
              <h2 class="editor-title">Interactive Check Editor</h2>
              <p class="editor-description">Click on any field in the check below to edit it directly. The amount will be automatically converted to words.</p>
            </div>
            
            <div class="check-container">
              <check-preview editable="true"></check-preview>
            </div>
          </div>
        </div>
      </main>
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

    // Handle navigation buttons
    const navButtons = this.querySelectorAll(".nav-btn");
    navButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const action = button.dataset.action;
        this.handleNavAction(action);
      });
    });
  }

  handleNavAction(action) {
    switch (action) {
      case "print":
        window.print();
        break;
      case "clear":
        this.clearForm();
        break;
      case "help":
        this.showHelp();
        break;
    }
  }

  clearForm() {
    // Reset form data
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    this.formData = {
      date: todayString,
      payee: "",
      amountNumber: "",
      amountWords: "",
      memo: "",
    };

    // Update preview
    this.updatePreview();
  }

  showHelp() {
    // Scroll to sidebar or show help modal
    const sidebar = this.querySelector(".app-sidebar");
    if (sidebar) {
      sidebar.scrollIntoView({ behavior: "smooth" });
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

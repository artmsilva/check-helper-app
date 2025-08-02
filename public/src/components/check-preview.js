import { convertAmountToWords } from "utils/convertNumberToWords.js";

/**
 * CheckPreview - Interactive WYSIWYG check editor
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
    this.isEditable = false;
    this.isEditing = false; // Track if we're currently editing
    this.activeField = null; // Track which field is being edited
  }

  static get observedAttributes() {
    return ["data", "editable"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data" && newValue) {
      try {
        this.data = JSON.parse(newValue);
        this.render();
      } catch (e) {
        console.error("Invalid JSON data passed to check-preview:", e);
      }
    } else if (name === "editable") {
      this.isEditable = newValue === "true";
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  updateData(newData) {
    this.data = { ...this.data, ...newData };
    // Only re-render if we're not currently editing a field
    if (!this.isEditing) {
      this.render();
    }
  }

  createEditableField(value, placeholder, fieldName, type = "text") {
    const displayValue = value || placeholder;
    const isEmpty = !value || value.trim() === "";

    return `
      <span 
        class="editable-field ${isEmpty ? "empty" : ""}" 
        data-field="${fieldName}"
        data-type="${type}"
        data-placeholder="${placeholder}"
        data-value="${value || ""}"
        ${this.isEditable ? 'contenteditable="true"' : ""}
        spellcheck="false"
      >${displayValue || "&nbsp;"}</span>
    `;
  }

  formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  render() {
    const { date, payee, amountNumber, amountWords, memo } = this.data;

    this.innerHTML = `
      <div class="interactive-check ${this.isEditable ? "editable" : ""}">
        <!-- Check Header -->
        <div class="check-header">
          <div class="check-number">#1001</div>
          <div class="bank-info">
            <div class="bank-name">First National Bank</div>
            <div class="bank-address">123 Main Street, Anytown, ST 12345</div>
          </div>
        </div>
        
        <!-- Date Field -->
        <div class="check-date-section">
          <span class="date-label">Date:</span>
          ${this.createEditableField(
            this.formatDate(date),
            "Click to set date",
            "date",
            "date"
          )}
        </div>
        
        <!-- Payee Line -->
        <div class="check-payee-section">
          <span class="payee-label">Pay to the order of</span>
          ${this.createEditableField(
            payee,
            "Click to enter payee name",
            "payee"
          )}
          <span class="dollar-sign">$</span>
          ${this.createEditableField(
            amountNumber,
            "0.00",
            "amountNumber",
            "number"
          )}
        </div>
        
        <!-- Amount in Words Line -->
        <div class="check-amount-words-section">
          <span class="amount-words-value">${
            amountWords || "Amount in words will appear here"
          }</span>
          <span class="dollars-label">DOLLARS</span>
        </div>
        
        <!-- Account Info Line -->
        <div class="check-account-info">
          <div class="routing-account">
            <span class="routing">⑆123456789⑆</span>
            <span class="account">1234567890</span>
            <span class="check-num">⑆ 1001</span>
          </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="check-footer-section">
          <div class="memo-section">
            <span class="memo-label">Memo:</span>
            ${this.createEditableField(memo, "Click to add memo", "memo")}
          </div>
          <div class="signature-section">
            <span class="signature-label">Signature:</span>
            <div class="signature-line"></div>
          </div>
        </div>
      </div>
    `;

    if (this.isEditable) {
      this.attachEditListeners();
    }
  }

  attachEditListeners() {
    const editableFields = this.querySelectorAll(".editable-field");

    editableFields.forEach((field) => {
      // Handle click to focus and edit
      field.addEventListener("click", (e) => {
        this.handleFieldClick(e.target);
      });

      // Handle blur to save changes
      field.addEventListener("blur", (e) => {
        this.handleFieldBlur(e.target);
      });

      // Handle enter key
      field.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.target.blur();
        }
      });

      // Handle input for real-time updates
      field.addEventListener("input", (e) => {
        this.handleFieldInput(e.target);
      });
    });
  }

  handleFieldClick(field) {
    const fieldName = field.dataset.field;
    const placeholder = field.dataset.placeholder;
    const currentValue = field.dataset.value || "";

    // Set editing state
    this.isEditing = true;
    this.activeField = field;

    // Clear placeholder text when clicking and set actual value
    if (field.classList.contains("empty")) {
      field.textContent = currentValue;
      field.classList.remove("empty");
    }

    // Special handling for date field
    if (fieldName === "date") {
      this.createDateInput(field);
    } else {
      // Focus at the end of the text
      field.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(field);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  createDateInput(field) {
    const currentDate =
      this.data.date || new Date().toISOString().split("T")[0];

    const input = document.createElement("input");
    input.type = "date";
    input.value = currentDate;
    input.className = "date-input-overlay";

    field.style.position = "relative";
    field.appendChild(input);
    input.focus();

    const handleDateChange = () => {
      const newDate = input.value;
      // Clear editing state
      this.isEditing = false;
      this.activeField = null;

      this.updateField("date", newDate);
      input.remove();
      field.style.position = "";
    };

    input.addEventListener("change", handleDateChange);
    input.addEventListener("blur", handleDateChange);
  }

  handleFieldBlur(field) {
    const fieldName = field.dataset.field;
    const placeholder = field.dataset.placeholder;
    const value = field.textContent.trim();

    // Clear editing state
    this.isEditing = false;
    this.activeField = null;

    // Update the data-value attribute
    field.dataset.value = value;

    // Restore placeholder if empty
    if (!value) {
      field.innerHTML = placeholder;
      field.classList.add("empty");
    } else {
      field.classList.remove("empty");
    }

    this.updateField(fieldName, value);
  }

  handleFieldInput(field) {
    const fieldName = field.dataset.field;
    const value = field.textContent.trim();

    // Real-time update for amount conversion
    if (fieldName === "amountNumber") {
      this.updateField(fieldName, value, true);
    }
  }

  updateField(fieldName, value, isRealTime = false) {
    this.data[fieldName] = value;

    // Auto-convert amount to words
    if (fieldName === "amountNumber" && value) {
      if (!isNaN(parseFloat(value))) {
        this.data.amountWords = convertAmountToWords(value);
        // Update the words display immediately without re-rendering
        const wordsElement = this.querySelector(".amount-words-value");
        if (wordsElement) {
          wordsElement.textContent = this.data.amountWords;
        }
      }
    }

    // Only emit change event for non-real-time updates to avoid excessive events
    if (!isRealTime) {
      this.dispatchEvent(
        new CustomEvent("dataChanged", {
          detail: this.data,
          bubbles: true,
        })
      );
    }
  }
}

customElements.define("check-preview", CheckPreview);

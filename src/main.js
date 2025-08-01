// Import web components
import "./components/check-form.js";
import "./components/check-preview.js";
import "./components/ui/form-input.js";
import "./components/ui/form-label.js";
import "./components/ui/form-button.js";
import "./components/ui/layout-components.js";

// Import styles
import "./index.css";

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="app-container">
      <ui-heading level="1" class="app-title">Handwritten Check Helper</ui-heading>
      <check-form></check-form>
    </div>
  `;
});

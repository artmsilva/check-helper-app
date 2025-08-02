/**
 * Interactive Check Helper - Main Application Entry Point
 *
 * This project demonstrates modern web development with vanilla JavaScript:
 * - Web Components for reusable UI elements
 * - CSS custom properties for design systems
 * - Event-driven architecture
 * - Native ES modules with import maps (no build tools!)
 * - No framework dependencies
 *
 * Import maps allow us to use clean import paths without bundlers.
 * Modern browsers support this natively, making build tools optional.
 *
 * The code is intentionally kept readable to help developers
 * learn from the implementation.
 *
 * Feel free to explore, learn, and build upon this code!
 */

// Import web components using import map paths
import "components/check-form.js";
import "components/check-preview.js";

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) {
    console.error("Root element not found");
    return;
  }

  root.innerHTML = `
    <div class="app">
      <check-form></check-form>
    </div>
  `;
});

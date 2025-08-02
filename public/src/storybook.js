import "../src/components/ui/form-input.js";
import "../src/components/ui/form-label.js";
import "../src/components/ui/form-button.js";
import "../src/components/ui/layout-components.js";
import "../src/index.css";

// Storybook app styles
const storybookStyles = `
  .storybook-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
    padding: var(--space-4);
    overflow-y: auto;
    z-index: var(--z-fixed);
  }

  .storybook-content {
    margin-left: 250px;
    padding: var(--space-6);
    min-height: 100vh;
  }

  .nav-section {
    margin-bottom: var(--space-4);
  }

  .nav-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-2);
  }

  .nav-item {
    display: block;
    padding: var(--space-2) var(--space-3);
    color: var(--color-text-primary);
    text-decoration: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-1);
    transition: background-color var(--transition-fast);
  }

  .nav-item:hover {
    background-color: var(--color-gray-100);
  }

  .nav-item.active {
    background-color: var(--color-primary-100);
    color: var(--color-primary-700);
    font-weight: var(--font-weight-medium);
  }

  .story-section {
    margin-bottom: var(--space-8);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .story-header {
    padding: var(--space-4);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-gray-50);
  }

  .story-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-1);
  }

  .story-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .story-content {
    padding: var(--space-6);
  }

  .example-group {
    margin-bottom: var(--space-6);
  }

  .example-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
  }

  .example-demo {
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-3);
    background: var(--color-white);
  }

  .example-code {
    background: var(--color-gray-900);
    color: var(--color-gray-100);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--font-size-sm);
    overflow-x: auto;
    white-space: pre;
  }

  .color-palette {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-3);
  }

  .color-swatch {
    text-align: center;
  }

  .color-preview {
    width: 100%;
    height: 60px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    margin-bottom: var(--space-2);
  }

  .color-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  .color-value {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }

  .spacing-demo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .spacing-visual {
    background: var(--color-primary-500);
    height: 20px;
    border-radius: var(--radius-base);
  }

  .spacing-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    min-width: 100px;
  }

  .component-variants {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
  }

  .variant-demo {
    text-align: center;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-gray-50);
  }

  .variant-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-2);
  }

  @media (max-width: 768px) {
    .storybook-nav {
      width: 100%;
      height: auto;
      position: relative;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }
    
    .storybook-content {
      margin-left: 0;
    }
  }
`;

// Add styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = storybookStyles;
document.head.appendChild(styleSheet);

// Navigation structure
const navigation = [
  {
    title: "Foundation",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "inputs", label: "Form Inputs" },
      { id: "layout", label: "Layout" },
    ],
  },
  {
    title: "Examples",
    items: [
      { id: "forms", label: "Forms" },
      { id: "cards", label: "Cards" },
    ],
  },
];

// Story content
const stories = {
  colors: {
    title: "Colors",
    description:
      "Color palette and semantic color tokens used throughout the design system.",
    content: `
      <div class="example-group">
        <div class="example-title">Primary Colors</div>
        <div class="color-palette">
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-primary-100);"></div>
            <div class="color-label">Primary 100</div>
            <div class="color-value">#dbeafe</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-primary-300);"></div>
            <div class="color-label">Primary 300</div>
            <div class="color-value">#93c5fd</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-primary-500);"></div>
            <div class="color-label">Primary 500</div>
            <div class="color-value">#3b82f6</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-primary-700);"></div>
            <div class="color-label">Primary 700</div>
            <div class="color-value">#1d4ed8</div>
          </div>
        </div>
      </div>

      <div class="example-group">
        <div class="example-title">Gray Scale</div>
        <div class="color-palette">
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-gray-50);"></div>
            <div class="color-label">Gray 50</div>
            <div class="color-value">#f9fafb</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-gray-200);"></div>
            <div class="color-label">Gray 200</div>
            <div class="color-value">#e5e7eb</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-gray-400);"></div>
            <div class="color-label">Gray 400</div>
            <div class="color-value">#9ca3af</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-gray-600);"></div>
            <div class="color-label">Gray 600</div>
            <div class="color-value">#4b5563</div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background-color: var(--color-gray-800);"></div>
            <div class="color-label">Gray 800</div>
            <div class="color-value">#1f2937</div>
          </div>
        </div>
      </div>
    `,
  },

  typography: {
    title: "Typography",
    description: "Typography scale, font weights, and text utilities.",
    content: `
      <div class="example-group">
        <div class="example-title">Headings</div>
        <div class="example-demo">
          <ui-heading level="1">Heading 1 - 30px</ui-heading>
          <ui-heading level="2">Heading 2 - 24px</ui-heading>
          <ui-heading level="3">Heading 3 - 20px</ui-heading>
          <ui-heading level="4">Heading 4 - 18px</ui-heading>
        </div>
        <div class="example-code">&lt;ui-heading level="1"&gt;Heading 1&lt;/ui-heading&gt;
&lt;ui-heading level="2"&gt;Heading 2&lt;/ui-heading&gt;
&lt;ui-heading level="3"&gt;Heading 3&lt;/ui-heading&gt;
&lt;ui-heading level="4"&gt;Heading 4&lt;/ui-heading&gt;</div>
      </div>

      <div class="example-group">
        <div class="example-title">Text Sizes</div>
        <div class="example-demo">
          <ui-text size="xs">Extra small text (12px)</ui-text><br>
          <ui-text size="sm">Small text (14px)</ui-text><br>
          <ui-text size="base">Base text (16px)</ui-text><br>
          <ui-text size="lg">Large text (18px)</ui-text><br>
          <ui-text size="xl">Extra large text (20px)</ui-text>
        </div>
        <div class="example-code">&lt;ui-text size="xs"&gt;Extra small text&lt;/ui-text&gt;
&lt;ui-text size="sm"&gt;Small text&lt;/ui-text&gt;
&lt;ui-text size="base"&gt;Base text&lt;/ui-text&gt;
&lt;ui-text size="lg"&gt;Large text&lt;/ui-text&gt;</div>
      </div>

      <div class="example-group">
        <div class="example-title">Font Weights</div>
        <div class="example-demo">
          <ui-text weight="normal">Normal weight text</ui-text><br>
          <ui-text weight="medium">Medium weight text</ui-text><br>
          <ui-text weight="semibold">Semibold weight text</ui-text><br>
          <ui-text weight="bold">Bold weight text</ui-text>
        </div>
        <div class="example-code">&lt;ui-text weight="normal"&gt;Normal weight&lt;/ui-text&gt;
&lt;ui-text weight="medium"&gt;Medium weight&lt;/ui-text&gt;
&lt;ui-text weight="semibold"&gt;Semibold weight&lt;/ui-text&gt;
&lt;ui-text weight="bold"&gt;Bold weight&lt;/ui-text&gt;</div>
      </div>
    `,
  },

  spacing: {
    title: "Spacing",
    description:
      "Consistent spacing scale used for margins, padding, and gaps.",
    content: `
      <div class="example-group">
        <div class="example-title">Spacing Scale</div>
        <div class="example-demo">
          <div class="spacing-demo">
            <div class="spacing-label">Space 1 (4px)</div>
            <div class="spacing-visual" style="width: var(--space-1);"></div>
          </div>
          <div class="spacing-demo">
            <div class="spacing-label">Space 2 (8px)</div>
            <div class="spacing-visual" style="width: var(--space-2);"></div>
          </div>
          <div class="spacing-demo">
            <div class="spacing-label">Space 3 (12px)</div>
            <div class="spacing-visual" style="width: var(--space-3);"></div>
          </div>
          <div class="spacing-demo">
            <div class="spacing-label">Space 4 (16px)</div>
            <div class="spacing-visual" style="width: var(--space-4);"></div>
          </div>
          <div class="spacing-demo">
            <div class="spacing-label">Space 6 (24px)</div>
            <div class="spacing-visual" style="width: var(--space-6);"></div>
          </div>
          <div class="spacing-demo">
            <div class="spacing-label">Space 8 (32px)</div>
            <div class="spacing-visual" style="width: var(--space-8);"></div>
          </div>
        </div>
        <div class="example-code">/* CSS Custom Properties */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */</div>
      </div>
    `,
  },

  buttons: {
    title: "Buttons",
    description: "Button variants and sizes for different use cases.",
    content: `
      <div class="example-group">
        <div class="example-title">Button Variants</div>
        <div class="component-variants">
          <div class="variant-demo">
            <div class="variant-label">Primary</div>
            <form-button variant="primary">Primary</form-button>
          </div>
          <div class="variant-demo">
            <div class="variant-label">Secondary</div>
            <form-button variant="secondary">Secondary</form-button>
          </div>
          <div class="variant-demo">
            <div class="variant-label">Outline</div>
            <form-button variant="outline">Outline</form-button>
          </div>
          <div class="variant-demo">
            <div class="variant-label">Ghost</div>
            <form-button variant="ghost">Ghost</form-button>
          </div>
        </div>
        <div class="example-code">&lt;form-button variant="primary"&gt;Primary&lt;/form-button&gt;
&lt;form-button variant="secondary"&gt;Secondary&lt;/form-button&gt;
&lt;form-button variant="outline"&gt;Outline&lt;/form-button&gt;
&lt;form-button variant="ghost"&gt;Ghost&lt;/form-button&gt;</div>
      </div>

      <div class="example-group">
        <div class="example-title">Button Sizes</div>
        <div class="example-demo">
          <ui-inline spacing="md" align="center">
            <form-button variant="primary" size="sm">Small</form-button>
            <form-button variant="primary">Default</form-button>
            <form-button variant="primary" size="lg">Large</form-button>
          </ui-inline>
        </div>
        <div class="example-code">&lt;form-button variant="primary" size="sm"&gt;Small&lt;/form-button&gt;
&lt;form-button variant="primary"&gt;Default&lt;/form-button&gt;
&lt;form-button variant="primary" size="lg"&gt;Large&lt;/form-button&gt;</div>
      </div>
    `,
  },

  inputs: {
    title: "Form Inputs",
    description: "Input components with labels for form construction.",
    content: `
      <div class="example-group">
        <div class="example-title">Text Inputs</div>
        <div class="example-demo">
          <ui-stack spacing="md">
            <div class="form-field">
              <form-label for="demo-text">Text Input</form-label>
              <form-input id="demo-text" placeholder="Enter text"></form-input>
            </div>
            <div class="form-field">
              <form-label for="demo-email">Email Input</form-label>
              <form-input type="email" id="demo-email" placeholder="user@example.com"></form-input>
            </div>
            <div class="form-field">
              <form-label for="demo-number">Number Input</form-label>
              <form-input type="number" id="demo-number" placeholder="0.00" step="0.01"></form-input>
            </div>
          </ui-stack>
        </div>
        <div class="example-code">&lt;div class="form-field"&gt;
  &lt;form-label for="demo-text"&gt;Text Input&lt;/form-label&gt;
  &lt;form-input id="demo-text" placeholder="Enter text"&gt;&lt;/form-input&gt;
&lt;/div&gt;</div>
      </div>
    `,
  },

  layout: {
    title: "Layout Components",
    description: "Flexible layout components for organizing content.",
    content: `
      <div class="example-group">
        <div class="example-title">Stack Layout</div>
        <div class="example-demo">
          <ui-stack spacing="md">
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Item 1</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Item 2</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Item 3</div>
          </ui-stack>
        </div>
        <div class="example-code">&lt;ui-stack spacing="md"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
&lt;/ui-stack&gt;</div>
      </div>

      <div class="example-group">
        <div class="example-title">Inline Layout</div>
        <div class="example-demo">
          <ui-inline spacing="md" justify="between">
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Left</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Right</div>
          </ui-inline>
        </div>
        <div class="example-code">&lt;ui-inline spacing="md" justify="between"&gt;
  &lt;div&gt;Left&lt;/div&gt;
  &lt;div&gt;Right&lt;/div&gt;
&lt;/ui-inline&gt;</div>
      </div>

      <div class="example-group">
        <div class="example-title">Grid Layout</div>
        <div class="example-demo">
          <ui-grid columns="2" breakpoint="md" spacing="sm">
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Grid 1</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Grid 2</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Grid 3</div>
            <div style="padding: var(--space-3); background: var(--color-primary-100); border-radius: var(--radius-md);">Grid 4</div>
          </ui-grid>
        </div>
        <div class="example-code">&lt;ui-grid columns="2" breakpoint="md" spacing="sm"&gt;
  &lt;div&gt;Grid 1&lt;/div&gt;
  &lt;div&gt;Grid 2&lt;/div&gt;
  &lt;div&gt;Grid 3&lt;/div&gt;
  &lt;div&gt;Grid 4&lt;/div&gt;
&lt;/ui-grid&gt;</div>
      </div>
    `,
  },

  forms: {
    title: "Form Examples",
    description: "Complete form layouts using the design system components.",
    content: `
      <div class="example-group">
        <div class="example-title">Contact Form</div>
        <div class="example-demo">
          <ui-stack spacing="lg">
            <ui-heading level="3">Get In Touch</ui-heading>
            
            <ui-grid columns="2" breakpoint="md" spacing="md">
              <div class="form-field">
                <form-label for="contact-first">First Name</form-label>
                <form-input id="contact-first" placeholder="John"></form-input>
              </div>
              
              <div class="form-field">
                <form-label for="contact-last">Last Name</form-label>
                <form-input id="contact-last" placeholder="Doe"></form-input>
              </div>
            </ui-grid>
            
            <div class="form-field">
              <form-label for="contact-email">Email Address</form-label>
              <form-input type="email" id="contact-email" placeholder="john.doe@example.com"></form-input>
            </div>
            
            <ui-inline justify="end" spacing="md">
              <form-button variant="ghost">Cancel</form-button>
              <form-button variant="primary">Send Message</form-button>
            </ui-inline>
          </ui-stack>
        </div>
      </div>
    `,
  },

  cards: {
    title: "Card Examples",
    description: "Card layouts for displaying content.",
    content: `
      <div class="example-group">
        <div class="example-title">Feature Cards</div>
        <div class="example-demo">
          <ui-grid columns="3" breakpoint="md" spacing="lg">
            <ui-card variant="interactive">
              <ui-stack spacing="sm">
                <ui-heading level="4">🚀 Performance</ui-heading>
                <ui-text color="secondary">Lightning fast components built for speed.</ui-text>
              </ui-stack>
            </ui-card>
            
            <ui-card variant="interactive">
              <ui-stack spacing="sm">
                <ui-heading level="4">🎨 Design</ui-heading>
                <ui-text color="secondary">Beautiful and consistent visual design.</ui-text>
              </ui-stack>
            </ui-card>
            
            <ui-card variant="interactive">
              <ui-stack spacing="sm">
                <ui-heading level="4">🔧 Flexible</ui-heading>
                <ui-text color="secondary">Highly customizable and extensible.</ui-text>
              </ui-stack>
            </ui-card>
          </ui-grid>
        </div>
      </div>
    `,
  },
};

// Initialize the storybook
function initStorybook() {
  document.body.innerHTML = `
    <div class="storybook-nav">
      <ui-heading level="2" style="margin-bottom: var(--space-4);">Design System</ui-heading>
      ${navigation
        .map(
          (section) => `
        <div class="nav-section">
          <div class="nav-title">${section.title}</div>
          ${section.items
            .map(
              (item) => `
            <a href="#${item.id}" class="nav-item" data-story="${item.id}">${item.label}</a>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </div>
    
    <div class="storybook-content">
      <div id="story-container">
        <!-- Story content will be inserted here -->
      </div>
    </div>
  `;

  // Handle navigation
  const navItems = document.querySelectorAll(".nav-item");
  const storyContainer = document.getElementById("story-container");

  function showStory(storyId) {
    const story = stories[storyId];
    if (!story) return;

    // Update active nav item
    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.story === storyId);
    });

    // Render story content
    storyContainer.innerHTML = `
      <div class="story-section">
        <div class="story-header">
          <div class="story-title">${story.title}</div>
          <div class="story-description">${story.description}</div>
        </div>
        <div class="story-content">
          ${story.content}
        </div>
      </div>
    `;
  }

  // Navigation event listeners
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const storyId = item.dataset.story;
      window.location.hash = storyId;
      showStory(storyId);
    });
  });

  // Handle initial load and hash changes
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    const storyId = hash || "colors";
    showStory(storyId);
  }

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStorybook);
} else {
  initStorybook();
}

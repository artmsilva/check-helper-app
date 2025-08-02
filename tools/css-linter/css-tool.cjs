#!/usr/bin/env node

/**
 * CSS Design Token Linter & Auto-Fixer
 *
 * A comprehensive tool for maintaining design system consistency.
 * - Lint: Detect hardcoded values that should use design tokens
 * - Fix: Automatically replace hardcoded values with tokens
 * - Analyze: Generate detailed reports on token usage
 *
 * Built for CSS Layer architecture and modern design token workflows.
 */

const fs = require("fs").promises;
const path = require("path");

class CSSDesignTokenTool {
  constructor() {
    this.designTokens = new Map();
    this.violations = [];
    this.fixes = [];
    this.stats = {
      tokensFound: 0,
      violationsFound: 0,
      fixesApplied: 0,
      filesProcessed: 0,
      layersAnalyzed: 0,
    };
  }

  /**
   * Main entry point - routes to lint or fix based on mode
   */
  async run(cssFilePath, options = {}) {
    const {
      mode = "lint",
      dryRun = false,
      backup = true,
      enhanced = true,
    } = options;

    console.log("🔍 CSS Design Token Tool");
    console.log("========================\n");
    console.log(`📁 File: ${cssFilePath}`);
    console.log(`🎯 Mode: ${mode.toUpperCase()}${dryRun ? " (DRY RUN)" : ""}`);
    console.log(`📊 Analysis: ${enhanced ? "Enhanced" : "Basic"}\n`);

    try {
      const cssContent = await fs.readFile(cssFilePath, "utf8");
      console.log(`📄 File size: ${cssContent.length} characters`);

      // Extract design tokens
      await this.extractDesignTokens(cssContent);

      if (mode === "fix") {
        await this.runFixer(cssFilePath, cssContent, { dryRun, backup });
      } else {
        await this.runLinter(cssContent, cssFilePath, { enhanced });
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  }

  /**
   * Extract design tokens from @layer tokens section
   */
  async extractDesignTokens(cssContent) {
    console.log("📦 Extracting design tokens...");

    const tokensLayerMatch = cssContent.match(/@layer tokens \{([\s\S]*?)^\}/m);
    if (!tokensLayerMatch) {
      console.log("⚠️  No tokens layer found");
      return;
    }

    const tokensContent = tokensLayerMatch[1];
    const customPropRegex = /--([a-zA-Z-]+):\s*([^;]+);/g;
    let match;

    while ((match = customPropRegex.exec(tokensContent)) !== null) {
      const [, tokenName, tokenValue] = match;
      const fullTokenName = `--${tokenName}`;
      const cleanValue = tokenValue.replace(/\/\*.*?\*\//g, "").trim();

      this.designTokens.set(fullTokenName, {
        name: fullTokenName,
        value: cleanValue,
        category: this.categorizeToken(tokenName),
      });
    }

    this.stats.tokensFound = this.designTokens.size;
    console.log(`✅ Found ${this.stats.tokensFound} design tokens\n`);
  }

  /**
   * Categorize tokens by their purpose
   */
  categorizeToken(tokenName) {
    if (tokenName.includes("color")) return "color";
    if (
      tokenName.includes("font-size") ||
      tokenName.includes("font-weight") ||
      tokenName.includes("line-height") ||
      tokenName.includes("font-family")
    )
      return "typography";
    if (tokenName.includes("space") || tokenName.includes("size"))
      return "spacing";
    if (tokenName.includes("radius")) return "border-radius";
    if (tokenName.includes("shadow")) return "shadow";
    if (tokenName.includes("transition")) return "animation";
    if (tokenName.includes("breakpoint")) return "breakpoint";
    if (tokenName.includes("z-")) return "z-index";
    return "other";
  }

  /**
   * Run linter mode
   */
  async runLinter(cssContent, filePath, options = {}) {
    const { enhanced = true } = options;

    console.log("🔍 Analyzing CSS for violations...");

    const layers = this.extractLayers(cssContent);
    const layersToAnalyze = ["base", "layout", "components", "utilities"];

    for (const layerName of layersToAnalyze) {
      if (layers[layerName]) {
        console.log(`   Analyzing layer: ${layerName}`);
        this.analyzeLayer(layers[layerName], layerName, filePath, enhanced);
        this.stats.layersAnalyzed++;
      }
    }

    this.stats.violationsFound = this.violations.length;
    console.log(`📊 Found ${this.violations.length} potential violations\n`);

    this.generateLintReport(enhanced);
  }

  /**
   * Run fixer mode
   */
  async runFixer(cssFilePath, cssContent, options = {}) {
    const { dryRun = false, backup = true } = options;

    // Create backup if requested and not in dry run mode
    if (backup && !dryRun) {
      await this.createBackup(cssFilePath);
    }

    console.log("🔧 Applying fixes...");
    const fixedContent = await this.applyFixes(cssContent);

    if (!dryRun && this.fixes.length > 0) {
      await fs.writeFile(cssFilePath, fixedContent, "utf8");
    }

    this.stats.fixesApplied = this.fixes.length;
    this.generateFixReport(dryRun);
  }

  /**
   * Create backup file
   */
  async createBackup(cssFilePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = `${cssFilePath}.backup-${timestamp}`;

    const originalContent = await fs.readFile(cssFilePath, "utf8");
    await fs.writeFile(backupPath, originalContent, "utf8");

    console.log(`💾 Backup created: ${backupPath}`);
  }

  /**
   * Extract CSS layers with proper brace matching
   */
  extractLayers(cssContent) {
    const layers = {};
    const layerStarts = [];

    // Find all @layer declarations
    const layerRegex = /@layer\s+(\w+)\s*\{/g;
    let match;

    while ((match = layerRegex.exec(cssContent)) !== null) {
      layerStarts.push({
        name: match[1],
        start: match.index + match[0].length,
        openBracePos: match.index + match[0].length - 1,
      });
    }

    // For each layer, find its content by matching braces
    layerStarts.forEach((layer) => {
      let braceCount = 1;
      let pos = layer.start;

      while (pos < cssContent.length && braceCount > 0) {
        if (cssContent[pos] === "{") {
          braceCount++;
        } else if (cssContent[pos] === "}") {
          braceCount--;
        }
        pos++;
      }

      if (braceCount === 0) {
        // Extract content between the opening and closing braces
        const content = cssContent.substring(layer.start, pos - 1);
        layers[layer.name] = content;
      }
    });

    return layers;
  }

  /**
   * Analyze a specific CSS layer
   */
  analyzeLayer(layerContent, layerName, filePath, enhanced = true) {
    const lines = layerContent.split("\n");

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("/*") || !trimmedLine) return;

      // Core checks (always run)
      this.checkForHardcodedColors(trimmedLine, layerName, index + 1, filePath);
      this.checkForHardcodedSpacing(
        trimmedLine,
        layerName,
        index + 1,
        filePath
      );

      // Enhanced checks (optional)
      if (enhanced) {
        this.checkForHardcodedTypography(
          trimmedLine,
          layerName,
          index + 1,
          filePath
        );
        this.checkForHardcodedShadows(
          trimmedLine,
          layerName,
          index + 1,
          filePath
        );
        this.checkForHardcodedBorderRadius(
          trimmedLine,
          layerName,
          index + 1,
          filePath
        );
      }
    });
  }

  /**
   * Check for hardcoded color values
   */
  checkForHardcodedColors(line, layer, lineNumber, filePath) {
    const colorPatterns = [
      /#[0-9a-fA-F]{3,8}/g, // Hex colors
      /rgba?\([^)]+\)/g, // RGB/RGBA
      /hsla?\([^)]+\)/g, // HSL/HSLA
    ];

    colorPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const hardcodedValue = match[0];

        // Skip if this specific value is inside a CSS custom property var()
        const varPattern = new RegExp(
          `var\\([^)]*\\b${hardcodedValue.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          )}\\b[^)]*\\)`,
          "g"
        );
        if (varPattern.test(line)) continue;

        // Skip if this line is defining a CSS custom property (--token: value)
        if (
          line.match(/^\s*--[a-zA-Z-]+\s*:\s*/) &&
          line.includes(hardcodedValue)
        )
          continue;

        const suggestion = this.findColorTokenSuggestion(hardcodedValue);

        this.violations.push({
          type: "hardcoded-color",
          value: hardcodedValue,
          layer,
          line: lineNumber,
          suggestion,
          severity: suggestion ? "error" : "warning",
          context: line.trim(),
        });
      }
    });
  }

  /**
   * Check for hardcoded spacing values
   */
  checkForHardcodedSpacing(line, layer, lineNumber, filePath) {
    const spacingPattern =
      /(margin|padding|gap|top|right|bottom|left)(?:-\w+)?\s*:\s*([0-9.]+(?:rem|px|em))/g;
    let match;

    while ((match = spacingPattern.exec(line)) !== null) {
      const [, property, value] = match;
      if (line.includes("var(--")) continue;

      const suggestion = this.findSpacingTokenSuggestion(value);

      if (suggestion) {
        this.violations.push({
          type: "hardcoded-spacing",
          property,
          value,
          layer,
          line: lineNumber,
          suggestion,
          severity: "error",
          context: line.trim(),
        });
      }
    }
  }

  /**
   * Check for hardcoded typography values
   */
  checkForHardcodedTypography(line, layer, lineNumber, filePath) {
    // Font size patterns
    const fontSizePattern = /font-size\s*:\s*([0-9.]+(?:rem|px|em))/g;
    let match;

    while ((match = fontSizePattern.exec(line)) !== null) {
      const value = match[1];
      if (line.includes("var(--")) continue;

      const suggestion = this.findTypographyTokenSuggestion(value, "font-size");

      if (suggestion) {
        this.violations.push({
          type: "hardcoded-typography",
          property: "font-size",
          value,
          layer,
          line: lineNumber,
          suggestion,
          severity: "warning",
          context: line.trim(),
        });
      }
    }

    // Font weight patterns
    const fontWeightPattern = /font-weight\s*:\s*([0-9]+)/g;
    while ((match = fontWeightPattern.exec(line)) !== null) {
      const value = match[1];
      if (line.includes("var(--")) continue;

      const suggestion = this.findTypographyTokenSuggestion(
        value,
        "font-weight"
      );

      if (suggestion) {
        this.violations.push({
          type: "hardcoded-typography",
          property: "font-weight",
          value,
          layer,
          line: lineNumber,
          suggestion,
          severity: "warning",
          context: line.trim(),
        });
      }
    }
  }

  /**
   * Check for hardcoded shadow values
   */
  checkForHardcodedShadows(line, layer, lineNumber, filePath) {
    if (
      line.includes("box-shadow") &&
      !line.includes("var(--") &&
      !line.includes("none")
    ) {
      const shadowMatch = line.match(/box-shadow\s*:\s*([^;]+)/);
      if (shadowMatch) {
        const value = shadowMatch[1].trim();

        this.violations.push({
          type: "hardcoded-shadow",
          property: "box-shadow",
          value,
          layer,
          line: lineNumber,
          suggestion: "--shadow-base",
          severity: "warning",
          context: line.trim(),
        });
      }
    }
  }

  /**
   * Check for hardcoded border radius values
   */
  checkForHardcodedBorderRadius(line, layer, lineNumber, filePath) {
    const radiusPattern = /border-radius\s*:\s*([0-9.]+(?:rem|px|em))/g;
    let match;

    while ((match = radiusPattern.exec(line)) !== null) {
      const value = match[1];
      if (line.includes("var(--")) continue;

      const suggestion = this.findRadiusTokenSuggestion(value);

      if (suggestion) {
        this.violations.push({
          type: "hardcoded-border-radius",
          property: "border-radius",
          value,
          layer,
          line: lineNumber,
          suggestion,
          severity: "warning",
          context: line.trim(),
        });
      }
    }
  }

  /**
   * Apply fixes to CSS content
   */
  async applyFixes(cssContent) {
    let fixedContent = cssContent;
    const layers = this.extractLayers(cssContent);
    const layersToFix = ["base", "layout", "components", "utilities"];

    for (const layerName of layersToFix) {
      if (layers[layerName]) {
        console.log(`   Fixing layer: ${layerName}`);
        const fixedLayer = this.fixLayer(layers[layerName], layerName);

        // Replace the layer content in the main CSS
        const layerRegex = new RegExp(
          `(@layer\\s+${layerName}\\s*\\{)([\\s\\S]*?)(^\\s*\\})`,
          "m"
        );
        fixedContent = fixedContent.replace(layerRegex, `$1${fixedLayer}$3`);
      }
    }

    console.log(`✅ Applied ${this.fixes.length} fixes\n`);
    return fixedContent;
  }

  /**
   * Fix a CSS layer
   */
  fixLayer(layerContent, layerName) {
    let fixedContent = layerContent;
    const lines = layerContent.split("\n");

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("/*") || !trimmedLine) return;

      const fixedLine = this.fixLine(line, layerName, index + 1);
      if (fixedLine !== line) {
        fixedContent = fixedContent.replace(line, fixedLine);
      }
    });

    return fixedContent;
  }

  /**
   * Fix a single line
   */
  fixLine(line, layer, lineNumber) {
    let fixedLine = line;

    // Apply fixes in order
    fixedLine = this.fixHardcodedColors(fixedLine, layer, lineNumber);
    fixedLine = this.fixHardcodedSpacing(fixedLine, layer, lineNumber);
    fixedLine = this.fixHardcodedTypography(fixedLine, layer, lineNumber);
    fixedLine = this.fixHardcodedBorderRadius(fixedLine, layer, lineNumber);

    return fixedLine;
  }

  /**
   * Fix hardcoded colors
   */
  fixHardcodedColors(line, layer, lineNumber) {
    let fixedLine = line;

    // Skip if this line is defining a CSS custom property (--token: value)
    if (line.match(/^\s*--[a-zA-Z-]+\s*:\s*/)) return fixedLine;

    const colorMappings = this.getColorMappings();

    Object.entries(colorMappings).forEach(([hardcodedValue, tokenName]) => {
      if (fixedLine.includes(hardcodedValue)) {
        // Skip if this specific value is already inside a CSS custom property var()
        const varPattern = new RegExp(
          `var\\([^)]*\\b${hardcodedValue.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          )}\\b[^)]*\\)`,
          "g"
        );
        if (varPattern.test(fixedLine)) return;

        const replacement = `var(${tokenName})`;
        fixedLine = fixedLine.replace(
          new RegExp(
            hardcodedValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
          ),
          replacement
        );

        this.fixes.push({
          type: "color",
          layer,
          line: lineNumber,
          original: hardcodedValue,
          replacement,
          context: line.trim(),
        });
      }
    });

    return fixedLine;
  }

  /**
   * Fix hardcoded spacing
   */
  fixHardcodedSpacing(line, layer, lineNumber) {
    let fixedLine = line;
    if (line.includes("var(--")) return fixedLine;

    const spacingMappings = this.getSpacingMappings();
    const spacingProps = [
      "margin",
      "padding",
      "gap",
      "top",
      "right",
      "bottom",
      "left",
    ];
    const hasSpacingProp = spacingProps.some((prop) =>
      line.includes(`${prop}:`)
    );

    if (hasSpacingProp) {
      Object.entries(spacingMappings).forEach(([hardcodedValue, tokenName]) => {
        if (fixedLine.includes(hardcodedValue)) {
          const replacement = `var(${tokenName})`;
          fixedLine = fixedLine.replace(
            new RegExp(hardcodedValue, "g"),
            replacement
          );

          this.fixes.push({
            type: "spacing",
            layer,
            line: lineNumber,
            original: hardcodedValue,
            replacement,
            context: line.trim(),
          });
        }
      });
    }

    return fixedLine;
  }

  /**
   * Fix hardcoded typography
   */
  fixHardcodedTypography(line, layer, lineNumber) {
    let fixedLine = line;
    if (line.includes("var(--")) return fixedLine;

    const fontSizeMappings = this.getFontSizeMappings();
    const fontWeightMappings = this.getFontWeightMappings();

    if (line.includes("font-size:")) {
      Object.entries(fontSizeMappings).forEach(
        ([hardcodedValue, tokenName]) => {
          if (fixedLine.includes(hardcodedValue)) {
            const replacement = `var(${tokenName})`;
            fixedLine = fixedLine.replace(
              new RegExp(hardcodedValue, "g"),
              replacement
            );

            this.fixes.push({
              type: "typography",
              layer,
              line: lineNumber,
              original: hardcodedValue,
              replacement,
              context: line.trim(),
            });
          }
        }
      );
    }

    if (line.includes("font-weight:")) {
      Object.entries(fontWeightMappings).forEach(
        ([hardcodedValue, tokenName]) => {
          if (fixedLine.includes(hardcodedValue)) {
            const replacement = `var(${tokenName})`;
            fixedLine = fixedLine.replace(
              new RegExp(hardcodedValue, "g"),
              replacement
            );

            this.fixes.push({
              type: "typography",
              layer,
              line: lineNumber,
              original: hardcodedValue,
              replacement,
              context: line.trim(),
            });
          }
        }
      );
    }

    return fixedLine;
  }

  /**
   * Fix hardcoded border radius
   */
  fixHardcodedBorderRadius(line, layer, lineNumber) {
    let fixedLine = line;
    if (line.includes("var(--") || !line.includes("border-radius:"))
      return fixedLine;

    const radiusMappings = this.getRadiusMappings();

    Object.entries(radiusMappings).forEach(([hardcodedValue, tokenName]) => {
      if (fixedLine.includes(hardcodedValue)) {
        const replacement = `var(${tokenName})`;
        fixedLine = fixedLine.replace(
          new RegExp(hardcodedValue, "g"),
          replacement
        );

        this.fixes.push({
          type: "border-radius",
          layer,
          line: lineNumber,
          original: hardcodedValue,
          replacement,
          context: line.trim(),
        });
      }
    });

    return fixedLine;
  }

  /**
   * Token suggestion methods
   */
  findColorTokenSuggestion(hardcodedValue) {
    const mappings = this.getColorMappings();
    return mappings[hardcodedValue.toLowerCase()] || null;
  }

  findSpacingTokenSuggestion(hardcodedValue) {
    const mappings = this.getSpacingMappings();
    return mappings[hardcodedValue] || null;
  }

  findTypographyTokenSuggestion(hardcodedValue, property) {
    if (property === "font-size") {
      const mappings = this.getFontSizeMappings();
      return mappings[hardcodedValue] || null;
    }
    if (property === "font-weight") {
      const mappings = this.getFontWeightMappings();
      return mappings[hardcodedValue] || null;
    }
    return null;
  }

  findRadiusTokenSuggestion(hardcodedValue) {
    const mappings = this.getRadiusMappings();
    return mappings[hardcodedValue] || null;
  }

  /**
   * Token mapping configurations
   */
  getColorMappings() {
    return {
      // Basic colors
      "#ffffff": "--color-white",
      "#000000": "--color-black",

      // Gray scale
      "#f9fafb": "--color-gray-50",
      "#f8fafc": "--color-gray-50",
      "#f3f4f6": "--color-gray-100",
      "#e5e7eb": "--color-gray-200",
      "#d1d5db": "--color-gray-300",
      "#9ca3af": "--color-gray-400",
      "#6b7280": "--color-gray-500",
      "#4b5563": "--color-gray-600",
      "#374151": "--color-gray-700",
      "#1f2937": "--color-gray-800",
      "#111827": "--color-gray-900",

      // Primary colors (Blue)
      "#eff6ff": "--color-primary-50",
      "#dbeafe": "--color-primary-100",
      "#bfdbfe": "--color-primary-200",
      "#93c5fd": "--color-primary-300",
      "#60a5fa": "--color-primary-400",
      "#3b82f6": "--color-primary-500",
      "#2563eb": "--color-primary-600",
      "#1d4ed8": "--color-primary-700",
      "#1e40af": "--color-primary-800",
      "#1e3a8a": "--color-primary-900",

      // Additional grays (from CSS file)
      "#f1f5f9": "--color-gray-50",
      "#e2e8f0": "--color-gray-200",
      "#475569": "--color-gray-600",

      // RGBA values
      "rgba(0, 0, 0, 0.04)": "--color-gray-100",
      "rgba(0, 0, 0, 0.05)": "--color-gray-200",
      "rgba(0, 0, 0, 0.1)": "--color-gray-300",
      "rgba(0, 0, 0, 0.15)": "--color-gray-400",
      "rgba(59, 130, 246, 0.1)": "--color-primary-100",
      "rgba(59, 130, 246, 0.15)": "--color-primary-200",
      "rgba(59, 130, 246, 0.2)": "--color-primary-200",
    };
  }

  getSpacingMappings() {
    return {
      0: "--space-0",
      "0.25rem": "--space-1",
      "0.5rem": "--space-2",
      "0.75rem": "--space-3",
      "1rem": "--space-4",
      "1.25rem": "--space-5",
      "1.5rem": "--space-6",
      "2rem": "--space-8",
      "2.5rem": "--space-10",
      "3rem": "--space-12",
      "4rem": "--space-16",
    };
  }

  getFontSizeMappings() {
    return {
      "0.75rem": "--font-size-xs",
      "0.875rem": "--font-size-sm",
      "1rem": "--font-size-base",
      "1.125rem": "--font-size-lg",
      "1.25rem": "--font-size-xl",
      "1.5rem": "--font-size-2xl",
      "1.875rem": "--font-size-3xl",
    };
  }

  getFontWeightMappings() {
    return {
      400: "--font-weight-normal",
      500: "--font-weight-medium",
      600: "--font-weight-semibold",
      700: "--font-weight-bold",
    };
  }

  getRadiusMappings() {
    return {
      "0.125rem": "--radius-sm",
      "0.25rem": "--radius-base",
      "0.375rem": "--radius-md",
      "0.5rem": "--radius-lg",
      "0.75rem": "--radius-xl",
      "1rem": "--radius-2xl",
    };
  }

  /**
   * Generate lint report
   */
  generateLintReport(enhanced) {
    console.log("📋 LINTING REPORT");
    console.log("=================\n");

    console.log("📊 Summary:");
    console.log(`   Files analyzed: 1`);
    console.log(`   Layers analyzed: ${this.stats.layersAnalyzed}`);
    console.log(`   Design tokens found: ${this.stats.tokensFound}`);
    console.log(`   Violations found: ${this.stats.violationsFound}\n`);

    if (this.violations.length === 0) {
      console.log(
        "✅ No violations found! Your CSS follows design token best practices.\n"
      );
      return;
    }

    // Group violations by type and severity
    const violationsByType = this.violations.reduce((acc, violation) => {
      if (!acc[violation.type]) acc[violation.type] = [];
      acc[violation.type].push(violation);
      return acc;
    }, {});

    const errorCount = this.violations.filter(
      (v) => v.severity === "error"
    ).length;
    const warningCount = this.violations.filter(
      (v) => v.severity === "warning"
    ).length;

    console.log(`🚨 Errors: ${errorCount} | ⚠️ Warnings: ${warningCount}\n`);

    Object.entries(violationsByType).forEach(([type, violations]) => {
      const icon = violations.some((v) => v.severity === "error") ? "❌" : "⚠️";
      console.log(
        `${icon} ${type.toUpperCase().replace("-", " ")} (${
          violations.length
        } issues):`
      );
      console.log("─".repeat(50));

      violations.forEach((violation, index) => {
        const severityIcon = violation.severity === "error" ? "🚨" : "⚠️";
        console.log(
          `${index + 1}. ${severityIcon} Layer: ${violation.layer} | Line ${
            violation.line
          }`
        );
        console.log(`   Found: ${violation.value}`);
        if (violation.suggestion) {
          console.log(`   💡 Suggestion: Use var(${violation.suggestion})`);
          console.log(
            `   🔧 Replace: ${violation.context.replace(
              violation.value,
              `var(${violation.suggestion})`
            )}`
          );
        } else {
          console.log(`   💡 Consider using a design token for this value`);
        }
        console.log("");
      });
    });

    // Token usage summary
    const tokensByCategory = [...this.designTokens.values()].reduce(
      (acc, token) => {
        if (!acc[token.category]) acc[token.category] = [];
        acc[token.category].push(token);
        return acc;
      },
      {}
    );

    console.log("🎨 DESIGN TOKEN CATEGORIES:");
    console.log("===========================");
    Object.entries(tokensByCategory).forEach(([category, tokens]) => {
      console.log(`${category}: ${tokens.length} tokens`);
    });

    if (enhanced) {
      console.log("\n🛠️  RECOMMENDATIONS:");
      console.log("====================");
      console.log("1. Replace hardcoded colors with semantic color tokens");
      console.log("2. Use spacing tokens for consistent margins and padding");
      console.log("3. Apply typography tokens for font sizes and weights");
      console.log("4. Consider creating new tokens for repeated values");
      console.log("5. Add this linter to your CI/CD pipeline");
    }

    console.log(
      "\n💡 Run this linter regularly to maintain design system consistency!"
    );

    // Exit with error code if critical violations found
    if (errorCount > 0) {
      process.exit(1);
    }
  }

  /**
   * Generate fix report
   */
  generateFixReport(dryRun) {
    console.log("📋 AUTO-FIX REPORT");
    console.log("==================\n");

    console.log("📊 Summary:");
    console.log(`   Files processed: 1`);
    console.log(`   Design tokens found: ${this.stats.tokensFound}`);
    console.log(
      `   Fixes ${dryRun ? "identified" : "applied"}: ${
        this.stats.fixesApplied
      }\n`
    );

    if (this.fixes.length === 0) {
      console.log(
        "✅ No fixes needed! Your CSS already uses design tokens consistently.\n"
      );
      return;
    }

    // Group fixes by type
    const fixesByType = this.fixes.reduce((acc, fix) => {
      if (!acc[fix.type]) acc[fix.type] = [];
      acc[fix.type].push(fix);
      return acc;
    }, {});

    Object.entries(fixesByType).forEach(([type, fixes]) => {
      console.log(`🔧 ${type.toUpperCase()} FIXES (${fixes.length} changes):`);
      console.log("─".repeat(50));

      fixes.forEach((fix, index) => {
        console.log(`${index + 1}. Layer: ${fix.layer} | Line ${fix.line}`);
        console.log(`   ❌ Before: ${fix.original}`);
        console.log(`   ✅ After:  ${fix.replacement}`);
        console.log("");
      });
    });

    if (dryRun) {
      console.log("🔍 DRY RUN COMPLETE");
      console.log("===================");
      console.log("No changes were made to your files.");
      console.log("Run without --dry-run to apply these fixes.");
    } else {
      console.log("✅ FIXES APPLIED SUCCESSFULLY");
      console.log("=============================");
      console.log("Your CSS has been updated to use design tokens!");
      console.log("A backup was created before making changes.");
    }

    console.log("\n💡 Next steps:");
    console.log("- Review the changes to ensure they're correct");
    console.log("- Test your application to verify everything works");
    console.log("- Run the linter again to catch any remaining issues");
    console.log("- Consider adding the linter to your CI/CD pipeline");
  }
}

// CLI execution
if (require.main === module) {
  const tool = new CSSDesignTokenTool();
  const args = process.argv.slice(2);

  let cssFilePath = path.join(__dirname, "../../public/src/styles.css");
  let mode = "lint";
  let dryRun = false;
  let backup = true;
  let enhanced = true;

  // Parse command line arguments
  args.forEach((arg, index) => {
    if (arg === "--fix") {
      mode = "fix";
    } else if (arg === "--lint") {
      mode = "lint";
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--no-backup") {
      backup = false;
    } else if (arg === "--basic") {
      enhanced = false;
    } else if (arg === "--enhanced") {
      enhanced = true;
    } else if (!arg.startsWith("--")) {
      cssFilePath = arg;
    }
  });

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
CSS Design Token Tool

Usage: node css-tool.cjs [file] [options]

Arguments:
  file                  CSS file to analyze (default: ../../public/src/styles.css)

Modes:
  --lint               Analyze CSS for design token violations (default)
  --fix                Automatically fix hardcoded values

Options:
  --dry-run           Preview changes without modifying files (fix mode only)
  --no-backup         Skip creating backup files (fix mode only)
  --basic             Basic analysis (colors and spacing only)
  --enhanced          Enhanced analysis (all checks) (default)
  --help, -h          Show this help message

Examples:
  node css-tool.cjs                                    # Lint with enhanced analysis
  node css-tool.cjs --basic                            # Basic lint analysis
  node css-tool.cjs --fix --dry-run                    # Preview auto-fixes
  node css-tool.cjs --fix                              # Apply auto-fixes
  node css-tool.cjs custom.css --lint --basic          # Basic lint of custom file
`);
    process.exit(0);
  }

  tool.run(cssFilePath, { mode, dryRun, backup, enhanced }).catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = CSSDesignTokenTool;

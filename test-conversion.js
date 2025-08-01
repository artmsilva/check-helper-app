// Test the convertAmountToWords function with specific bug cases
import { convertAmountToWords } from "./src/utils/convertNumberToWords.js";

// Test cases focusing on the potential bug
const testCases = [
  // Basic cases
  { input: 0, expected: "zero and 00/100" },
  { input: 1, expected: "one and 00/100" },
  { input: 10, expected: "ten and 00/100" },

  // Hundreds (potential bug area)
  { input: 100, expected: "one hundred and 00/100" },
  { input: 200, expected: "two hundred and 00/100" },
  { input: 300, expected: "three hundred and 00/100" },

  // With decimals
  { input: 123.45, expected: "one hundred twenty-three and 45/100" },
  { input: 100.01, expected: "one hundred and 01/100" },

  // Larger numbers
  { input: 1000, expected: "one thousand and 00/100" },
  {
    input: 1234.56,
    expected: "one thousand two hundred thirty-four and 56/100",
  },

  // Edge cases
  { input: 0.05, expected: "zero and 05/100" },
  { input: 0.1, expected: "zero and 10/100" },
];

console.log("Testing convertAmountToWords function:");
let passed = 0;
let failed = 0;

testCases.forEach(({ input, expected }) => {
  const result = convertAmountToWords(input);
  const success = result === expected;

  console.log(`${success ? "✅" : "❌"} Input: ${input}`);
  console.log(`   Expected: "${expected}"`);
  console.log(`   Got:      "${result}"`);

  if (success) {
    passed++;
  } else {
    failed++;
    console.log(`   ^^ MISMATCH`);
  }
  console.log("");
});

console.log(`\nTest Results: ${passed} passed, ${failed} failed`);

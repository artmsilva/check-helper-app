// Ultra-minimal Check Helper - Reduced JavaScript

// Simplified amount to words conversion
function convertAmountToWords(value) {
  const num = parseFloat(value);
  if (!value || isNaN(num)) return "Amount in words";

  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function below1000(n) {
    let result = "";
    const h = Math.floor(n / 100);
    const r = n % 100;

    if (h > 0) result += units[h] + " hundred ";
    if (r >= 10 && r < 20) result += teens[r - 10];
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      if (t > 0) result += tens[t] + (o > 0 ? "-" + units[o] : "");
      else if (o > 0) result += units[o];
    }
    return result.trim();
  }

  const intPart = Math.floor(Math.abs(num));
  const cents = Math.round((Math.abs(num) - intPart) * 100);

  let words = intPart === 0 ? "zero" : "";
  if (intPart > 0) {
    const millions = Math.floor(intPart / 1000000);
    const thousands = Math.floor((intPart % 1000000) / 1000);
    const remainder = intPart % 1000;

    if (millions > 0) words += below1000(millions) + " million ";
    if (thousands > 0) words += below1000(thousands) + " thousand ";
    if (remainder > 0) words += below1000(remainder);
  }

  return `${words.trim()} and ${cents.toString().padStart(2, "0")}/100`;
}

// Simple event delegation
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      const text = e.target.textContent.trim();
      const placeholder = e.target.dataset.placeholder;

      // Handle empty field
      if (!text) {
        e.target.textContent = placeholder;
        e.target.classList.add("placeholder", "c-muted");
      } else {
        e.target.classList.remove("placeholder", "c-muted");
      }

      // Update amount words if this has amount in it
      if (text && (placeholder === "0.00" || !isNaN(parseFloat(text)))) {
        const wordsEl = document.querySelector(".words");
        const convertedWords = convertAmountToWords(text);
        wordsEl.textContent = convertedWords;
        wordsEl.classList.toggle(
          "c-muted",
          convertedWords === "Amount in words"
        );
      }
    }
  },
  true
);

// Handle focus events
document.addEventListener(
  "focus",
  (e) => {
    if (e.target.matches("[contenteditable]")) {
      const placeholder = e.target.dataset.placeholder;
      if (e.target.textContent === placeholder) {
        e.target.textContent = "";
        e.target.classList.remove("placeholder", "c-muted");
      }
    }
  },
  true
);

// Handle Enter key
document.addEventListener(
  "keydown",
  (e) => {
    if (e.target.matches("[contenteditable]") && e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  },
  true
);

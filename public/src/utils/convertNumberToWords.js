/**
 * Converts a number into its English words representation. This function
 * supports values up to the trillions, which is more than sufficient
 * for cheque amounts. The algorithm breaks the number into groups of
 * three digits (thousands, millions, etc.) and converts each group
 * individually before joining them with their scale names.
 *
 * For example: 1234 => "one thousand two hundred thirty-four".
 */
function convertWholeNumberToWords(num) {
  const units = [
    "zero",
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

  // Convert numbers less than 1000 to words
  function convertBelowThousand(n) {
    let str = "";
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    if (hundred > 0) {
      str += `${units[hundred]} hundred`;
      if (remainder > 0) str += " ";
    }
    if (remainder >= 10 && remainder < 20) {
      str += teens[remainder - 10];
    } else {
      const ten = Math.floor(remainder / 10);
      const unit = remainder % 10;
      if (ten > 0) {
        str += tens[ten];
        if (unit > 0) str += "-" + units[unit];
      } else if (unit > 0) {
        str += units[unit];
      }
    }
    return str.trim();
  }

  if (num === 0) return "zero";
  let result = "";
  const scales = ["", "thousand", "million", "billion", "trillion"];
  // Break the number into chunks of three digits
  let i = 0;
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      const words = convertBelowThousand(chunk);
      const scale = scales[i];
      result = `${words} ${scale}`.trim() + (result ? " " + result : "");
    }
    num = Math.floor(num / 1000);
    i++;
  }
  return result.trim();
}

/**
 * Converts a numeric string (e.g. "123.45") into cheque-writing words.
 * The returned string follows the pattern: "one hundred twenty-three and 45/100".
 * Handles negative values by prepending "minus".
 *
 * @param {string|number} value A numeric value or numeric string
 */
export function convertAmountToWords(value) {
  if (value === "" || value == null) return "";
  const number = parseFloat(value);
  if (isNaN(number)) return "";
  const isNegative = number < 0;
  const absNumber = Math.abs(number);
  const integerPart = Math.floor(absNumber);
  const decimalPart = Math.round((absNumber - integerPart) * 100);
  const integerWords = convertWholeNumberToWords(integerPart);
  const cents = decimalPart.toString().padStart(2, "0");
  let words = `${integerWords} and ${cents}/100`;
  if (isNegative) words = "minus " + words;
  return words;
}

export default convertAmountToWords;

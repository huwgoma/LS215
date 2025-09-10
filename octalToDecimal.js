// Write a function octalToDecimal that performs an octal to decimal conversion.
// - Input: A string representing an octal number
// - Output: A Number representing the decimal version of the given octal


// Octals:
// - The rightmost (smallest) digit is multiplied by 8 ^ 0 => 1
// - 2nd smallest => 8 ^ 1 => 8
// - and so on...
// - all values are summed at the end

function octalToDecimal(numberString) {
  const OCTAL_BASE = 8;

  return numberString.split('').reduce((octal, numStr, index) => {
    let power = numberString.length - 1 - index;
    let digit = Number(numStr);

    octal += digit * (OCTAL_BASE ** power);

    return octal;
  }, 0);
}

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'));          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9
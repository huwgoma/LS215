// Problem 2
// The Luhn formula is used to validate a variety of ID numbers, such as credit 
// card numbers and SIN numbers.
// - The formula verifies a number against a 'check digit', which is usually 
//   appended to a partial number to generate the full number. 
// - This number must pass the following test:
//   1) Starting from the rightmost digit and moving left, double the value of 
//      every 2nd digit
//   2) For any digit that becomes 10 or more when doubled, subtract 9 from the 
//      result.
//    eg. 1111: 1111 -> 1121 -> 1121 -> 2121
//    eg. 8763: 8763 -> 87(12)3; 8733 -> 8733 -> (16)733; 7733
//   3) Then add all the digits of this transformation together 
//    eg. 8763 -> 7733 -> 7 + 7 + 3 + 3 -> 20 <- CHECKSUM
//   4) If the checksum end in 0, then the number is valid; otherwise, it is not
//      valid.

// Write a program that takes a number in string format and checks if it is valid
// according to the Luhn formula.

// Input: A String representing a number to be verified (testNumber)
// - The String may contain other characters (non-digits; can be safely ignored)

// Rules:
// A given `testNumber` is considered valid if:
// - After being transformed (every other digit doubled and floored if necessary)
//   and having the digits summed, the resulting checksum is divisible by 10.

// Questions:
// - Can the input ever be a non-string? If so, how should that be handled?
// => No - always string
// - Can the input ever be missing? If so, how should that be handled?
// => No - Always given
// - Can the input ever be an empty string? 
// => Yes - Return false

// Data:
// A String as input
// - Clean the string to remove any non-digits
// Maybe convert to an array of characters after cleaning 
// => Map (transform) and reverse
// - Iterate over the string in reverse (from end to start)
// - For every second character, convert the character into a number, multiply it 
//   by 2, then overflow* if necessary
//   - If number is 10 or more, subtract 9 to get the final value for that digit
// => Array of transformed digits (every other digit doubled and maybe -9'd)
// - Sum the array of transformed digits
// Check if checksum is divisible by 10

// Algorithm:
// Given a string as input, testNumStr:
// * Return false if testNumber is empty
// 1) Clean testNumber to remove any non-digits
// 2) Convert the cleaned testNumber into an array of strings, with each string
//    representing a character.
// 3) Reverse the array of characters.
// 4) Map over the reversed array of characters; for each character:
//    - Convert the current character to a number (digit)
//    - If the current index is odd, multiply the current digit by 2
//      - If the multiplied digit is greater than 10, subtract 9 from the product
//    - Return digit
// => Array of numbers, with every other number multiplied by 2 and -9'd if it 
//    overflowed 10.
// 5) Sum the array of transformed numbers.
// 6) Check if the sum is evenly divisible by 10 

// Output: A Boolean? true if testNumber is valid according to the formula, and 
// false otherwise.

function passesLuhnFormula(testNumStr) { 
  let cleanedStr = testNumStr.replaceAll(/[^\d]/g, '');
  if (!cleanedStr) return false;

  let reversedDigits = cleanedStr.split('').map(Number).reverse();

  let transformedDigits = reversedDigits.map((digit, index) => {
    return (index % 2 === 1) ? overflowTen(digit * 2) : digit;
  });

  let checkSum = transformedDigits.reduce((sum, digit) => sum + digit, 0);

  return checkSum % 10 === 0;
}

function overflowTen(number) {
  return (number >= 10) ? (number - 9) : number
}

// Examples:
// Simple - Passes
console.log(passesLuhnFormula('8763') === true); // 8763 -> 7733 -> 20 
// Simple - Does not pass
console.log(passesLuhnFormula('1111') === false); // 1111 -> 2121 -> 6
// Non-numeric characters are ignored
console.log(passesLuhnFormula('a8b7c6d3e') === true); // 8763 -> 7733 -> 20 
console.log(passesLuhnFormula('a1b1c1d1e') === false); // 1111 -> 2121 -> 6
console.log(passesLuhnFormula(' 1 1 1 1 ') === false); // 1111 -> 2121 -> 6

// More complex, passes
console.log(passesLuhnFormula('2323 2005 7766 3554') === true);
// '4343 4005 5736 6514' => Sum(14 + 9 + 21 + 16) => 60

// More complex, fails
console.log(passesLuhnFormula('2323 2005 7766 3555') === false);
// '4343 4005 5736 6515' => Sum(14 + 9 + 21 + 17) => 61

// Empty String as Input, returns false
console.log(passesLuhnFormula('') === false); 
// Only non-numeric characters, returns false
console.log(passesLuhnFormula('---') === false);
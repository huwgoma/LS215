// Swap
// Write a function called `swap` that takes a string as an argument and returns
// a new string, where the alphabetic characters take the place of the numeric
// characters, and vice-versa.

// ===================== Questions ===================== 
// 1) What are the rules for swapping?
//  - Each number/letter in the string is swapped with the corresponding 
//    letter/number from later in the string
//  eg. Given the string "abc123":
//  > The first letter 'a' is swapped with the first number '1';
//  > The second letter 'b' is swapped with the second number '2'; etc.
//  => '123abc'

//  * If the number of letters and numbers in the string don't match up, the excess
//    numbers/letters are ignored and remain in place.
//  eg. "abcd123":
//  > The first letter 'a' <=> The first number 1
//  > ...
//  > The third letter 'c' <=> The third number 3
//  > We no longer have any numbers for the 4th letter 'd'; therefore, 'd' remains
//    in place (no further changes to the rest of the string)
//  => '123dabc'

// 2) Will the input ever be missing or anything other than a string?
// => No

// 3) Can the input string ever contain any non-alphanumeric characters? If so,
//    how should they be handled?
// => Yes - Add those characters to the new string as-is without swapping

// ===================== Data =====================
// Input: Given as a string
// First Impression:
// - Collect the numbers and letters into separate arrays
//   numbers = [1, 2, 3]; letters = [a, b, c, d]
// - Iterate over each character of the given string. For each character:
//   - If the current character is non-alphanumeric, add the current character
//     to the result string as-is.
//   - If the current character is a digit, remove the first character from letters
//     and add that letter to the result string.
//     ** If letters is empty (pre-removal), add current character instead
//   - If the current character is a letter, remove the first character from digits
//     and add that digit to the result string.
//     ** If digits is empty pre-removal, add current character instead
// => Return the result string

// ===================== Algorithm =====================
// Given a string as input, `string`:
// 1) Extract the numbers and letters into separate arrays
// 2) Iterate over string (Transform). For each character:
//    - If the current character is a digit and letters is not empty, remove and
//      return the first character from letters.
//    - If the current character is a letter and digits is not empty, remove and
//      return the first character from digits.
//    - Otherwise (current character is non-alphanumeric, or the opposite array
//      is empty), return the current character as-is.
// 3) => Array of transformed (swapped) characters.
// 4) Join transformed array back into a string and return string.

function swap(str) {
  let chars = str.split('');
  let numbers = chars.filter(isNumber);
  let letters = chars.filter(isLetter);

  return chars.map(char => {
    if (isNumber(char) && letters.length > 0) {
      return letters.shift();
    } else if (isLetter(char) && numbers.length > 0) {
      return numbers.shift();
    } else {
      return char;
    }
  }).join('');
}

function isNumber(char) {
  const NUMBER_PATTERN = /\d/;
  return NUMBER_PATTERN.test(char);
}

function isLetter(char) {
  const LETTER_PATTERN = /[A-Za-z]/;
  return LETTER_PATTERN.test(char);
}

// ===================== Test Cases ===================== 

// Simple Examples
// 2 Numbers, 2 Letters
console.log(swap("12ab") === "ab12");
// 1 Number, 2 Letters - If there are more numbers than letters or vice-versa,
// the excess numbers/letters remain in place 
console.log(swap("1ab") === "a1b");
// 2 Numbers, 1 Letter
console.log(swap("12b") === "b21");

// Given Examples
console.log(swap("1a2b3c") === "a1b2c3"); // true
console.log(swap("abcd123") === "123dabc"); // true (mismatch; d remains in place)

// Number/Letter Mismatch Edge Cases (?/0):
// 5 letters, 0 numbers:
console.log(swap("abcde") === "abcde");
// 5 numbers, 0 letters:
console.log(swap("12345") === "12345");

// Empty String Edge Case:
console.log(swap("") === "");

// Non-alphanumeric characters are added but not swapped
console.log(swap("abc!123") === "123!abc"); // true
console.log(swap("abc!d123") === "123!dabc"); // true
console.log(swap("!!abc123**") === "!!123abc**"); // true
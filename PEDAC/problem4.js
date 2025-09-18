// Problem 4 (Hard)
// You are given a list of numbers in a shorthand range where only the significant
// part of the next number is written, because the numbers are always increasing.
// eg. 1, 3, 7, 2, 4, 1 represents 1, 3, 7, 12, 14, 21

// Numbers may be abbreviated as ranges:
// 1-3, 1-2 => represents 1, 2, 3, 11, 12
// - Valid range separators are hyphen -, colon :, or two periods ..

// Input: A String
// - Represents a list of numbers
//  - Numbers can either be listed out (comma-separated)
//  - Or they can be condensed into a range (hyphen/colon/two period separated)
//  - Or both
// - Each number in the list must be greater than the preceding number.
// - Which allows each number to be abbreviated
//   eg. 1, 3, 7, 2 <- the number represented by 2 must be greater than the 
//                     preceding number (7); therefore, 2 represents 12.

// Questions/Rules:
// 1) For this problem, should we worry about invalid, missing, or empty inputs?
// => No (assume input is always valid)
// 2) Can we assume that abbreviated numbers always represent the next-closest
//    number to the preceding one?
//    eg. Given 1, 2, 3, 2, can we assume that the second 2 represents 12 and not
//        for example 22?
// 3) Should the return value be an array or a string, or something else?
// -> An array of complete numbers

// 1: Figure out expanding abbreviations
// - Numbers and ranges are separated by commas
// 2: Figure out expanding ranges
// - Range Start/End are marked by hyphens/periods/colons

// Data:
// (1) String containing a list of numbers (comma-separated) - "1, 3, 2"
// => Split string into an array of numbers - [1, 3, 2]

// Iterate through numbers. For each number:
//  Push a number to an expandedNumbers array []
// - If the current number is greater than the previous expanded Number, add 
//   current Number to expandedNumbers
// - Otherwise, expand the current number before adding it to expandedNumbers:
//   Test Cases:
//   [10] 10 => [10, 110] (Same Digits) -> Just add 1

//   [10] 9  => [10, 19]  (Fewer Digits)
//   [19] 8  => [19, 28]
//   - Extract the leading portion of prevFullNum
//     prevFullNumString.slice(0, prevFullNumDigits - currentNumDigits)
//   - Prepend the leading portion to currentNum
//   - Then subtract the new prependedCurrentNum - prevFullNum
//      19 - 10 => If difference is positive, push prependedCurrentNum to expandedNums
//      18 - 19 => If difference is negative, increment the leading portion by 1, 
//        then prepend the incremented header to currentNum and push that

// Output:
// - An array(?) of complete numbers
//   - Should contain all numbers, including those condensed by a range
//   - Contains full numbers (non-abbreviated)

// function expandShortHand(string) {
//   let shortNumbers = string.split(/, ?/).map(Number);

//   return shortNumbers.reduce((fullNumbers, number) => {
//     let prevFullNum = fullNumbers[fullNumbers.length - 1] || 0
    
//     if (number > prevFullNum) {
//       fullNumbers.push(number);
//     } else {
//       fullNumbers.push(expandNumber(number, prevFullNum));
//     }

//     return fullNumbers;
//   }, []);
// }

// function expandNumber(number, prevNum) {
//   let numString = String(number);
//   let prevNumString = String(prevNum);
//   let numHeader = '';

//   if (numString.length === prevNumString.length) {
//     numHeader = '1';
//   } else {
//     let numHeaderSize = prevNumString.length - numString.length;
//     numHeader = prevNumString.slice(0, numHeaderSize);

//     if (Number(numHeader + numString) <= prevNum) { 
//       numHeader = Number(numHeader) + 1
//     }
//   }

//   return Number(numHeader + numString);
// }

// Examples:
// // Simple Example
// console.log(expandShortHand("1, 3, 2")); // [1, 3, 12]
// console.log(expandShortHand("1, 3, 2, 10")); // [1, 3, 12, 110]
// // Same Numbers
// console.log(expandShortHand("11, 11, 11")); // [11, 111, 211]
// // Different Number of Digits
// console.log(expandShortHand("10, 10, 100")); // [10, 110, 1100]
// console.log(expandShortHand("100, 10, 1")); // [100, 110, 111]


// Part 2: Expanding Ranges
// - In addition to individual numbers, the input string may also contain ranges
//   of numbers.
// - Ranges are separated using hyphens (-), colons (:), or two periods (..)

// Input: String (represents a shorthand range)
// - Now can optionally include range specifiers (- : ..)

// Example: "1-3-1, 1-3, 5" => [1, 2, 3, 4, ..., 11, 21, 22, 23, 25]

// Data (Example: "1-3-1, 1-3, 5")

// Algorithm:
// 1) Split string on commas => Array of Ranges (and/or Numbers, but assume ranges)
//    eg. ["1-3-1", "1-3", "5"]
// 2) For each range, convert it into a comma-separated string
//    eg. "1-3-1" => "1, 3, 1"
// 3) Expand the comma-separated string into an array of expanded numbers
//    eg. "1, 3, 1" => [1, 3, 11]
// 4) Fill in the gaps in the range by creating a new array from start to end
//    eg. [1, 3, 11] => [1, 2, 3, 4, ..., 11]
// 5) Repeat the process for the next range
//    * Refactor expandShortHand to accept an optional base (starting value for
//      previousNumber)
//    eg. "1-3" => "1, 3" => Normally, this would expand to [1, 3]
//        But since this is the second range in the series, we want it to become
//        [21, 23] (since the last number was 11)
// Transforming the array of ranges ["1-3-1", "1-3", "5"] to an array of subarrays, 
// each subarray containing a full sequence of expanded numbers from that range.
// eg. [ [1, 2, 3, 4, ...11], [21, 22, 23], [25] ]
// - Flatten the array out into a 1-D array

function expandShortHand(string) {
  let ranges = string.split(/, ?/);

  return ranges.reduce((fullRanges, range) => {
    let base = fullRanges[fullRanges.length - 1] || 0;

    fullRanges.push(...expandRange(range, base));

    return fullRanges;
  }, []);
}

function expandRange(range, base) {
  const RANGE_SEPARATORS = /(-|:|\.\.)/g

  let expandedNumbers = expandNumberList(range.replaceAll(RANGE_SEPARATORS, ', '), base);
  let rangeStart = expandedNumbers[0];
  let rangeEnd = expandedNumbers[expandedNumbers.length - 1];

  let expandedRange = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    expandedRange.push(i);
  }
  
  return expandedRange;
}

function expandNumberList(numberList, base = 0) {
  // Assume input is a comma-separated string of numbers
  let shortNumbers = numberList.split(/, ?/).map(Number);

  return shortNumbers.reduce((fullNumbers, number) => {
    let prevFullNum = fullNumbers[fullNumbers.length - 1] || base
    
    if (number > prevFullNum) {
      fullNumbers.push(number);
    } else {
      fullNumbers.push(expandNumber(number, prevFullNum));
    }

    return fullNumbers;
  }, []);
}

function expandNumber(number, prevNum) {
  let numString = String(number);
  let prevNumString = String(prevNum);
  let numHeader = '';

  if (numString.length === prevNumString.length) {
    numHeader = '1';
  } else {
    let numHeaderSize = prevNumString.length - numString.length;
    numHeader = prevNumString.slice(0, numHeaderSize);

    if (Number(numHeader + numString) <= prevNum) { 
      numHeader = Number(numHeader) + 1
    }
  }

  return Number(numHeader + numString);
}

// Examples from Part 1
// Simple Example
console.log(expandShortHand("1, 3, 2")); // [1, 3, 12]
console.log(expandShortHand("1, 3, 2, 10")); // [1, 3, 12, 110]
// Same Numbers
console.log(expandShortHand("11, 11, 11")); // [11, 111, 211]
// Different Number of Digits
console.log(expandShortHand("10, 10, 100")); // [10, 110, 1100]
console.log(expandShortHand("100, 10, 1")); // [100, 110, 111]


// // Examples for Part 2
// // Simple Example, - separator
console.log(expandShortHand("1-3")); // [1, 2, 3]
// // Simple Example, : separator
console.log(expandShortHand("1:3")); // [1, 2, 3]
// // Simple Example, .. separator
console.log(expandShortHand("1..3")); // [1, 2, 3]

// Multiple Ranges, comma-separated:
console.log(expandShortHand("1-3, 5-7")); // [1, 2, 3, 5, 6, 7]
// // Multiple Ranges, comma-separated, with expansion:
console.log(expandShortHand("1-3, 1-3")); // [1, 2, 3, 11, 12, 13]

// // Multiple Ranges, chained:
console.log(expandShortHand("1-3-6")); // [1, 2, 3, 4, 5, 6]
// // Multiple Ranges, chained, with expansion:
console.log(expandShortHand("1-3-2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 12]
console.log(expandShortHand("1..3..2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 12]






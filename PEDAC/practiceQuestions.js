// Problem 1
// - A distinct string is a string that is present only once in an array
// Given an array of strings (arr) and an integer (k), return the kth distinct 
// string in array.
// - If there are fewer than k distinct strings, return an empty string instead.
// Note that the result string is the one encountered earliest in the array.

// Example
// distinctString(["d","b","c","b","c","a"], 2); // "a"
// > d and a are the only distinct strings in this array (since b and c occur
//   twice each), so the 2nd distinct string would be 'a'


// Questions:
// - What does it mean by "the result string is the one encountered earliest
//   in the array"?

// - What should happen if the given array is empty? 
//   eg. distinctString([], 2) - Since there are 0 distinct strings, and 0 < 2,
//       return an empty string (per requirements)
// - What should happen if the given array contains non-strings?
//   eg. distinctString([ 'a', 'b', 1, null, undefined, NaN, {}, [] ]) 
//   -> Ignore any non-string elements? or coerce to string?

// - What should happen if the array argument is not an array?

// - Case-insensitive? -> Probably not - compare by value

// - What should happen if the k integer is a non-positive integer?
//   eg. distinctString(['a', 'b'], 0 / -1)
//   - The 0th / -1st distinct String? -> undefined/null
//   > If k is not a positive integer, return undefined/null







// Problem 2 
// Given an array of integers (nums), return the 3rd largest number in the array.
// If the third largest number does not exist, return the greatest number.
// - Do not sort the array.

// thirdMax([1, 3, 2, 4]); // 2

// Questions:
// 1) What should happen if nums is omitted, or is not an array?
// -> Raise Error?
// eg. thirdMax(); // TypeError
//     thirdMax(123); // TypeError

// 2) What should happen if nums is empty?
// eg. thirdMax([]); //=> ? undefined ?
// -> If nums is empty, return undefined (?)

// 3) What should happen if nums contains fewer than 3 numbers?
// eg. thirdMax([1, 2]); //=> ? 2
// -> Return the greatest number (per reqs) => 2

// 4) What should happen if nums contains non-numbers or empty elements?
// eg. thirdMax([1, 2, 3, 'a', , ,'b']) //=> ? 1
// -> Ignore non-number/missing elements => 1

// 5) What should happen if nums contains one NaN?
// eg. thirdMax([1, 2, NaN]) //=> ? 2
// -> Probably ignore the NaNs and return 2 (largest number)

// 6) What should happen if nums contains only NaNs?
// eg. thirdMax([NaN, NaN, NaN]) //=> ? undefined
// -> Probably return undefined (since all NaNs are ignored)

// 7) "If the third largest number does not exist, return the greatest number."
// Does this rule apply to duplicates as well?
// eg. thirdMax([3, 3, 1]) - Should this return the largest number (3), or treat
//     the duplicate 3s as 2 separate values and return 1?
// -> Return largest number (treat duplicates as duplicates)






// Problem 3
// Write a function, `primeNumberPrinter`, that prints all prime numbers present
// in a given string.

// Example:
// primeNumberPrinter("a4bc2k13d"); // [2, 13]

// Questions:
// 1) What is the definition of a prime number?
// -> Any positive integer greater than 1 that is only evenly divisible by 
//    itself and 1.

// 2) "Prints" -> Should the function log these prime numbers to the console?
// -> Log to console as an array [2, 13]
// * Probably hold the primes in an array before logging

// 3) What should happen if the string contains no prime numbers?
// -> Does it log an empty array? []
// -> Does it log anything at all?

// 4) What should happen if the string argument is omitted?
// -> Probably log an empty array?

// 5) What should happen if the argument is not a string?
// eg. primeNumberPrinter(12345) primeNumberPrinter(['abcdefg', 'hijkl]) 
// -> If the argument is not a string, log an empty array.

// ******

// Should adjacent digits be treated as one value, or as multiple values?
// eg. "132" => Should this be treated as 132 only, or as
// 1, 13, 132, 3, 32, and 2?
// > If latter - Loop twice over number string (maintaining 2 indexes) and extract
//   substrings from each index towards the end of the string (i = 0, j = 0)

// What order should numbers be logged?
// - If numbers that are part of a larger number are to be treated separately, 
//   should '13' be printed before or after '132'?

// Can the string contain negative numbers?
// eg. 'a-4bc2k-13d'?





// Problem 4
// Write a function that takes a 2-D array as an argument and turns it into a 
// flat array with all duplicate elements removed.
// - Treat numbers and number strings (1 and '1') as duplicates
// - If an element is duplicated, keep the first one in the result.

// Questions:
// 1) Are there any restrictions on which built-in functions can or can't be used?
//    eg. flat()
// 
// 2) Can the array contain object values, or only primitive values?
//  - If it can contain objects, what constitutes a 'duplicate' object?
//  - Should objects be considered duplicate by value or by reference?
// eg. [ { a: 2 }, { a: 2 } ] - duplicate or no?

// 3) If the array contains other types of primitives, should they also be coerced
//    to strings when considering duplicity?
// eg. [ true, 'true' ] - duplicate or no?

// 4) What should happen if the argument is missing or not an array?
// eg. flattenAndUnique();        //=> ?
// eg. flattenAndUnique('hello'); //=> ?

// 5) Are NaN elements considered duplicate?
// eg. [ NaN, NaN ]
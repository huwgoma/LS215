// Watch others code - Problem 1

// Write a program that cleans up user-entered phone numbers.
// - Phone numbers can contain digits; in addition, they can also contain special
//   characters including spaces ' ', dashes '-', dots '.', and parentheses '()'
// - Special characters should be ignored.

// Rules:
// - If the phone number is less than 10 digits   => Invalid Number
// - If the phone number is 10 digits             => Valid number
// - If the phone number is 11 digits (leading 1) => Trim leading 1 and use
//                                                   the last 10 digits
// - If the phone number is 11 digits (not leading) => Invalid Number
// - If the phone number is more than 11 digits     => Invalid Number

// Questions: 
// 1) Will the phone number ever contain any characters other than the ones 
//    specified above?
// eg. Input: "905+470+4128"
// - If so, how should they be handled? Should the phone number be considered 
//   invalid, or should the non-standard characters be ignored?

// 2) Does the format of the phone number matter for this problem? 
// ie. If all characters are valid, but the format is invalid, should the phone
//     number be considered valid or not for this problem?
// eg. 90-5-470-41-28 //=> Valid? 
// -> For this problem, yes - this is considered valid.

// 3) Will the input ever be a non-string? If so, how should it be handled?
// -> Input will only ever be a string.

// 4) Should the output always be a string? 
// -> Yes (cleaned 10-digit number or 10 zeros)


// Input: 
// - A String (represents the user-entered phone number)

// Data:
// - Input -> String (may have other characters)

// Algorithm:
// 1) Sanitize the string (remove any non-digit characters)
//   - replace all non-digit (non 0-9) characters with ''
// 2) Check the length of the sanitized string.
//   - If length is 10, return the sanitized string (valid)
//   - If length is 11, and the first character is 1, return the sanitized
//     string (but trimmed; only characters 2-end)
//   - Otherwise, number is invalid => return 10 zeros


// Output: 
// - A new String (representing the sanitized phone number)
// - If the phone number is invalid, return 10 '0's ('0000000000')

function sanitizePhoneNumber(phoneString) {
  const BAD_NUMBER = '0000000000';

  let cleanedString = phoneString.replaceAll(/[^\d]/g, '');
  
  if (cleanedString.length === 10) {
    return cleanedString;
  } else if (cleanedString.length === 11 && cleanedString.startsWith('1')) {
    return cleanedString.slice(1);
  } else {
    return BAD_NUMBER;
  }
}


// Examples:
// Happy Path:
// - No separators
console.log(sanitizePhoneNumber('9054704128') === '9054704128');
// - Space-separated
console.log(sanitizePhoneNumber('905 470 4128') === '9054704128');
// - Hyphen-separated
console.log(sanitizePhoneNumber('905-470-4128') === '9054704128');
// - Dot-separated
console.log(sanitizePhoneNumber('905.470.4128') === '9054704128');
// - Parentheses
console.log(sanitizePhoneNumber('(905)4704128') === '9054704128');
// - Leading 1
console.log(sanitizePhoneNumber('19054704128') === '9054704128');

// Weird format but valid characters
console.log(sanitizePhoneNumber('90-54-70-41-28') === '9054704128');

// Invalid Inputs:
// - Less than 10 digits
console.log(sanitizePhoneNumber('905470412') === '0000000000');
// - Non-digits don't count
console.log(sanitizePhoneNumber('abcdefhijk') === '0000000000');
// - 11 digits (non-leading 1)
console.log(sanitizePhoneNumber('90547041281') === '0000000000');
// - More than 11 digits (12)
console.log(sanitizePhoneNumber('190547041280') === '0000000000');
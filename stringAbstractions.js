// Practice Problems (Strings)
// 1) Create a variable (firstName) and set it equal to your first name; set another
//    variable (lastName) to your last name, then join the two variables with a space
//    and store the result in a third variable, fullName.
let firstName = 'Hugo';
let lastName = 'Ma';

let fullName = `${firstName} ${lastName}`;
console.log(fullName); //=> Hugo Ma


// 2) Call concat on firstName with lastName as an argument and log the return value.
console.log(firstName.concat(lastName)); //=> HugoMa


// 3) Split the fullName string into an array that contains the first and last names
//    as separate strings. Log the value of the array.
console.log(fullName.split(' ')); //=> [ 'Hugo', 'Ma' ]


// 4) Create a language variable with the value 'JavaScript'. Find the index of the
//    first 'S' and save it to an idx variable.
let language = 'JavaScript';
let idx = language.indexOf('S');
console.log(idx); //=> 4


// 5) Call charCodeAt on language, passing in idx as an argument. Save the return value
//    to a variable, charCode.
let charCode = language.charCodeAt(idx);
console.log(charCode); // 83


// 6) Log the return value of String.fromCharCode when given charCode as an argument.
console.log(String.fromCharCode(charCode)); // S


// 7) Find the index of the last occurrence of 'a' in language.
console.log(language.lastIndexOf('a')); // 3


// 8) Create two variables, a = 'a' and b = 'b'. Log a "greater than" comparison
//    between the two variables. Reassign the value 'B' to variable b, then compare 
//    the two variables again, and log the comparison value.
let a = 'a';
let b = 'b';
console.log(a > b); //=> false

b = 'B';
console.log(a > b); //=> true


// 9) Call the slice() method on language with 1 and 4, then 2 and 4.
console.log(language.slice(1, 4)); //=> 'ava'
console.log(language.slice(2, 4)); //=> 'va'


// 10) Repeat 9), but using substring instead of slice. Do the results differ?
console.log(language.substring(1, 4)); //=> 'ava'
console.log(language.substring(2, 4)); //=> 'va'
// - The results should not differ - substring is functionally identical to slice 
//   when the arguments are a) in order (smaller, larger), and b) not negative.


// 11) Call language.slice with 1 and -1, then 2 and -1.
console.log(language.slice(1, -1)); //=> 'avaScrip'
console.log(language.slice(2, -1)); //=> 'vaScrip'
// - Slice treats negative numbers as counting backwards from the end of the string.
//   Therefore an index of -1 is equivalent to an index of String.length - 1


// 12) Repeat 11), but with substring. Do the results differ?
console.log(language.substring(1, -1)); //=> 'J'
console.log(language.substring(2, -1)); //=> 'Ja'
// - Substring differs from slice in 2 main aspects: negative numbers are treated as
//   0, and arguments are automatically sorted based on size. Therefore, for the set
//   of arguments 1 and -1, -1 is coerced to 0, and the resulting arguments 1, 0 are 
//   sorted such that startIndex is the smaller value (0) and endIndex is the larger
//   value (1).


// 13) Create 2 variables (fact1 and fact2) and set them equal to 'JavaScript is fun'
//     and 'Kids like it too'. Combine the two strings with ' and ', and store the 
//     result in a new variable (compoundSentence). 
//     - Make sure the first letter of fact2 is lowercased in compoundSentence.
let fact1 = 'JavaScript is fun';
let fact2 = 'Kids like it too';

let compoundSentence = `${fact1} and ${fact2[0].toLowerCase() + fact2.slice(1)}`;
console.log(compoundSentence);


// 14) Log the first letters of fact1 and fact2.
console.log(fact1[0]);
console.log(fact2[0]);


// 15) Create a variable named pi and set it to the result of 22/7. Convert pi to a
//     String using the toString method. Search the resulting string for the last 
//     occurrence of '14' and log the index.
let pi = 22 / 7;
let piString = pi.toString();
console.log(piString.lastIndexOf('14')); // 14


// 16) Create a boxNumber variable and set it to the result of 356.toString().

let boxNumber;
// boxNumber = 356.toString(); // Invalid or unexpected token

// (The . is interpreted as a decimal point, not a method invocator)
// - This can be avoided by using two dots, or by wrapping the number in parentheses.

boxNumber = 356..toString();
console.log(boxNumber);

boxNumber = (356).toString();
console.log(boxNumber);


// 17) Convert the boxNumber variable back to a number using parseInt. Log the typeof
//     boxNumber to verify the result. Then convert the number back to a String and
//     log its type.
boxNumber = parseInt(boxNumber, 10);
console.log(typeof boxNumber); //=> number

boxNumber = boxNumber.toString(); 
console.log(typeof boxNumber); //=> string


// 18) Write a program that asks for a user's name, then greets the user with their
//     name. If the user appends a ! to their name, the resulting greeting should 
//     be in all uppercase.
const rlSync = require('readline-sync');

let name = rlSync.question('What is your name? ');

if (name.endsWith('!')) {
  name = name.slice(0, -1);
  console.log(`HELLO, ${name.toUpperCase()}.`);
} else { 
  console.log(`Hello, ${name}.`)
}


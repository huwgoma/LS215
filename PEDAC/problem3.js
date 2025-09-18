// Problem 3
// A collection of spelling blocks has two letters per block:
// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M

// - The words that can be spelled using this paradigm are limited to one
//   letter per block, and one usage per block.

// Write a function that takes a string as an argument and returns true if the
// word can be spelled using the paradigm specified by LETTER_BLOCKS, false
// otherwise.
// - LETTER_BLOCKS are case-insensitive.

// Input: 
// - A String that represents a word
// Output: 
// - A Boolean (true if the given word can be spelled from letter blocks,
//   false otherwise)

// Rules:
// - The given word must only contain (at most) one letter from each letter block
//   - ie. If one letter from a block is used, that block cannot be used again
//     - Neither the same letter nor its counterpart can be used again.

// Clarify:
// - What should happen if:
//   - The input is missing? => undefined
//   - The input is empty '' => undefined
//   - The input is non-string => undefined
// - What should happen if the input is a string, but contains non-letter characters?
//   eg. 'BATCH++' 
//   => Probably ignore non-alphabetic characters


// Data:
// How to represent letter blocks?
// - Maybe as an object? { X: 'K', K: 'X' }
//  - Cons: Duplication for bidirectional access (ie. X and K appear twice, once
//    as key once as value)
// Input Data - Represented as a string

// Algorithm:
// 1) clean the string (removing all non-alphabetic characters and upcasing it)
// 2) Initialize a letterBlocksUsed object {} to track which letter blocks have 
//    already been used.
// 3) Iterate over string. For each character:
//    - Check if letterBlocksUsed[character] is true. If yes, return false
//    Otherwise:
//    - Register the current character and its counterpart to letterBlocksUsed
//    - Look up the current character in LETTER_BLOCKS => counterpart
//      - then add current character and counterpart to letterBlocksUsed
// 4) If end of iteration is reached, return true.

const LETTER_BLOCKS = {
  B: 'O', O: 'B',   X: 'K', K: 'X',   D: 'Q', Q: 'D',   C: 'P', P: 'C',
  N: 'A', A: 'N',   G: 'T', T: 'G',   R: 'E', E: 'R',   F: 'S', S: 'F',
  J: 'W', W: 'J',   H: 'U', U: 'H',   V: 'I', I: 'V',   L: 'Y', Y: 'L',
  Z: 'M', M: 'Z',
}

function isBlockWord(string) {
  if (!string || typeof string !== 'string') return undefined;

  let cleanedString = string.toUpperCase().replaceAll(/[^A-Z]/g, '');

  let blocksUsed = {};
  return cleanedString.split('').every(char => {
    if (blocksUsed[char]) return false;

    let blockPartner = LETTER_BLOCKS[char];
    blocksUsed[char] = true;
    blocksUsed[blockPartner] = true;

    return true;
  });
}


// Examples:
// Happy Path:
console.log(isBlockWord('BATCH') === true);
console.log(isBlockWord('BUTCH') === false); // U and H are reused
console.log(isBlockWord('BALL') === false); // L is reused
// Case-insensitive:
console.log(isBlockWord('jEsT') === true);  
console.log(isBlockWord('bAlL') === false); // l and L are considered the same
console.log(isBlockWord('bUtCh') === false); // U and h are reused 

// Weird input but valid:
// - Non-alphabetic characters are ignored
console.log(isBlockWord('B+A+T+C+H') === true); // underlying word BATCH is true
console.log(isBlockWord('B+U+T+C+H') === false); // underlying word BUTCH is false

// Bad Inputs:
// - Empty String
console.log(isBlockWord('') === undefined);
// - Missing
console.log(isBlockWord() === undefined);
// - Non-String
console.log(isBlockWord(123) === undefined);

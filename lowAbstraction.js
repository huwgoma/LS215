// Implement a function that determines whether a string has any character appearing
// more than once, returning true if all characters are unique. 
// - Ignore case differences and whitespace characters


function isAllUnique(string) {
  string = string.replaceAll(/\s/g, '').toLowerCase();

  let charactersSeen = {};

  for (let i = 0; i < string.length; i++) {
    let currentChar = string[i];

    if (charactersSeen[currentChar]) return false;

    charactersSeen[currentChar] = true;
  }

  return true;
}

console.log(isAllUnique('The quick brown fox jumped over a lazy dog'));  // false
console.log(isAllUnique('123,456,789'));                                 // false
console.log(isAllUnique('The big apple'));                               // false
console.log(isAllUnique('The big apPlE'));                               // false
console.log(isAllUnique('!@#$%^&*()'));                                  // true
console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz'));                  // true
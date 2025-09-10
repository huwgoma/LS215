// Implement a function that takes a string as an argument and returns a new string,
// containing the original string in reverse.

// WITH Array#reverse:
function reverse(string) {
  return string.split('').reverse().join('');
}

// Without Array#reverse:
function reverse(string) {
  let result = '';

  for (let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }

  return result;
}

console.log(reverse('hello'));                  // returns "olleh"
console.log(reverse('The quick brown fox'));    // returns "xof nworb kciuq ehT"
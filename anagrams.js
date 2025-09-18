// Write a function named anagram that takes two arguments - a word and an array of 
// words. 
// - Output: An array that contains all words from the array of words that are 
//   anagrams of the given word.



function anagram(word, list) {
  let sortedWord = sortWord(word);
  return list.filter(currentWord => sortWord(currentWord) === sortedWord);
}

function sortWord(word) {
  return word.split('').sort().join('');
}

// Example:
console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  
// [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   
// [ "enlist", "inlets" ]
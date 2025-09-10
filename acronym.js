// Acronym
// Write a function that generates and returns an acronym from a string of words.
// - For example, 'Portable Network Graphics' should return 'PNG'.
// - Consider all space- or hyphen- separated sequences as individual words.

function acronym(string) {
  // Split on spaces or hyphens
  let words = string.split(/[- ]/);

  return words.map(word => word[0].toUpperCase()).join('');
}

console.log(acronym('Portable Network Graphics'));                  // "PNG"
console.log(acronym('First In, First Out'));                        // "FIFO"
console.log(acronym('PHP: HyperText Preprocessor'));                // "PHP"
console.log(acronym('Complementary metal-oxide semiconductor'));    // "CMOS"
console.log(acronym('Hyper-text Markup Language'));                 // "HTML"
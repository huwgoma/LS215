// Implement a function that checks whether an email address is valid. 
// A valid email address has 2 parts: local and domain parts, separated by @.
// eg. local-part@domain-part.com

// Rules: 
// - Must have one (and only one) @
// - Local part must contain 1 or more letters and/or digits, and cannot contain
//   any other characters.
// - The domain part must contain 2 or more components with a single dot (.) between
//   each component. Each component must consist of one or more letters, and no other
//   characters.

function isValidEmail(email) {
  if (!exactlyOneAtSign(email)) return false;

  let [ local, domain ] = email.split('@');

  return localPartIsValid(local) && domainPartIsValid(domain);
}

function exactlyOneAtSign(email) {
  return email.match(/@/g)?.length === 1;
}

function localPartIsValid(part) {
  // Consists solely of alphanumeric characters
  return isOnlyAlphaNumeric(part);
}

function domainPartIsValid(part) {
  // Has at least 2 period-separated components
  let components = part.split('.');
  if (components.length < 2) return false;

  // Each component consists solely of alphabetic characters
  return components.every(component => isOnlyAlphabetic(component));
}

function isOnlyAlphabetic(string) {
  return /^[a-zA-Z]+$/.test(string);
}

function isOnlyAlphaNumeric(string) {
  return /^[a-zA-Z0-9]+$/.test(string);
}

console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
console.log(isValidEmail('foo@baz.com'));             // returns true
console.log(isValidEmail('foo123@baz.com'));          // returns true
console.log(isValidEmail('foo@baz.ph'));              // returns true
console.log(isValidEmail('foo@baz@bar.ph'));          // returns false
console.log(isValidEmail('HELLO123@baz'));            // returns false
console.log(isValidEmail('foo.bar@baz.to'));          // returns false
console.log(isValidEmail('foo@baz.'));                // returns false
console.log(isValidEmail('foo_bat@baz'));             // returns false
console.log(isValidEmail('foo@bar.a12'));             // returns false
console.log(isValidEmail('foo_bar@baz.com'));         // returns false
console.log(isValidEmail('foo@bar.....com'));         // returns false
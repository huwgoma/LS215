// Comparing Version Numbers
// - Write a function that takes any two version numbers in the format 
// 1
// 1.0
// 1.2
// 3.2.3
// 3.0.0
// 4.2.3.0
// - And compares them, with the result of the comparison representing whether the
//   first version number is less than/equal to/greater than the second number.
// - Return 1 if version1 > version2; 0 if version1 === version2; 
//   -1 if version1 < version2.
// - If either version number is invalid (ie. contains any character that is
//   not a digit (0-9) or period (.), return null)

// Rules:
// - Input: 2 Strings (?), each representing a version number.
//   - Version numbers must consist of dot-separated numbers (eg. 3.0.0)
//   - A version number is considered invalid if:
//     - The string as a whole contains any non-digit or non-period character
//     - Components are improperly dot-separated
//       - .3.0 is invalid; 3..0 is invalid; 3.0. is invalid
//       - All dots must be between digits (ie. follow and be followed by
//          a digit)
// - Output: Number (1, -1, or 0)
//   - Based on the result of comparing version1 and version2 strings
//   Rules for comparison?
//   - Compare version numbers component-by-component, from left to right.
//   eg. 1.2 and 1.18.2
//   1) Compare 1 and 1 -> equal
//   2) Compare 2 and 18 -> 2 is less than 18 -> Return -1 
//   (short-circuit as soon as a non-0 match is found)
//   3) if all components are equal, then return 0
//   - If a component is missing from one version number, default it to 0
//   eg. 1, 1.0 - 1 == 1, missing (0) == 0

// Data:
// Version1 and Version2 
// - Should be strings - because multiple dots aren't supported by numbers 
//   eg. 3.0.0 can't be represented as a number
// - But we do want to compare each sub-component as a number.
// First validate the string as a whole - verify that the entire string:
// 1) Starts with at least one digit
// 2) Optionally, the first digits component is followed by a period and another
//    digits component
// - Part 2 can repeat 0+ times 
// eg. 10.11.12
// (10)(.11)?(.12)?
// => /^\d+(.\d+)*$/

// if either version string is invalid, return null right away

// Assuming both version strings are valid:
// - Split each version into an array of numbers 
//   (eg. 10.11.12 => [10, 11, 12]; 10.11 => [10, 11])
// - Iterate over the longer array and compare component-by-component
//   eg. compare 10/10, then 11/11, then 12/0 (0 because v2 is missing 3rd component)
//   - If for any component the component in the other array is missing, substitute
//     the missing component with 0
// If sub-comparison returns 0, continue iteration (ie. continue iterating while
//  components are equal)
// - Otherwise, return the result of comparison

// Algorithm:
// Given two strings as input, version1 and version2:
// 1) Validate both strings to ensure they are properly-formatted.
//   - Starts with at least one digit
//   - Optionally followed by (a period + another string of digits) <- repeated 0+
//     times
// 2) If either version string is invalid, return null.
// 3) If both version strings are valid, create an array from each version string,
//    containing the component numbers from each version.
// 4) Iterate through the longer version array. For each versionComponent:
//    - Retrieve the corresponding version Component from the other version array
//      - If undefined, coerce to 0
//    - Compare the current version component to the other version component
//  Compare?
//  - Subtract version1 - version2 (numerically)
//    - If version1 - version2 === 0, continue iteration
//    - Otherwise, return 1 if difference is positive; -1 if difference is negative
//     > If version1 > version2, this returns 1
//     > If version1 < version2, this returns -1
// - If we make it through to end of iteration, then return 0
//   (All components were equal)

function compareVersions(leftVersion, rightVersion) {
  // If either version string is invalid
  if (!validVersionString(leftVersion) || !validVersionString(rightVersion)) {
    return null;
  }

  leftVersion = leftVersion.split('.').map(Number);
  rightVersion = rightVersion.split('.').map(Number);

  let longerLength = Math.max(leftVersion.length, rightVersion.length);

  for (let i = 0; i < longerLength; i++) {
    let leftComponent = leftVersion[i] || 0;
    let rightComponent = rightVersion[i] || 0;
    let difference = leftComponent - rightComponent;

    if (difference === 0) continue;
    return difference / Math.abs(difference);
  }
  
  return 0;
}

function validVersionString(versionString) {
  return /^\d+(\.\d+)*$/.test(versionString); 
}

// Example - 0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

// Good Inputs:
//  Version1 < Version2 => -1
console.log(compareVersions('0.1', '1') === -1);         
console.log(compareVersions('1.0', '1.1') === -1);       
console.log(compareVersions('1.1', '1.2') === -1);       
console.log(compareVersions('1.2.0.0', '1.18.2') === -1);
console.log(compareVersions('1.18.2', '13.37') === -1); 
console.log(compareVersions('1.2.1', '1.2.2') === -1) 

// // Version1 === Version2 => 0
console.log(compareVersions('1', '1.0') === 0);
console.log(compareVersions('1.2', '1.2.0.0') === 0);

// // Version1 > Version2 => 1
console.log(compareVersions('1', '0.1') === 1);          
console.log(compareVersions('1.1', '1.0') === 1);        
console.log(compareVersions('1.2', '1.1') === 1);        
console.log(compareVersions('1.18.2', '1.2.0.0') === 1); 
console.log(compareVersions('13.37', '1.18.2') === 1);   

// Bad Inputs:
// - Version numbers containing non-digits:
console.log(compareVersions('1.1.x', '1.1.0') === null);
console.log(compareVersions('1.1.0', '1.1.x') === null);
// - Version numbers containing non-dots:
console.log(compareVersions('1.1,0', '1.1.0') === null);
console.log(compareVersions('1.1.0', '1.1,0') === null);
// - Version numbers containing digits and dots, but improperly separated:
console.log(compareVersions('.1.1.0', '1.1.0') === null);
console.log(compareVersions('1.1.0', '.1.1.0') === null);

console.log(compareVersions('1.1.0.', '1.1.0') === null);
console.log(compareVersions('1.1.0', '1.1.0.') === null);

console.log(compareVersions('1.1..0', '1.1.0.') === null);
console.log(compareVersions('1.1.0', '1.1..0.') === null);
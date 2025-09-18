// Problem 5: Rail Cipher
// - Implement encoding and decoding for the rail fence cipher
// What is the rail fence cipher?
// - The message is written top-to-bottom on successive 'rails' of an imaginary fence
//   (left-to-right), moving upwards and right when the bottom of one rail is reached.
//   - Top-to-bottom, bottom-to-top (you 'bounce' instead of resetting to the top)
//   - The message is then read off in rows, left-to-right and top-to-bottom.

// Example:
// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .

// (3x25)
// - Number of rails (number of rows) is given as argument
// - Width of rails (number of columns) = number of characters in message (without
//   spaces)
//   - Each column can only have one character

// "WE ARE DISCOVERED FLEE AT ONCE"
// Read as: "WECRLTEERDSOEEFEAOCAIVDEN"

// To decrypt an encoded message: "WECRLTEERDSOEEFEAOCAIVDEN"
// - 


// 2 Problems: Encode and Decode

// ===================== Encode ============================
// Input: 
// - A String (representing a normal human-readable message)
// - A Number (representing the number of rails -> number of rows)
// Assume input is always present and valid

// Rules:
// - Standardize case when encoding (eg. 'Hello' => 'HELLO')
// - Only take alphanumeric characters into account
// When encoding the message:
// - Start at the top-left corner
// - Each column can only have one character
// - Progressively move right and down until the bottom row is reached
//   - And then you progressively move right and up until the top row is reached
//   - Repeat

// Data: 
// How to represent rails?
// - Maybe: A nested array of subarrays?
//   > Where the number of subarrays represents the number of rows,
//   > and the length of each subarray represents the number of columns
// - Why? => We will need to iterate across each character of the string and 'place'
//   them on the fence (insert elements into subarrays)
//   => Then at the end we'll need to join the strings of each subarray back into
//      one string, but in top-down subarray order

// eg. 'hello world' (10)
// [ 
//   [ , , , , , , , , , ,],
//   [ , , , , , , , , , ,],
//   [ , , , , , , , , , ,]
// ]

// Iterate across each character of message. For each character:
// - Keep track of where the current character should be placed.
// * We will always be moving right
// * Up or down can vary (starting with down)
// * Starting point will always be 0, 0 (top left)
// 1) Place current character onto the fence at insertion point (0, 0)
// - If yCoordinate is 0 (min), set yDirection to 1 (DOWN)
// - If yCoordinate is __ (max), set yDirection to -1 (UP)
// 2) Calculate the next insertion point (xCoordinate + 1, yCoordinate + yDirection)
// eg. (0, 0); yDirection = 1; next insertion point is (1, 1)
// eg. (1, 1); yDirection = 1; next insertion point is (2, 2)
// eg. (2, 2); yDirection = -1; next insertion point is (3, 1)

// 3) After finishing iteration over string, we should have an array of subarrays,
//    where each subarray contains a 'row' of the message's characters.
// - Read the fence row-by-row (left-to-right, top-to-bottom)
// => Join all subarrays together into a string and return the string

// Output: A String (represents the encrypted message)

// Algorithm:
// 1) Create the Rail Fence data structure 
// - An Array of subarrays, where:
//   - There are n subarrays, corresponding to the given argument numberofRails
//   - Each subarray has n elements, where n is the number of *alphanumeric* 
//     characters in the given message
// - Clean the string (remove all non-alphanumerics)
// - Length of cleaned string = length of each subarray
// - numberofRails = number of subarrays
// HELPER createFence(numberOfRails, railWidth) => [ [ ] ...]


// initialize a new variable:
// > x, y = [ 0, 0 ] ? (x is horizontal (column), y is vertical (row))

// 2) Iterate across each character of the given message. For each character:
//  3) Place the current character onto the fence at a specified insertion point
//     (ie. Push the current character into the correct subarray, at the correct
//      subarray index)
//     ** fence[y][x] = character
//  4) Re-calculate the insertion point for the next character
//     ** If y === 0 then set yDirection to 1 (going down)
//     ** If y === numberOfRails then set yDirection to -1 (going up)
//     ** Recalculate x and y as x + 1 and y + yDirection

//  5) Repeat until end of string
// 6) Flatten the array of subarrays, then join into a string.


function encodeRailCipher(message, numberOfRails) {
  let cleanedMessage = message.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');

  let fence = createFence(numberOfRails, cleanedMessage.length)
  fence = writeToFence(cleanedMessage, fence);

  return fence.flat().join('');
}

function createFence(numberOfRails, railWidth) {
  let fence = [];

  for (let i = 0; i < numberOfRails; i++) {
    fence.push(Array(railWidth));
  }

  return fence;
}

function writeToFence(message, fence) {
  let fenceCopy = fence.slice();
  let [ xCoord, yCoord ] = [ 0 , 0 ];
  let yDirection = 1;

  message.split('').forEach(char => {
    fenceCopy[yCoord][xCoord] = char;
  
    xCoord += 1;
    yDirection = calculateDirection(yCoord, 0, fence.length - 1, yDirection);
    yCoord = yCoord + yDirection;
  });

  return fenceCopy;
}

function calculateDirection(coordinate, minCoord, maxCoord, currentDirection) {
  if (minCoord === maxCoord) return 0;

  switch (coordinate) {
    case minCoord:
      return 1;  // Going Down
    case maxCoord:
      return -1; // Going Up
    default:
      return currentDirection;
  }
}
// Examples:
// "Hello", 1 rail
console.log(encodeRailCipher('Hello', 1) === 'HELLO');
// "Hello", 2 rails
console.log(encodeRailCipher('Hello', 2) === 'HLOEL');
// "Hello World", 3 rails
console.log(encodeRailCipher('hello world', 3) === 'HOLELWRDLO');
// 'WE ARE DISCOVERED FLEE AT ONCE', 3 rails
console.log(encodeRailCipher('WE ARE DISCOVERED FLEE AT ONCE', 3) === 'WECRLTEERDSOEEFEAOCAIVDEN');

// Non-alphanumeric characters are ignored
console.log(encodeRailCipher('Hello 123!', 3) === 'HOEL13L2');
// More rails than letters
console.log(encodeRailCipher('Hi', 3) === 'HI');


// ===========================================================================
// Part 2: Decoding
// Input: String (represents an encoded message)
// - Number (represents the number of rails)

// Rules for Decoding:
// - Given an encoded message, 'HOLELWRDLO', and a number representing
//   the number of rails (3):
// - We can again build the fence:
// [ 
//   [ , , , , , , , , , ,],
//   [ , , , , , , , , , ,],
//   [ , , , , , , , , , ,]
// ]

// - Mark the spots to fill:
// [ 
//   [?, , , ,?, , , ,?, ,],
//   [ ,?, ,?, ,?, ,?, ,?,],
//   [ , ,?, , , ,?, , , ,]
// ]

// - Iterate over the encoded message. For each character:
//  - Place the current character into the fence (at index of the next '?')
//  - If the current row does not have any '?'s remaining, move to the next row
// [ 
//   ['H', , , ,'O', , , ,'L', ,],
//   [ ,'E', ,'L', ,'W', ,'R', ,'D',],
//   [ , ,'L', , , ,'O', , , ,]
// ]

// - Read the fence in zig-zag pattern
// Starting from [0, 0]
// - Increment x by 1
// - Increment y by yDirection (either 1 or -1)
// - Extract each character to a string
// => Return string

// Algorithm:
// Given an encrypted String as input, encodedMessage, and a Number (numberOfRails):
// 1) Build a fence (based on the number of rails (rows) and number of characters
//    in encodedMessage (columns))
// 2) Mark the locations in the fence where characters should be placed
// 3) Iterate over encodedMessage. For each character:
//    - Place the current character into the fence:
//      - Which row/subarray? => Start from 0 and increment whenever a row gets
//        filled.
//      - Where in the current row should a character go? => Find the index of the
//        placeholder ('?') character (marked in step 2)
//    ** row[indexOf(?)] = char
//    - If row no longer contains ?, increment row by 1
//      > If !(row.includes(?)) row += 1
// 4) Read the Fence
//    - Start from 0, 0
//    - Extract the current character to a string
//    - Increment x by 1
//    - Increment y by 1 or -1 (up/down)
//    - Repeat
// 5) Return the extracted string

// Output: String (represents the decoded, original message)


function decodeRailCipher(encodedMessage, numberOfRails) {
  const PLACEHOLDER = '?';
  let fence = createFence(numberOfRails, encodedMessage.length);
  let placeholderString = PLACEHOLDER.repeat(encodedMessage.length);

  fence = writeToFence(placeholderString, fence);

  let row = 0;
  encodedMessage.split('').forEach(char => {
    let insertionIndex = fence[row].indexOf(PLACEHOLDER);
    fence[row][insertionIndex] = char;

    if (!fence[row].includes(PLACEHOLDER)) row += 1;
  });

  return readFence(fence);
}

function readFence(fence) {
  let fenceWidth = fence[0].length;

 
  let message = '';
  let yDirection = 1;
  for (let xCoord = 0, yCoord = 0; xCoord < fenceWidth; xCoord++) {
    message += fence[yCoord][xCoord];

    yDirection = calculateDirection(yCoord, 0, fence.length - 1, yDirection);
    yCoord = yCoord + yDirection;
  }

  return message;
}


// Examples:
// "HELLO", 1 rail
console.log(decodeRailCipher('HELLO', 1) === 'HELLO');
// // "HLOEL", 2 rails
console.log(decodeRailCipher('HLOEL', 2) === 'HELLO');
// // "HOLELWRDLO", 3 rails
console.log(decodeRailCipher('HOLELWRDLO', 3) === 'HELLOWORLD');
// 'WE ARE DISCOVERED FLEE AT ONCE', 3 rails
console.log(decodeRailCipher('WECRLTEERDSOEEFEAOCAIVDEN', 3) === 'WEAREDISCOVEREDFLEEATONCE');

// Non-alphanumeric characters are ignored
console.log(decodeRailCipher('HOEL13L2', 3) === 'HELLO123');
// More rails than letters
console.log(decodeRailCipher('HI', 3) === 'HI');

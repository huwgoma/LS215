// ============================ Refactor of Problem 5 ==============================
// function encodeRailCipher(message, numberOfRails) {
//   let cleanedMessage = message.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');

//   let fence = createFence(numberOfRails, cleanedMessage.length)
//   fence = writeToFence(cleanedMessage, fence);

//   return fence.flat().join('');
// }

// function createFence(numberOfRails, railWidth) {
//   let fence = [];

//   for (let i = 0; i < numberOfRails; i++) {
//     fence.push(Array(railWidth));
//   }

//   return fence;
// }

// function writeToFence(message, fence) {
//   let fenceCopy = fence.slice();
//   let [ xCoord, yCoord ] = [ 0 , 0 ];
//   let yDirection = 1;

//   message.split('').forEach(char => {
//     fenceCopy[yCoord][xCoord] = char;
  
//     xCoord += 1;
//     yDirection = calculateDirection(yCoord, 0, fence.length - 1, yDirection);
//     yCoord = yCoord + yDirection;
//   });

//   return fenceCopy;
// }

// function calculateDirection(coordinate, minCoord, maxCoord, currentDirection) {
//   if (minCoord === maxCoord) return 0;

//   switch (coordinate) {
//     case minCoord:
//       return 1;  // Going Down
//     case maxCoord:
//       return -1; // Going Up
//     default:
//       return currentDirection;
//   }
// }

// function decodeRailCipher(encodedMessage, numberOfRails) {
//   const PLACEHOLDER = '?';
//   let fence = createFence(numberOfRails, encodedMessage.length);
//   let placeholderString = PLACEHOLDER.repeat(encodedMessage.length);

//   fence = writeToFence(placeholderString, fence);

//   let row = 0;
//   encodedMessage.split('').forEach(char => {
//     let insertionIndex = fence[row].indexOf(PLACEHOLDER);
//     fence[row][insertionIndex] = char;

//     if (!fence[row].includes(PLACEHOLDER)) row += 1;
//   });

//   return readFence(fence);
// }

// function readFence(fence) {
//   let fenceWidth = fence[0].length;

//   let message = '';
//   let yDirection = 1;
//   for (let xCoord = 0, yCoord = 0; xCoord < fenceWidth; xCoord++) {
//     message += fence[yCoord][xCoord];

//     yDirection = calculateDirection(yCoord, 0, fence.length - 1, yDirection);
//     yCoord = yCoord + yDirection;
//   }

//   return message;
// }

// ==================================================================
// Encoding:
function encodeRailCipher(message, numberOfRails) {
  let cleanedMessage = message.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');

  let fence = createFence(numberOfRails, cleanedMessage.length)
  writeToFence(fence, cleanedMessage);

  return fence.flat().join('');
}

// Decoding:
function decodeRailCipher(encodedMessage, numberOfRails) {
  const PLACEHOLDER = '?';
  let fence = createFence(numberOfRails, encodedMessage.length);
  let placeholderString = PLACEHOLDER.repeat(encodedMessage.length);

  writeToFence(fence, placeholderString);
  replacePlaceholders(encodedMessage, PLACEHOLDER, fence);

  return readFence(fence);
}

function replacePlaceholders(message, placeholder, fence) {
  let row = 0;

  message.split('').forEach(char => {
    let insertionIndex = fence[row].indexOf(placeholder);
    fence[row][insertionIndex] = char;

    if (!fence[row].includes(placeholder)) row += 1;
  });
}

// >> Helpers <<
function createFence(numberOfRails, railWidth) {
  let fence = [];

  for (let i = 0; i < numberOfRails; i++) {
    fence.push(Array(railWidth));
  }

  return fence;
}

function traverseFence(fence, callback) {
  let fenceWidth = fence[0].length;
  let yDirection = 1;

  for (let xCoord = 0, yCoord = 0; xCoord < fenceWidth; xCoord++) {
    callback(xCoord, yCoord, fence);

    yDirection = calculateDirection(yCoord, 0, fence.length - 1, yDirection);
    yCoord = yCoord + yDirection;
  }
}

function calculateDirection(coordinate, minCoord, maxCoord, currentDirection) {
  if (minCoord === maxCoord) return 0; // Flat 

  switch (coordinate) {
    case minCoord:
      return 1;  // Going down
    case maxCoord:
      return -1; // Going up
    default:
      return currentDirection; // Maintain same direction
  }
}

function readFence(fence) {
  let message = '';

  traverseFence(fence, (x, y, fence) => {
    message += fence[y][x];
  });

  return message;
}

// ! Mutates Fence !
function writeToFence(fence, message) {
  traverseFence(fence, (x, y, fence) => {
    fence[y][x] = message[x];
  });
}

// Examples ====================-
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
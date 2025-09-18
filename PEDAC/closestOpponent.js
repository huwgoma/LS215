// Closest Opponent
// Write a function that returns the position of the closest active opponent.
// - If two opponents are equidistant (same distance), return the one with the
//   higher position on the board.


// ============ Questions ============
// What does the board look like?
// - How is it represented data-wise?
// > 1-Dimensional 'Road' board type?
// eg. (1, 5) 3 
// | 1 |
// |   |
// | 3 |
// |   |
// | 5 |

// - Opponent @ 1 and 5 are equidistant from current position (3); therefore, 
//   return the opponent with the higher position (5)
// - Each 'opponent' is represented as a key-value pair in an `opponents` object;
//   eg. { 'Opponent 1a': 1, 'Opponent 1b': 5 }
//   > Key: Opponent Name; Value: Opponent Position
// Return value is the position (Number)

// What does it mean for an opponent to be 'active'?
// > Position is not null?

// Can two pieces (opponents) exist at the same position?
// eg. { 'Opponent 1a': 5, 'Opponent 1b': 5 }
// - If yes, how should this be handled? 
// > Pieces cannot share positions.

// What should occur if the opponents object does not contain any (active) pieces?
// => Return null

// Is it possible for the second input (current position) to be null or missing?
// > No

// Is it possible for board positions to be negative?
// > No

// ============ Input/Output ============
// Input: 
// 1) An Object representing opponents and their positions
//    - May contain inactive pieces (ie. position); inactives can be safely ignored
//    - If all pieces are active/no pieces => return null
// 2) Number representing our piece's current position
//    - Can safely assume that currentPosition is always present and valid.

// Output:
// - A number representing the position of the closest opponent


// ============ Data ============
// How to represent the board?
// | 1 |
// |   |
// | 3 |
// |   |
// | 5 |

// Options:
// 1) Simple Array => [1, 10, 15, 37] (Position 10)
//    - Place all non-null positions into an array and sort by numeric value 
//      (ascending order)
//    - Find our position (10), then extract the adjacent positions (1, 15)
//    - Calculate the absolute difference between the current position and the 
//      upper/lower adjacents
//      > Abs(10 - 1) => 9; Abs(10 - 15) => 5
//    - Return the position with the smaller absolute difference.
//      * If both differences are the same, return the upper (right) adjacent

// ============ Algorithm ============
// Given an object and number as input, `opponents` and `position`:
// 1) Filter the opponents object's values to remove any null positions (inactive
//    pieces)
// *  If the resulting array of values is empty, return null.

// 2) Insert our piece's current position into the array of opponent positions

// 3) Sort the resulting array in ascending numerical order

// 4) Find the index of our piece

// 5) Extract the adjacent positions (upper and lower)
// *  What happens if our piece is at the very end?
//    - Either upper or lower may be undefined
//      
//    If upper is undefined (eg. [1, 2, 3 <- our piece])
//    - Set upper = Infinity 
//    If lower is undefined (eg. [our piece -> 1, 2, 3])
//    - Set lower = -Infinity

// 6) Return either upper or lower, based on the following rules:
//    - Calculate the absolute difference between position and upper/lower
//    - Return the element with the smaller absolute difference.
//    * If both absolute differences are equal, return upper


function findClosestOpponent(opponents, position) {
  let activePositions = Object.values(opponents).filter(position => position);
  if (activePositions.length === 0) return null;

  activePositions.push(position);
  activePositions.sort((a, b) => Number(a) - Number(b));

  let indexOfPiece = activePositions.indexOf(position);

  let positionBehind = activePositions[indexOfPiece - 1] || -Infinity;
  let positionInFront  = activePositions[indexOfPiece + 1] ||  Infinity;

  let absDifferenceBefore = Math.abs(position - positionBehind);
  let absDifferenceAfter  = Math.abs(position - positionInFront);

  if (absDifferenceBefore < absDifferenceAfter) {
    return positionBehind;
  } else if (absDifferenceAfter < absDifferenceBefore) {
    return positionInFront;
  } else {
    return positionInFront;
  }
}

// Alternative Solution - Implement a solution using reduce().
  // Extract and sort opponent position values
  // Iterate through opponentpositions. For each opp position:
  // Maintain a record of the position with the smallest distance to our position
  // 1) Calculate the distance between the current opp position and our position
  // 2) If the distance is smaller than/equal to the distance between the memo opp
  //    position and our position, replace memo opp position with current opp position
  // => Return final memo opp position

function findClosestOpponent(opponents, position) {
  let activeOpponentPositions = Object.values(opponents)
    .filter(position => position)
    .sort((a, b) => Number(a) - Number(b));

  if (activeOpponentPositions.length === 0) return null;

  return activeOpponentPositions.reduce((closestPosition, oppPosition) => {
    let currentDelta = Math.abs(position - oppPosition);
    let memoDelta    = Math.abs(position - closestPosition);

    if (currentDelta <= memoDelta) { closestPosition = oppPosition }

    return closestPosition;
  }, Infinity);
}


// ============ Test Cases ============
console.log(findClosestOpponent({
  "Opponent 1" : 1,
  "Opponent 2" : 15,
  "Opponent 3" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : 1,
  "Opponent 1b" : 5
}, 3)); // 5

// Our piece is at the bottom edge
console.log(findClosestOpponent({
  "Opponent 1a" : 3,
  "Opponent 1b" : 5
}, 1)); // 3

// Our piece is at the top edge
console.log(findClosestOpponent({
  "Opponent 1a" : 1,
  "Opponent 1b" : 3
}, 5)); // 3

// Null Positions are Inactive -> Ignore
console.log(findClosestOpponent({
  "Opponent 1a" : 1, "Opponent 1b" : 5,
  "Opponent 1c" : 50, "Opponent 1d" : 100, "Opponent 1e" : null
}, 150)); // 100

// Empty Opponents Object -> Null
console.log(findClosestOpponent({ }, 150)); // null

// Fully-Inactive Opponents Object -> Also return null
console.log(findClosestOpponent({ 
  "Opponent 1a": null, "Opponent 1b": null, "Opponent 1c": null
}, 150)); // null
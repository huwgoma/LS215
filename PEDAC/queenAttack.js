// Input: A String (representing the chess board)
// - has 2 queens somewhere in it 
// Output: 
// - Boolean (true if the queens can attack each other, false otherwise)

// Rules:
// - Queens can attack if they are on the same row, column, or diagonal
// - White Queen is at (2, 3) (? assuming W - White)
//   - 0-based index, (row, column)
//   - Origin (0, 0) is at top left
//   - First number (2) corresponds to row
//   - Second Number (3) corresponds to column
// - How large is the board? 
//   - 8x8 (0..7, 0..7)
// - What does it mean to be on the same:
//   - Row?
//     - First number is the same - ie. (2, x), (2, y)
//   - Column?
//     - Second number is the same - ie. (x, 3), (y, 3)
//   - Diagonal?
//     - The absolute value of X1 - X2 is equal to the absolute value of Y1 - Y2
// - No other pieces on the board
// - Queens are represented as strings (W/B)
// - Queens may be missing (?)
//   - If 0/1 queens, queens can't attack each other
//   - return undefined
// - Can you have more than two queens?
//   - No(t for this problem)

// What does the string representation of the board look like?
// - Board string will always be given.
// What characters will be in the input string?
// - Underscores, newline characters, W, and B
// "________\n________\n________\n________\n________...."
// Is the board represented by a single string?
// - Yes
// One underscore represents one blank square
// - 8 underscores, new line, etc...

// Data:
// How to represent data?
// - We need to be able to retrieve characters based on coordinates (row, column) 
// - eg. board[row][column] - should return the character at that row and column

// IMO - Array of Strings, where each String represents a row - split on newlines
// - board.split("\n")
// Board => ["________", "________", "__W_____", ...][2][3]

// Coordinates - [[x, y], [a, b]]
// { row: x, column: y } ?


// Algorithm:
// 1) Convert the board string into an array of strings (rows)
// 2) Find the coordinates of each queen on the board.
//    - If either (or both) queen is missing, return undefined
// 3) Determine whether the two queens can attack each other from their coordinates
// -------------------------------------------------------------------
// 1) Convert the board string into an array of strings representing rows
//   - Split input string on newline characters (\n)
// 2) Find the coordinates of each queen on the board.
//   - findQueenCoordinates(board) => { B: [x, y], W: [x, y] }
// 3) If coordinates[B] or coordinates[W] are missing, return undefined
// 4) Determine whether the two coordinates can attack each other.
//   - canAttack(coordinates[B], coordinates[W]) => true/false

// Helpers -------------------------------------------------------------------
// canAttack([x, y], [x, y]) => true/false
// - Input: Two Arrays (coordinates of each queen)
// - Output: Boolean (true if coordinateA can attack coordinateB (vice-versa))
// Rules:
// - coordinateA can attack coordinateB if:
//   - coordinateA's row === coordinateB's row, or
//   - coordinateA's col === coordinateB's col, or
//   - coordinateA's dia === coordinateB's dia
// Initialize variables for each row/column:
// - rowA, colA = coordinateA
// - rowB, colB = coordinateB
// Determine if coordinateA exists on the same row as coordinate B:
// - rowA === rowB
//   - if false, proceed to next step (if true, short-circuit and return true)
// Determine if coordinateA exists on the same column as coordinate B:
// - colA === colB
//   - if false, proceed to next step (if true, short-circuit and return true)
// Determine if coordinateA exists on the same diagonal as coordinateB:
// - Absolute(rowA - rowB) === Absolute(colA - colB)
// => Last condition - return either true or false

// findQueenCoordinates(["______", "______W", ...]) => { B: [x, y], W: [x, y] }
// - Input: Array of Strings (each string representing a row)
// - Output: Object (Keys: Queen Character, Value: Array of coordinates)
//   - Row Coordinate: Index of the String the Queen is in
//   - Col Coordinate: Index of the Queen Character within the row string
// Iterate over each row in board. For each row + rowIndex:
// - Search the current row string for 'B' or 'W'. 
//   - If a match is found, add a new key-value pair to coordinates:
//     - Key: The character that was matched (B or W)
//     - Value: An array of coordinates:
//       - Row: The current rowIndex
//       - Column: The index of the matching queen character (row.match).index
// ******************
//   * We need to search for all matches in the row, not just one
//     - Because B and W might exist on the same row
//     * matchAll - Returns an array of arrays where each subarray contains the 
//       match data for one match:
//      [
//        [ 'W', index: 6, input: '______WB', groups: undefined ],
//        [ 'B', index: 7, input: '______WB', groups: undefined ]
//      ]
//     - Iterate through matches and add a key-value pair for each match
//       match.first => [rowIndex, match.index]

// ** optional, omit for now
//   - At the end of each iteration, we can check if coordinates.A and 
//     coordinates.B are both present (both found). 
//     - If true, we can exit iteration pre-emptively (because there cannot be
//       more than 2 queens for this problem)
// => Return coordinates object

// Code:
function queenAttack(board) {
  board = board.split("\n");

  let queenCoordinates = findQueenCoordinates(board);

  if (!(queenCoordinates.hasOwnProperty('W') && 
        queenCoordinates.hasOwnProperty('B'))) { return undefined };

  return canAttack(queenCoordinates.W, queenCoordinates.B);
}

function findQueenCoordinates(board) {
  return board.reduce((coordinates, row, rowIndex) => {
    let matches = row.matchAll(/W|B/g);

    matches.forEach(match => {
      let queenChar = match[0];
      let colIndex  = match.index;

      coordinates[queenChar] = [rowIndex, colIndex];
    });

    return coordinates;
  }, {});
}

function canAttack(coordinateA, coordinateB) {
  let [ rowA, colA ] = coordinateA;
  let [ rowB, colB ] = coordinateB;

  return rowA === rowB || colA === colB ||
         Math.abs(rowA - rowB) === Math.abs(colA - colB);
}

// Examples:
// Same Diagonal - True
console.log(queenAttack("________\n" +
                        "________\n" +
                        "___W____\n" +
                        "________\n" +
                        "________\n" +
                        "______B_\n" +
                        "________\n" +
                        "________\n") === true); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B______\n" +
                        "W_______\n") === true); 

// Same Row - True 
console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B_____W\n" +
                        "________\n") === true); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "B______W\n" +
                        "________\n") === true); 

// Same Column - True
console.log(queenAttack("________\n" +
                        "______W_\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "______B_\n" +
                        "________\n" +
                        "________\n") === true); 


// No Attack - False
console.log(queenAttack("________\n" +
                        "________\n" +
                        "___W____\n" +
                        "________\n" +
                        "________\n" +
                        "_______B\n" +
                        "________\n" +
                        "________\n") === false); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "_B______\n" +
                        "_______W\n") === false); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "______B_\n" +
                        "___W____\n" +
                        "________\n") === false); 

// Missing Queen(s) -> undefined
console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n") === undefined); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "______B_\n" +
                        "________\n" +
                        "________\n") === undefined); 

console.log(queenAttack("________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "________\n" +
                        "______W_\n" +
                        "________\n" +
                        "________\n") === undefined); 
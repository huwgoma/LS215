// Rectangles are represented as Arrays with 2 elements (height/width)
// Write a function named totalArea that takes an Array of nested 2-element subarrays,
// each representing a rectangle. 
// - The function should return the total area covered by all rectangles.

function totalArea(rectangles) {
  let areas = rectangles.map(rectangle => {
    let [ height, width ] = rectangle;
    return height * width;
  });

  return areas.reduce((sum, area) => sum +  area, 0);
}

// Example:
let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141


// Write a second function named totalSquareArea - this function should calculate
// the total area of the given rectangles, but only the rectangles that are also
// squares (eg. height === width)

function totalSquareArea(rectangles) {
  let squares = rectangles.filter(rectangle => {
    let [ height, width ] = rectangle;

    return height === width;
  });

  return totalArea(squares);
}

console.log(totalSquareArea(rectangles));    // 121 (36 + 81 + 4)
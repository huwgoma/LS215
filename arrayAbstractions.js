function myForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

// let min = Infinity;
// let max = -Infinity;

// let getMinMax = function (value) {
//   if (value >= max) {
//     max = value;
//   }

//   if (value <= min) {
//     min = value;
//   }
// };

// [4, 5, 12, 23, 3].forEach(getMinMax);

// console.log(min, max);           // 3 23


// =======================================================================


function myFilter(array, callback) {
  let selection = [];
  
  array.forEach((element, index, self) => {
    if (callback(element, index, self)) selection.push(element);
  })

  return selection;
}

// let isPythagoreanTriple = function (triple) {
//   return Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2);
// };

// console.log(myFilter([{ a: 3, b: 4,  c: 5 },
//           { a: 5, b: 12, c: 13 },
//           { a: 1, b: 2,  c: 3 },], isPythagoreanTriple));

// // returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]


// =======================================================================


function myMap(array, callback) {
  let result = [];

  array.forEach((element, index, self) => {
    result.push(callback(element, index, self));
  })

  return result;
}

// let plusOne = n => n + 1;
// console.log(myMap([1, 2, 3, 4], plusOne));       // [ 2, 3, 4, 5 ]


// ========================================================================


function myReduce(array, callback, initial) {
  let memo = initial;
  let arrayToIterate = array;

  if (initial === undefined) {
    memo = array[0];
    arrayToIterate = array.slice(1);
  }

  arrayToIterate.forEach((element, index) => {
    memo = callback(memo, element, index, array);
  })

  return memo;
}

// let smallest = (result, value) => (result <= value ? result : value);
// let sum = (result, value) => result + value;

// console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
// console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49


// ========================================================================


function myOwnEvery(array, callback) {
  for (let index = 0; index < array.length; index++) {
    let element = array[index];
    if (!callback(element, index, array)) return false;
  }

  return true;
}

// let isAString = value => typeof value === 'string';
// console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true
// console.log(myOwnEvery(['a', 'a234', 5], isAString));            // false
// console.log(myOwnEvery([], isAString));                          // true

function myOwnSome(array, callback) {
  for (let index = 0; index < array.length; index++) {
    let element = array[index];
    if (callback(element, index, array)) return true;
  }

  return false;
}

// console.log(myOwnSome(['a', 'a234', '1abc'], isAString));       // true
// console.log(myOwnSome([1, 2, 3], isAString));                   // false
// console.log(myOwnSome([], isAString));                          // false


// ================================================================

let studentGrades = [
  { name: 'StudentA', grade: 90.1 },
  { name: 'StudentB', grade: 92 },
  { name: 'StudentC', grade: 91.8 },
  { name: 'StudentD', grade: 95.23 },
  { name: 'StudentE', grade: 91.81 },
];

// Write some code that sorts an Array (studentGrades) based on their final grades,
// from highest to lowest (descending)

studentGrades.sort((student1, student2) => {
  return student2.grade - student1.grade;
})

console.log(studentGrades)
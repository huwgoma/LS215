// Iteration
function objectForEach(object, callback) {
  // Iterates and exposes each key/value pair to callback
  Object.keys(object).forEach(key => {
    let value = object[key];
    callback(key, value);
  })
}

let object = { a: 1, b: 2, c: 3 };
console.log(objectForEach(object, (k, v) => console.log(k, v)));


// Selection
function objectFilter(object, callback) {
  let selection = {};

  objectForEach(object, (key, value) => {
    if (callback(key, value)) selection[key] = value;
  })

  return selection;
}

console.log(objectFilter(object, (k, v) => v % 2 === 0));


// Transformation
function objectMap(object, callback) {
  let transformation = {};

  objectForEach(object, (key, value) => {
    transformation[key] = (callback(key, value));
  })

  return transformation;
}

console.log(objectMap(object, (k, v) => v * 2));


// Reduce
function objectReduce(object, callback, initial) {
  let memo = initial;

  Object.keys(object).forEach((key, index) => {
    let value = object[key];

    memo = callback(memo, key, value, index, object);
  })

  return memo;
}

console.log(objectReduce(object, (sum, k, v) => {
  return sum + v;
}, 0))
//=> 6
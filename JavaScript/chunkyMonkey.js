/*
chunkeyMonkey.js

An algorithm that takes an array `arr` and an integer `size` as arguments, and
returns an array of arrays, each of which holds `size` amount of members from the
original array. if `arr`.length / `size`, the final array will hold the
rmdrinder...

Eric James Foster, MIT License..
*/


function log(str) {
  return console.log(str);

}

// The function..
function chunkArrayInGroups(arr, size) {
  // The resulting array of arrays..
  var resultArr = [],
  // This var will hold the inner arrays (sets) of numbers..
      array,
  // Determine how many sets there will be in the collection by dividing the
  // length of the starting array `arr` by the size of the inner sets `size`,
  // then rounding the number up..
      sets = Math.ceil(arr.length / size),
  // If there is a remainder when resolving the above equation, this variable
  // will hold it..
      rmdr = arr.length % size;

  // Begin an outer loop that will loop `sets` number of times..
  for (var i = 0; i < sets; i++) {
    // If the remaining length of the starting array `arr` is smaller than the
    // given set `size`, reset the size to equal the remainder, otherwise, the
    // loop will continue to run with no characters left in the starting array..
    if (arr.length < size) {
      size = rmdr;
    }
    // Set/Reset the set array variable..
    array = [];
    // This loop will not iterate through the entire array the first time through.
    // It will run through "set size" number of times to shift out the first char
    // to the set array.. This will continue till no chars are left..
    for (var j = 0; j < size; j++) {
      // Take the first char of `arr`, and push it to the set array...
      array.push(arr.shift());
    }
    // Push the completed set array to the resulting array..
    resultArr.push(array);
  }
  // Return the result...
  return resultArr
}

log(chunkArrayInGroups(["a", "b", "c", "d"], 2));

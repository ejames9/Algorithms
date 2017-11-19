/*
slasher.js

This is an algorithm that takes an array of integers `arr`, and an integer `howMany`
as arguments and returns a new array with `howMany` number of the original arrays
numbers removed from the beginning of the array...

Eric James Foster, MIT License...
*/

function log(str) {
  return console.log(str);
}

// The function..
function slasher(arr, howMany) {
  // One step algorithm --- create a substring beginning at index 0 of the input
  // array `arr`, ending at index `howMany`, store it...
  arr = arr.slice(howMany)
  // and return it...
  return arr;
}

log(slasher([1, 2, 3], 2));

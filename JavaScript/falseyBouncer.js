/*
mutations.js

This is an algorithm that removes all falsy values from an array.

Eric James Foster, MIT License...
*/


function log(str) {
  return console.log(str);
}

// The main function...
function bouncer(arr) {
// Declare variable that will hold the resulting array...
  var resultArr = [];
// Iterate over each item in the given array...
  arr.forEach(function(el, i) {
// If the item is truthy...
    if (el) {
// Push it to the result array..
      resultArr.push(el);
    }
  });
// and return the array.
  return resultArr;
}

log(bouncer([7, "ate", false, 8, -1, false, "", "", false]));

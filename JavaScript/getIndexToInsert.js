/*
getIndexToInsert.js

An algorithm that returns the lowest index at which a value, `num` --
(second argument), should be inserted into an array, `arr` -- (first argument),
 once it has been sorted. The returned value should be a number.

Eric James Foster, MIT License..
*/


function log(str) {
  return console.log(str);
}

// The function...
function getIndexToIns(arr, num) {
  // Push `num` to `arr`...
  arr.push(num);
  // Resort the array...
  var result = arr.sort(function(a, b) {
    return a - b;
  // Get the index of the newly inserted/sorted `num`...
  }).indexOf(num);
  // Return the result.
  return result;
}

log(getIndexToIns([40, 60, 65, 84, 99], 66));

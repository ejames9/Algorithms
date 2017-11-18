/*
largestOfFour.js

This algorithm takes an array of arrays of four numbers, and returns an array
with the largest number from each, in the given order...

Eric James Foster, MIT License..
*/

function log(str) {
  return console.log(str);
}


function largestOfFour(arr) {
  // Get function scoped variables..
  var largestNums = [],
      highest = 0;
  // Outer loop, for each array, reset the value of the highest number variable
  // to `0`.
  arr.forEach(function(array) {
    highest = 0;
    // The Inner Loop, loops through each number in the array comparing it with
    // the highest number variable. If the num is higher, highest is reset to
    // it's value.. In the future, I may refer simply to this tactic as `war`,
    // like the card game, for brevity's sake.
    array.forEach(function(num) {
      if (num > highest) {
        highest = num;
      }
    });
    // Push the winner from each array to the largestNums array...
    largestNums.push(highest);
  })
  // Return the array...
  return largestNums;
}

log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));

/*
seekAndDestroy.js

This algorithmic function is provided with an initial array (the first argument
in the destroyer function), followed by one or more arguments. It then removes all
elements from the initial array that are of the same value as these arguments.

Eric James Foster, MIT License..
*/


function log(str) {
  return console.log(str);
}

// The function..
function destroyer(arr) {
  // Get an array containing the arguments following the initial array arguments
  // only...
  var args = [].slice.call(arguments).slice(1),
  // Filter the input array...
      resultArr = arr.filter(function(num) {
  // returning only nums that don't have a positive index in the target
  // args array. The returned nums will populate the resultArr...
    return args.indexOf(num) == -1;
  })
  // Return the resultArr.
  return resultArr;
}

log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));

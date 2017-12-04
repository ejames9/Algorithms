/*
mutations.js

This is an algorithm that Returns true if the string in the first element of the
array `arr` contains all of the letters of the string in the second element of the
array...

Eric James Foster, MIT License...
*/



function log(str) {
  return console.log(str);
}

// The function
function mutation(arr) {
// Split the second element of the array into a new array of chars...
  var str = arr[0].toLowerCase(),
      chars = arr[1].toLowerCase();

// Iterate through the array of characters...
  for (var i = 0; i < chars.length; i++) {
// check i's index in the given array's first element string.. If the
// indexOf function returns -1 for any of the characters, the function will
// return false.
    if (str.indexOf(chars[i]) == -1) {
      return false;
    }
  }
// If all chars are found, the function will return true.
  return true;
}

log(mutation(["Mary", "Army"]));

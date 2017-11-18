/*
repeatStringNumTimes.js

This is an algorithm that takes a string and a number as arguments, repeats The
string `num` number of times and concatenates the duplicates into one string...

Eric James Foster, MIT License..
*/



function log(str) {
  return console.log(str);
}


function repeatStringNumTimes(str, num) {
  // Declare result variable..
  var result = '';
  // Loop `num` number of times, adding the string `str`, each time...
  for (var i = 0; i < num; i++) {
    result += str;
  }
  // return the result
  return result;
}

log(repeatStringNumTimes("abc", 3));

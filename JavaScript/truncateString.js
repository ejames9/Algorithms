/*
truncateString.js

An algorithm that truncates a given string `str`, to the given number of char-
acters `num`. This total length includes the truncating postfix: "...", unless
the starting `str` length is less than four, in which case it doesn't..

Eric James Foster, MIT License..
*/


function log(str) {
  return console.log(str);
}

// The function..
function truncateString(str, num) {
  // Set the truncation threshold to `num` - 3, to allow for the postfix, unless
  // `str` is less than 4, then set it to `num`...
  var max = (str >= 4) ? (num - 3) : num,
  // The truncation postfix...
  postfix = '...'
  // If `str` length exceeds `num`...
  if (num < str.length) {
    // Get a slice from the beginning of the string
    // to the max index, and append the postfix to the end of it...
    str = str.slice(0, max) + postfix
  }
  // If `str` length equals or exeeds num, it will be returned with no mod-
  // ification. Otherwise the modified `str` will be returned...
  return str;
}

log(truncateString("A-", 1));

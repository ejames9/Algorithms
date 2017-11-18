/*
confirmEnding.js

An algorithm that takes a string and a substring as arguments. If the substring
ends with the substring, it returns true, otherwise false..

Eric James Foster, MIT License..
*/

function log(str) {
  return console.log(str);
}


function confirmEnding(str, target) {
  // Use the length of the target argument to get the length of the substring to
  // compare it to, which is at the end of the `str` argument... Return true
  // or false accordingly...
  if (str.substr(-(target.length)) == target) {
    return true;
  } else {
    return false
  }
}

log(confirmEnding("Bastian", "n"));

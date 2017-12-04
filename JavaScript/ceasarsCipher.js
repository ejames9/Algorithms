/*
ceasersCipher.js

This algorithm functions as a ROT13 cipher, where the values of the letters are
shifted by 13 places. This file contains a function `rot13`,  which takes a
ROT13 encoded string as input and returns a decoded string.

Eric James Foster, MIT License..
*/


function log(str) {
  return console.log(str);
}

//
var alphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

// The function..
function decipher(str) { // LBH QVQ VG!
// Get regex for determining whether or not a char is non-alphanumeric, and
// variable that will hold the new string in array form...
  var nonAlNum = /[^a-zA-Z0-9]/g,
      newString = [];
// Set a loop to iterate through the given string `str`...
  for (var i = 0; i < str.length; i++) {
// if the char is non-alnum, push it straight to the newString array...
    if (nonAlNum.test(str[i])) {
      newString.push(str[i]);
    } else {
/* If the char is alnum, get it's alphabetical index, based on the global
`alphabet` array var, set above, and subtract 13, which is our cipher
shift value...
*/
      var index = alphabet.indexOf(str[i]) - 13;
// If our resulting index is less than 0...
      if (index < 0) {
/* Roll the index to the back of the alphabet by subtracting the absolute
value of the negative index from the ending `Z` index (adding 1 to
account for the value between 0 and 25.).
*/
        index = (25 + 1) - Math.abs(index);
      }
/* Use the resulting index to push it's corresponding alphabet array value
to the newString array...
*/
      newString.push(alphabet[index]);
    }
  }
// Concatenate the array of strings into one string...
  str = newString.join('');
// Return the deciphered string.
  return str;
}


// The encipherion function..
function encipher(str) { // LBH QVQ VG!
// Get regex for determining whether or not a char is non-alphanumeric, and
// variable that will hold the new string in array form...
  var nonAlNum = /[^a-zA-Z0-9]/g,
      newString = [];
// Set a loop to iterate through the given string `str`...
  for (var i = 0; i < str.length; i++) {
// if the char is non-alnum, push it straight to the newString array...
    if (nonAlNum.test(str[i])) {
      newString.push(str[i]);
    } else {
/* If the char is alnum, get it's alphabetical index, based on the global
`alphabet` array var, set above, and add 13, which is our cipher
shift value...
*/
      var index = alphabet.indexOf(str[i]) + 13;
// If our resulting index is greater than 25...
      if (index > 25) {
/* Roll the index to the front of the alphabet by adding the value of the
difference of the index and 25 (minus 1 to account for 0) to 0...
*/
        index = 0 + (index % 25 - 1);
      }
/* Use the resulting index to push it's corresponding alphabet array value
to the newString array...
*/
      newString.push(alphabet[index]);
    }
  }
// Concatenate the array of strings into one string...
  str = newString.join('');
// Return the enciphered string.
  return str;
}

// Change the inputs below to test

log(encipher('THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX.'));
log(decipher(encipher('THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX.')));
log(decipher('LBH QVQ VG!'));

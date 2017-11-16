/*
Palindrome.js

Eric James Foster, MIT License.
*/




function palindrome(str) {
  // Remove all non alphanumeric characters..
  var nonAlNum = /[^0-9a-zA-Z]/g;

  if (nonAlNum.test(str)) {
    str = str.replace(nonAlNum, "");
  }

  // convert to all lower case..
  str = str.toLowerCase();
  // get the length of string..
  var count = str.length;

  // get the middle character index.
  var sliceIndex = Math.floor(count / 2);
  var prefix     = str.slice(0, sliceIndex)
  var reflection = str.slice(sliceIndex, count);
  var reflectionArr = reflection.split('');

  // if count is odd, remove the first character..
  if (count % 2 > 0) {
    reflectionArr.shift();
  }

  // Reverse string and regenerate a string..
  reflectionArr.reverse();
  reflection = reflectionArr.join('');

  // For the finale, check whether or not the remaining string prefix
  // and the reflection string are equal. If they are, we have a
  // palindrome, and will return true. Otherwise, we return false.
  if (prefix == reflection) {
    return true;
  } else {
    return false;
  }
}



palindrome("eye")

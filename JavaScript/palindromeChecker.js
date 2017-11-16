/*
Palindrome.js

Eric James Foster, MIT License.
*/




function palindrome(str) {
  // Remove all non alphanumeric characters..
  var nonAlNum = /[^0-9a-zA-Z]/g;
  if (nonAlNum.test(str)) {
    str.replace(nonAlNum, "");
  }

  // convert to all lower case..
  str = str.toLowerCase();
  // get the length of string..
  var count = str.length;

  // get the middle character index.
  var sliceIndex = count / 2;
  var reflection = str.slice(sliceIndex, count);
  var reflectionArr = reflection.split('');

  // if count is odd, remove the first character..
  if (count % 2 > 0) {
    reflectionArr.shift();
  }

  // Reverse string and regenerate a string..
  reflection = reflectionArr.join(reflectionArr.reverse());

  // For the finale, check whether or not the remaining string prefix
  // and the reflection string are equal. If they are, we have a
  // palindrome, and will return true. Otherwise, we return false.
  if (str == reflection) {
    return true;
  } else {
    return false;
  }
}



palindrome("eye");

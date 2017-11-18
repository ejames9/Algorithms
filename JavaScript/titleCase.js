/*
titleCase.js

An algorithm that simply capitalizes the first letter of each word in
the sentence, including connecting words such as `the` and `of`.

Eric James Foster, MIT License..
*/

function log(str) {
  return console.log(str);
}


function titleCase(str) {
  // First make sure all letters in the sentence are lower-cased..
  str = str.toLowerCase()
  // Split sentence into an array of words.. prepare a variable for
  // an array of the title-cased words..
  var wordArray = str.split(' '),
      titleCaseArray = [];

  // For each of the words...
  wordArray.forEach(function(word) {
    // Split each word up into an array of characters...
    var charArray = word.split('');
    // Uppercase the words...
        charArray[0] = charArray[0].toUpperCase();
    // Rejoin the chars into words...
    var capped = charArray.join('');
    // Append capitalized word to new array...
    titleCaseArray.push(capped);
  });

  // Rejoin the array of capitalized words into a sentence...
  str = titleCaseArray.join(' ');
  return str;
}

log(titleCase("I'm a little tea pot"));


         

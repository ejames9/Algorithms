/*
findLongestWord.js

Eric James Foster, MIT License..
*/

function log(str) {
  return console.log(str);
}

// Find the longest word algorithm....
function findLongestWord(str) {
  // Split the sentence up into an array of individual words..
  var wordArray = str.split(" ");
  // Set `str` to a string length of `0`..
  str = "";
  // Cycle through all words of the array, comparing the length of each
  // to the length of `str`. In war-like game, the winner is always set to
  // str, assuring that it will hold the longest word in the end..
  wordArray.forEach((word)=> {
    if (word.length > str.length) {
      str = word;
    }
  })
  // Return the length of the winner..
  return [str, str.length];
}

findLongestWord("I quickly at a motherfucking turd").forEach((str)=> {
  log(str);
})

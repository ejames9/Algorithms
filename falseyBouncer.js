/*
mutations.js

This is an algorithm that removes all falsy values from an array.

Eric James Foster, MIT License...
*/


function log(str) {
  return console.log(str);
}

function bouncer(arr) {
  //
  var resultArr = [];
  //
  arr.forEach(function(el, i) {
    if (el) {
      resultArr.push(el);
    }
  })
  return resultArr;
}

log(bouncer([7, "ate", false, 8, -1, false, "", "", false]));

/*
dataProcessor.js

Code used to process data recieved from
twitch.tv api calls.

Eric James Foster, MIT license...
*/



// a Higher-Order function for piping smaller functions together
// that operate on the same piece of data...
const compose = (...funcs)=>
  (arg)=>
    funcs.reduce(
      (data, func)=> func(data),
      arg
    )

log('hello there ye');

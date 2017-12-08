/*
funcs.h

A module containing some commonly used convenience functions...

Contents:
---------
- split(str, on, arr)
- isPositiveInt(int)
- printChar(char, #times)
- isSame(str1, str2);

Eric James Foster, MIT License..
*/

#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>



// String splittin' function.. Splits a given string `str`, on the given
// chars `on`...
void split( char str[], char on[2], char *names[] )
{
  char *name;
  int i = 0;

// Initial call to `strtok`, passing in the user name string, and the delimiter..
  name = strtok(str, on);
// Take first name, and squirt it into the names array..
  names[i] = name;
  i++;
// Call `strtok` until all names are appended to list...
  while (name != NULL) {
// On subsequent calls to `strtok`, a NULL pointer must be passed in...
    name = strtok(NULL, on);
// Next name..
    names[i] = name;
    i++;
  }
// Append termination string to end of array, for iteratability..
  names[i] = "\0";
}


// User input validation function. Returns true if the string `input` contains
// no alphabetical chars && is a positive integer..
bool isPositiveInt( char *input )
{
// Loop through all chars in `input`...
  for (int i = 0; input[i] != '\0'; i++)
  {
// If an alphabetical char is found...
    if (isalpha(input[i]))
    {
// Return the function with a boolean value of false.
      return false;
    }
  }
// If no alpha chars are found, verify that the integer value given is > 1..
  if (atoi(input) < 1)
  {
// Otherwise return the function, false.
    return false;
  }
// If the function gets to this point, the input is valid, and verified by
// returning the function with a boolean value of true.
  return true;
}


// A character printing function that will help to clean up the buildPyramids
// function.. It prints the given char `c`, `n` number of times consecutively...
void printChar( char c[2], int n )
{
  for (int i = 0; i < n; i++)
  {
    printf("%s", c);
  }
}


// A boolean wrap of `strcmp()`...
bool isSame(char *str1, char *str2)
{
  int retVal = strcmp(str1, str2);
//
  if (retVal != 0)
  {
    return false;
  }
  else
  {
    return true;
  }
}


// A boolean comparison of char values...
bool isSameChar(char char1, char char2)
{
//
  if ((int)char1 != (int)char2)
  {
    return false;
  }
  else
  {
    return true;
  }
}

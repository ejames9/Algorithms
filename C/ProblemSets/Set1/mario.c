/*
mario.c

A program that prints 2 half pyramids of hashtags that are of a user defined
height, and 2 char spaces apart..

Eric James Foster, MIT License..
*/


#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>


bool isPositiveInt();
bool isLessThan24();
void buildPyramids();
void printChar( char c[2], int n );

// The main thread...
int main( void )
{
// User input, pyramid height variable...
  char height[3] = "0";

// User input validation loop...
  while (!isPositiveInt(height) || !isLessThan24(height))
  {
// Prompt user for `height`, and store it...
    printf("Height: ");
    scanf("%s", height);
  }
// Build the pyramids with the given height...
  buildPyramids(height);

// All is well.
  return 0;
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

// User validation specific to this program. This problem's requirements state
// that user input should be less than or equal to 23..
bool isLessThan24( char *input )
{
  if (atoi(input) < 24)
  {
    return true;
  }
  else
  {
    return false;
  }
}

// This function will build 2 half pyramids, side by side, the height of which
// is given as the parameter h. The image will resemble the following:
//   #  #
//  ##  ##
// ###  ###
void buildPyramids( char *h )
{
// Convert `h` to an int...
  int pyramidHeight = atoi(h);

// Build the pyramids using a loop, values pyramidHeight and i, and a printChar
// convenience function..
  for (int i = 1; i <= pyramidHeight; i++)
  {
// Lay out the pattern with the printChar function...
    printChar(" ", (pyramidHeight - i));
    printChar("#", i);
    printChar(" ", 2);
    printChar("#", i);
    printChar(" ", (pyramidHeight - i));
    printf("\n");
  }
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

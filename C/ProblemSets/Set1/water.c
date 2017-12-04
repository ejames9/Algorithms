/*
water.c

a program that prompts the user for the length of his or her shower in minutes
(as a positive integer, re- prompting as needed) and then prints the equivalent
number of bottles of water a program that prompts the user for the length of
his or her shower in minutes (as a positive integer, re- prompting as needed)
and then prints the equivalent number of bottles of water.

Eric James Foster, MIT License..
*/

// Needed external libraries..
#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>



// Prototype for user input verification function...
bool isposnum( char * );

// Main..
int main( void )
{
  char minstr[16];
  int minutes;
  int bottles;

// This loop will continue prompting for valid input, a positive integer,
// until the user provides it...
  while (!isposnum(minstr))
  {
    printf("How long, in minutes, is your typical shower? ");
// This function replaces scanf(), which I had problems getting to work,
// taking a string from stdin, and storing int in it's first arg...
    fgets(minstr, 16, stdin);

// If `minstr` has letters, or is a negative number, let the user know what
// is needed..
    if (!isposnum(minstr))
    {
      printf("RETRY: Please enter a positive integer!\n");
    }
  }
// Convert user's numeric input from a string to an integer, for computation..
  minutes = atoi(minstr);
// Compute result...
  bottles = minutes * 12;
// Return result to stdout.
  printf("Holy schmoligans! That's %d bottles of water!\n\n", bottles);

// Return main function successfully.
  return 0;
}

// User input validation function. Returns true if the string `input` contains
// no alphabetical chars && is a positive integer..
bool isposnum( char *input )
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

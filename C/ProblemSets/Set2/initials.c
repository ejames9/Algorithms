/*
initials.c

A program that prompts a user for their name, and then outputs their initials
in uppercase with no spaces or periods, followed by a newline ( \n ).

Eric James Foster, MIT License..
*/

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <ctype.h>


bool nameHasNumber();
void initializer();

void split( char str[], char on[2], char *names[] );

// The main thread...
int main()
{
  char name[128] = "0";
  
// Input prompt/validation loop...
  while (nameHasNumber(name))
  {
    // printf("Name: ");
// Used fgets() here, scanf only recorded first word before any spaces...
    fgets(name, 128, stdin);
  }
// Meat and potatos... Converts given name string to uppercase initials with
// no spaces between...
  initializer(name);
}

// User input verification function. Will return true if the user entered a
// number into the `name` string...
bool nameHasNumber( char *name )
{
  for (int i = 0; i < strlen(name); i++)
  {
    if (isdigit(name[i]))
    {
      return true;
    }
  }
  return false;
}

// This function takes a name input `n`, and outputs the uppercase initials
// of the given name...
void initializer( char *n )
{
// A pointer to an array of strings that will hold a user's input first,
// last, and possibly middle names...
  char *namesArray[5];

// Use this convenience function to split the given string into separate names
// using the second argument separator. The 3rd argument, `namesArray`, will
// hold the array...
  split(n, " ", namesArray);

// Iterate through the array of names...
  for (int i = 0; namesArray[i] != '\0'; i++)
  {
// Print the uppercased first letter of every name..
    printf("%c", toupper(namesArray[i][0]));
  }
  printf("\n");
}

// String splittin' function.. Splits a given string `str`, on the given
// chars `on`...
void split( char *str, char on[2], char *names[] )
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

/*
credit.c

A program that prompts the user for a credit card number, and then reports
(via printf()) whether it is a valid American Express, MasterCard or Visa
card number.

Eric James Foster, MIT License..
*/



#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>


// Numeric validation function prototype...
bool isPositiveInt( char * );
bool isValidCreditCard( char * );

// The main thread...
int main ( int argc, char *argv[] )
{
  char ccNumberString[32];
  char *ccNumberString2 = "";

// If user input more than 2 arguments..
  if (argc > 2)
  {
    printf("ERROR!: You've provided too many arguments.");
// Exit with error code 1.c
    return 1;
  }
// If user input less than 2 arguments..
  if (argc < 2)
  {
    printf("Please provide a credit card number for validation: ");
// Prompt for input again...
    scanf("%s", ccNumberString);
    // printf("%s", ccNumberString);
  }
  else
  {
// Set variable to command-line argument. It will hold the cc number...
    ccNumberString2 = argv[1];
  }
// Entering the input validation loop. If either the scanf user string, or the
// command-line arg string are invalid, the user will be prompted again...
  while (!isPositiveInt(ccNumberString) && !isPositiveInt(ccNumberString2))
  {
    printf("ERROR: The credit card number you've entered is illogical. Please try again: ");
    scanf("%s", ccNumberString);
  }
// Update the user..
  printf("Thank You.\n\n");
  printf("Validating card number......\n\n");

// This is where the validation takes place.. Both user var possibilities are
// tested. If either contain a valid cc number, the user is notified..
  if (isValidCreditCard(ccNumberString) || isValidCreditCard(ccNumberString2))
  {
    printf("SUCCESS: Your card number has been verified :)\n\n");
    return 0;
  }
  else
  {
    printf("FAILURE: Sorry, your card number could not be validated :(\n\n");
    return 1;
  }
}

// User input validation function. Returns true if the string `input` contains
// no alphabetical chars && is a positive integer..
bool isPositiveInt( char *input )
{
  char *end;

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
// Convert user input from string to long long int..
  long long int llccNumberString2ber = strtoll(input, &end, 0);
// If no alpha chars are found, verify that the integer value given is > 1..
  if (llccNumberString2ber < 1)
  {
// Otherwise return the function, false.
    return false;
  }
// If the function gets to this point, the input is valid, and verified by
// returning the function with a boolean value of true.
  return true;
}

// The actual credit card number validation function. The function takes a
// card number in the form of a string, and returns true if the card is valid,
// and false otherwise...
bool isValidCreditCard( char *number )
{
  int doubl;
  int others;
  int sum = 0;
//

// Loop through the cc number string, and begin the validation algorithm... We
// are beginning at the second to last num, and decrementing every other until
// 0 is reached.
  for (int i = strlen(number) - 2; i >= 0; i -= 2)
  {
    char x = number[i];
    int s = 0;
    char c;

// Convert number to int and double..
    doubl = atoi(&x) * 2;

// If the result is greater than 9...
    if (doubl > 9)
    {
      char dub[3];
// Convert the integer back into a string...
      sprintf(dub, "%d", doubl);

// Loop through the individual digits of the 2 digit number..
      for (int j = 0; j < strlen(dub); j++)
      {
// Add both digits to sum `s`...
        c = dub[j];
        s += atoi(&c);
      }
// Set doubl var to `s` to simplify summing of the doubles...
      doubl = s;
    }
// Sum the doubles...
    sum += doubl;
  }
// Loop through the remaining digits of the cc number, beginning at the last
// digit, and decrementing every other digit.
  for (int i = strlen(number) - 1; i >= 0; i -= 2)
  {
// Get a char for each digit in the string, convert to an int and add
// to sum `others`...
    char x = number[i];
    others += atoi(&x);
  }
// If the sum of doubles and others is divisible by 10...
  if ((sum + others) % 10 == 0)
  {
// return true to validate the credit card number.
    return true;
  }
  else
  {
// Otherwise, return false to invalidate the number.
    return false;
  }
}

/*
ceasersCipher.c

This algorithm functions as a cipher, where the values of the letters are
shifted by a given number of places `key`. This file also contains a function
`decipher`, which decodes the encodes string.

Eric James Foster, MIT License..
*/


// External Libraries...
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>


// Global variables..
int cipher(int key);
int decipher(int key);
char ptext[128];
char *str;


// The function..
int main(int argc, char * argv[]) {
//
    if (argc > 2) {
      printf("You've provided too many arguments.\n\n");
      return 1;
    }
    if (argc < 2) {
      printf("You must provide a cipher key.\n\n");
      return 1;
    }
    if (argv[0] < 0) {
      printf("You must provide a positive integer for the cipher key.");
    }

// Convert arg list item to integer..
    int key = atoi(argv[1]);

// Call the cipher function... It will encipher the user given text by the
// key amount..
    cipher(key);
    printf("%s\n", str);
// decipher the text..
    decipher(key);
    printf("%s\n", str);
}


// The enciphering function...
int cipher(int key) {
//
  int index;
  char text[128];

// Prompt user for textual input..
  printf("Please input a string to encipher: \n\n");
  fgets(text, 128, stdin);

// Loop through the characters of the text..
  for (int i = 0; i < strlen(text); i++) {
// If the char is alphabetical..
    if (isalpha(text[i])) {
// and upper case..
      if (isupper(text[i])) {
// Add the ascii value of the char to the key...
        index = text[i] + key;
// If a character value is greater than 90, it will enter this while loop to
// loop back to A..
        while (index > 90) {
/* Add to 64 (the 0th letter index) the diff between the current value and 90..
this loop will continue until an acceptable value is reached, in the case
that a user entered a key value greater than 26...
 */
          index = 64 + index - 90;
        }
// The char is lowercase..
      } else {
        index = text[i] + key;
// Same loop as above, only for lowercase values...
        while (index > 122) {
          index = 96 + index - 122;
        }
      }
      text[i] = index;
    }
  }
  strcpy(ptext, text);
// Set global `str` to text value.
  str = text;
// All is grand..
  return 0;
}

// The deciphering function...
int decipher(int key) {
//
  int index;

// Loop through the characters of the text..
  for (int i = 0; i < strlen(ptext); i++) {
    if (isalpha(ptext[i])) {
// -------
      if (isupper(ptext[i])) {
// The below is a reversal of the ciphering algorithm....
        index = ptext[i] - key;
// -------
        while (index < 65) {
// NOTE: We are subtracting from 91 to represent the movement from 65 to 90.
// i.e, 91 = 65 in the ascii table, essentially...
          index = 91 - (65 - index);
        }
      } else {
        index = ptext[i] - key;
        while (index < 97) {
          index = 123 - (97 - index);
        }
      }
      ptext[i] = index;
      str = ptext;
    }
  }
// All is well.
  return 0;
}

// abcdefghijklmnopqrstuvwxyz --- ABCDEFGHIJKLMNOPQRSTUVWXYZ

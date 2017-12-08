/*
crack.c

A program that takes a DES encrypted password as a command-line argument,
cracks and returns it to stdout in plaintext...

Eric James Foster, MIT License..
*/


#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>

// Import local modules...
#include "users.h"
#include "funcs.h"
#include "helper.c"
// Import popular, and dictionary based, password/ciphertext databases...
// #include "cipherTexts50.h"
#include "cipherTexts.h"

// We have 10 users stored...
#define USERS 10

// The list of possible chars for the ciphertext...
char *ascii =
{
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./"
};

// Function builds database of user id's and ciphertexts..
void buildUserDatabase();
// CipherText validation boolean...
bool isValidCipherText();

// The main thread...
int main( int argc, char * argv[] )
{
  char *cipherText;
  char buffer[14];
  char salt[3];

  FILE *passwrd;
  user users[USERS];

// Opening dialogue. If ciphertext is not given via CL argument, prompt the
// user now..
  if (argc < 2)
  {
    do
    {
      printf("Please provide a ciphertext to decipher: ");
      scanf("%s" , buffer);
    }
// Continually prompt the user until they provide a valid ciphertext...
    while (!isValidCipherText(buffer));
  }
  else
  {
// Store the command-line argument..
    cipherText = argv[1];
// Copy the string into a char list buffer so it may be validated..
    strcpy(buffer, cipherText);

// Validate the ciphertext..
    if (!isValidCipherText(buffer))
    {
// TODO: Need to figure out a way not to have to repeat myself here...
      do
    {
      printf("Please provide a ciphertext to decipher: ");
      scanf("%s" , buffer);
    }
    while (!isValidCipherText(buffer));
    }
  }

//
  printf("Thanks......\n\n");
  printf("Cracking CipherText...\n\n");
  printf("This could take a while...............\n\n");

  printf("salt: %s\n", strncpy(salt, buffer, 2));
  //


// Crack the mofo...


// Open password file...
  // passwrd = fopen("./passwd.txt", "r");

// Build user database...
  // buildUserDatabase(passwrd, users);

  // fclose(passwrd);
  return 0;
}


// This function takes a string as input and verifies whether or not it is
// of valid ciphertext form...
bool isValidCipherText( char *ciphertext )
{
//
  int cipherLen = strlen(ciphertext);
  int asciiLen = strlen(ascii);

//
  if (cipherLen == 13 || cipherLen == 14)
  {
//
    for (int i = 0; i < cipherLen; i++)
    {
      int j = 0;
//
      while (!isSameChar(ciphertext[i], ascii[j]))
      {
//
        if (j == 64)
        {
          return false;
        }
        j++;
      }
    }
    return true;
  }
  return false;
}


// This function takes the passwd file, parses it, and loads the given second
// argument array `users`, with user structs...
void buildUserDatabase( FILE *passwd, user users[USERS] )
{
  char str[32];
  char *usrs[3];
  user x;

// The user counter...
  int u = 0;
// Loop through the passwd file grabbing one line at a time...
  while (fgets(str, 32, passwd) != NULL)
  {

// Eliminate newline char from `str`...
    str[(strlen(str) - 1)] = '\0';

// Split the string on the colon, and put the name and ciphertext into an
// array of size 2...
    split(str, ":", usrs);

// Build the user struct
    strcpy(x.name, usrs[0]);
    strcpy(x.ciphertext, usrs[1]);
// Set salt value..
    for (int i = 0; i < 3; i++)
      x.salt[i] = x.ciphertext[i];
    x.salt[2] = '\0';

// Append the user struct to the users array...
    users[u] = x;
// Reset name value to get rid of garbage values..
    memset(x.name, '\0', 10);
// increment user count...
    u++;
  }
}

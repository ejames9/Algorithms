/*
cracker.c

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
#include <math.h>

// Import local modules...
#include "users.h"
#include "funcs.h"

// Import popular, and dictionary based, password/ciphertext databases...
#include "cipherTexts.c"

// We have 10 users stored...
#define USERS 10

// The list of possible chars for the ciphertext...
char *ascii =
{
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./"
};

// The list of possible chars for the password...
char *asciiPrintable =
{
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./?!@#$%^&*+=:;<>{}[]()|\\,-_"
};

// An alphanueric list of possible chars for the password. I will use this first,
// I believe an incredibly high percentage of passwords use this char set only,
// so cutting out the additional chars will save time...
char *alphaNumericSet =
{
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
};


// Function builds database of user id's and ciphertexts..
void buildUserDatabase();
// CipherText validation boolean...
bool isValidCipherText();
// Define function that compares the given ciphertext against those of the
// top 1000 user passwords.
bool amongTop1000();
// Define a brute force attack function...
bool brutus();

// The main thread...
int main( int argc, char * argv[] )
{
  char *cipherText;
  char buffer[14];
  char password[12];
  char salt[3];
  bool r;

  FILE *passwrd;
  FILE *cipherTexts;
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

// Progress Communication...
  printf("Cracking CipherText...\n\n");
  printf("\033[0;33m");
  printf("This could take a while...................................");
  printf("\033[0m");

// Crack the mofo...
// First check the cipherTexts of the top 1000 passwords...
  if (amongTop1000(buffer, password))
  {
    printf("\033[0;33mor not........\n\n");
    printf("\033[01;31mPassword Found: ");
    printf("\033[01;35m%s\n\n", password);
  }
  else
  {
    printf("\033[01;31m\n\nNot found yet, I guess I'll keep looking.......\n\n");

// Brute-force attack...
    strncpy(salt, buffer, 2);

    if (brutus(buffer, password, salt))
    {
      printf("\033[01;31m\n\nPassword Found: ");
      printf("\033[01;35m%s\n\n", password);
    }
    else
    {
      printf("\033[01;31m\n\nFuckin' A, I guess I'll keep looking.......\n\n");
    }
  }
  printf("\e[?25h");
  fflush(stdout) ;
// Open password file...
  // passwrd = fopen("./passwd.txt", "r");

// Build user database...
  // buildUserDatabase(passwrd, users);

  // fclose(passwrd);
  return 0;
}


// Alpha-numeric Brute-Force attack... To save time, this function assumes
// a passord will only use alphanumeric ascii chars....
bool brutus( char *ciphertext, char *password, char *salt )
{
  char combination[9];
  long long len = (long long)((pow(strlen(alphaNumericSet), 8)));

  printf("combination: ");
// Start the attack.. Loop through all 62^8 possibilities.. initialize a
// variable for each of the 8 password chars...
  for (int i = 0, j = 0, k = 0, l = 0, m = -1, n = -1, o = -1, p = -1; i < len; i++)
  {
    if (i == 0)
    {
      strcpy(combination, "aaaa");
    }
    else
    {
// Set the first character of the password...
      combination[0] = alphaNumericSet[i % 62];
// Using the modulo to determine if the character set needs to wrap back around
// to the beginning. The next char needs to increment every time it's
// previous does so...
      if (i % 62 == 0)
      {
        j++;
      }
// Set the second char of the password...
      combination[1] = alphaNumericSet[j % 62];
// If i is of a multiple of 64^2, increment the 3rd character...
      if (i % (int)pow(strlen(alphaNumericSet), 2) == 0)
      {
        k++;
      }
// Set the 3rd character...
      combination[2] = alphaNumericSet[k % 62];
// If i is of a multiple of 64^3, increment the 4th character...
      if (i % (int)pow(strlen(alphaNumericSet), 3) == 0)
      {
        l++;
      }
// Set the 4th...
      combination[3] = alphaNumericSet[l % 62];
// All the following conditions have been nested for performance considerations...
// If i is greater than or equal to 64^4......
      if (i >= (int)pow(strlen(alphaNumericSet), 4))
      {
// Set the 5th char...
        combination[4] = alphaNumericSet[m % 62];
// If i is of a multiple of 64^4, increment the 5th character...
        if (i % (int)pow(strlen(alphaNumericSet), 4) == 0)
        {
          m++;
        }
// If i is greater than or equal to 64^5......
        if (i >= (long)pow(strlen(alphaNumericSet), 5))
        {
// Set the 6th...
          combination[5] = alphaNumericSet[n % 62];
// If i is of a multiple of 64^5, increment the 6th character...
          if (i % (long)pow(strlen(alphaNumericSet), 5) == 0)
          {
            n++;
          }
// If i is greater than or equal to 64^6......
          if (i >= (long long)pow(strlen(alphaNumericSet), 6))
          {
// Set the 7th...
            combination[6] = alphaNumericSet[o % 62];
// If i is of a multiple of 64^6, increment the 7th character...
            if (i % (long long)pow(strlen(alphaNumericSet), 6) == 0)
            {
              o++;
            }
// If i is greater than or equal to 64^7......
            if (i >= (long long)pow(strlen(alphaNumericSet), 7))
            {
// Set the last characters...
              combination[7] = alphaNumericSet[p % 62];
              combination[8] = '\0';
// If i is of a multiple of 64^7, increment the 8th character...
              if (i % (long long)pow(strlen(alphaNumericSet), 7) == 0)
              {
                p++;
              }
            }
            else
            {
// Set the final char to string null terminating char...
              combination[7] = '\0';
            }
          }
          else
          {
            combination[6] = '\0';
          }
        }
        else
        {
          combination[5] = '\0';
        }
      }
      else
      {
        combination[4] = '\0';
      }
//
      printf("%s", combination);
      printf("\e[?25l");
      fflush(stdout);

// Now that the combination is set, use the salt to create a ciphertext, and
// compare it against the given one... If it is a match, copy the combo into
// the password variable, and return true.
      if (isSame(crypt(combination, salt), ciphertext))
      {
        strcpy(password, combination);
        return true;
      }
//
      for (int a = 0; a < strlen(combination); a++)
      {
        printf("\b");
      }
    }
  }
// If we've made it through all combinations, and still haven't found a match,
// we return false.
  return false;
}


// Implement function to compare the given ciphertext against the database
// of the top 1000 passwords ciphertexts...
bool amongTop1000( char *buffer, char *password )
{
  bool flip = true;
//
  for (int i = 0; passwds[i][0] != '\0'; i++)
  {
    if (isSame(buffer, passwds[i][1]))
    {
      strcpy(password, passwds[i][0]);
      printf("\b\b\b\b\b\b\b\b");
      return true;
    }
    else if (i % 500 == 0)
    {
      if (flip)
        printf("\033[01;31m.");
      else
        printf("\b");
    }
    if (i % 10000 == 0)
      flip = !flip;
  }
  printf("\b\b\b\b\b\b\b\b");
  return false;
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





// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 2
// 2 2 2 3
// 3 3 3 1
//
// 1 1 1 3
// 2 2 2 1
// 3 3 3 2
//
// 1 1 2 1
// 2 2 3 2
// 3 3 1 3
//
// 1 1 2 2
// 2 2 3 3
// 3 3 1 1
//
// 1 1 2 3
// 2 2 3 1
// 3 3 1 2
//
// 1 1 3 1
// 2 2 1 2
// 3 3 2 3
//
// 1 1 3 2
// 2 2 1 3
// 3 3 2 1
//
// 1 1 3 3
// 2 2 1 1
// 3 3 2 2
//
// 1 2 1 1
// 2 3 2 2
// 3 1 3 3
//
// 1 2 1 2
// 2 3 2 3
// 3 1 3 1
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3
//
// 1 1 1 1
// 2 2 2 2
// 3 3 3 3

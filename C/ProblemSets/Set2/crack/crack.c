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

// Import user struct...
#include "users.h"


// We have 10 users stored...
#define USERS 10


// The list of possible chars for the ciphertext...
char *ascii[] =
{
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "/"
};

// Function builds database of user id's and ciphertexts..
void buildUserDatabase();

// The main thread...
int main()
{
  char *cipherText;
  char buffer[11];
  char *plainText = "password";
  char *salt = "60";
  FILE *top;
  FILE *passwrd;
  user users[USERS];

// Open password file...
  passwrd = fopen("./passwd.txt", "r");

// Build user database...
  buildUserDatabase(passwrd, users);

  for (int i = 0; i < USERS; i++)
  {
    printf("%s: %s: %s\n", users[i].name, users[i].ciphertext, users[i].salt);
  }

  // top = fopen("./top1000.txt", "r");
  //
  // fgets(buffer, 11, top);
  // printf("%s", buffer);
  //
  // clock_t start = clock(), diff;
  // fgets(buffer, 11, top);
  // printf("%s", buffer);
  // cipherText = crypt(buffer, salt);
  // printf("%s\n", cipherText);
  // diff = clock() - start;
  //
  // int msec = diff * 1000 / CLOCKS_PER_SEC;
  // printf("Time taken %d seconds %d milliseconds\n", msec/1000, msec%1000);
  //
  // cipherText = crypt(plainText, salt);
  // printf("%s\n", cipherText);

}

// This function takes the passwd file, parses it, and loads the given second
// argument array `users`, with user structs...
void buildUserDatabase( FILE *passwd, user users[USERS] )
{
  char str[32];
  char n[10];
  char c[14];
  char s[3];
  user x;

// The user counter...
  int u = 0;
// Loop through the passwd file grabbing one line at a time...
  while (fgets(str, 32, passwd) != NULL)
  {
    bool flag = true;
// Loop through string chars until newline char is reached... There are 2
// separate counts, 1 for iterating through entire string, and a second beginning
// just after the semicolon for the ciphertext string...
    for (int i = 0, j = 0; str[i] != '\n'; i++)
    {
      if (flag)
      {
// Once the colon is reached flip the flag to start grabbing ciphertext chars...
        if (str[i] == ':')
        {
          flag = false;
        }
        else
        {
// Build name string one char at a time...
          x.name[i] = str[i];
        }
      }
      else
      {
// Build ciphertext string one char at a time...
        x.ciphertext[j] = str[i];
// Increment j count for ciphertext incrementation...
        j++;
      }
    }

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

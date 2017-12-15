/*
preCracker.c

Software used to create a shizload of ciphertext hashes from a collection of
common passwords, and a dictionary...

Eric James Foster, MIT License..
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <stdbool.h>

// import local module...
#include "funcs.h"

// Define a function that Takes a .txt file filled with words (i.e. common
// passwords), generates a ciphertext and creates a new text file with both
// separated by a comma...
void generateCipherTextFile( char *passwordFile, char *outputFile, char *salt);
// Define a function that will take the files created by the previous function
// and output a C header file with an array variable loaded with passwords
// and associated ciphertexts...
void generatePaswwordArrayFile( char *passwordFiles[], char *outputFile);
// Define a boolean that validates a given salt pattern..
bool isValidSalt();
// Define a boolean that validates a ciphertext pattern..
bool isValidCipherText( char *ciphertext );

// The list of possible chars for the ciphertext...
char *ascii2 =
{
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./"
};

// The main thread...
int main( int argc,  char *argv[] )
{
  char *cipherText;
  char buffer[14];
  char salt[3];
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
  strncpy(salt, buffer, 2);

  char *top1000 = "./top1000.txt";
  char *dictionary = "./dictionary.txt";
  char *topTmp = "./topCipherTexts";
  char *dictTmp = "./dictCipherTexts";
  char topCipherTexts[32];
  char dictCipherTexts[32];
  char command[42];
  char rmCommand[48];

//
  sprintf(topCipherTexts, "%s%s", topTmp, salt);
  sprintf(dictCipherTexts, "%s%s", dictTmp, salt);
  sprintf(command, "./cracker %s", buffer);
  printf("%s\n", command);
//
  char *passFiles[3] = {topCipherTexts, dictCipherTexts};

//
  printf("\033[01;35m\n\nWriting 2 support files...........................\n\n\n");

// Create ciphertext file from top 1000 passwords with a salt of "50"...
  generateCipherTextFile(top1000, topCipherTexts, salt);

// Create ciphertext file from dictionary entries between the length of 3 and 8,
// with a salt of '50'...
  generateCipherTextFile(dictionary, dictCipherTexts, salt);

// Create a header file containing a variable, `passwds`, that holds an array
// of arrays of password/ciphertext combos..
  generatePaswwordArrayFile(passFiles, "./cipherTexts.c");

// Progress report...
  printf("\033[01;35mCleaning up........\n\n");
// Create unix command to remove temporary ciphertext files...
  sprintf(rmCommand, "rm %s %s", topCipherTexts, dictCipherTexts);
// Delete temp files...
  system(rmCommand);

// Completion report.
  printf("\033[22;32mSupporting file cipherTexts.c is complete.\n\n");
  printf("\033[01;35mCompiling with cracker application.....\n\n");
  printf("\033[0m");

// Now that the helper file is created, We can move on to part 2, the
// actual cracking of the ciphertext...
  int result = system("make -B cracker");

  if (result != 0)
  {
    printf("\033[01;31m\nERROR: There was a problem(s) compiling the cracker application.\n\n");
    printf("\033[0m");
  }
  else
  {
    printf("\033[22;32m\nCompilation Successful...........\n\n");
    printf("\033[01;35mStarting cracker.........\n\n");
    printf("\033[0m");

// Run the cracker
    system(command);
  }

// All is well.
  return 0;
}


// This function takes a string as input and verifies whether or not it is
// of valid ciphertext form...
bool isValidCipherText( char *ciphertext )
{
//
  int cipherLen = strlen(ciphertext);
  int asciiLen = strlen(ascii2);

//
  if (cipherLen == 13 || cipherLen == 14)
  {
//
    for (int i = 0; i < cipherLen; i++)
    {
      int j = 0;
//
      while (!isSameChar(ciphertext[i], ascii2[j]))
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


//Implement salt validation...
bool isValidSalt( char *salt )
{
// Store salt length..
  int saltLen = strlen(salt);
// If salt is correct length,
  if (saltLen == 2)
  {
// Loop through the 2 salt chars and verify that they contain only the provided
// ascii set...
    for (int i = 0; i < saltLen; i++)
    {
// Find, or not, the salt char..
      if (strchr(ascii2, (int)salt[i]) == NULL)
      {
        return false;
      }
    }
    return true;
  }
  return false;
}


// Implement ciphertext file generation function...
void generateCipherTextFile( char *passwordFile, char *outputFile, char *salt)
{
  FILE *passwords;
  FILE *ciphertexts;
  char password[16];
  char *ciphertext;
  static int f = 0;

// Open password file...
    passwords = fopen(passwordFile, "r");
    ciphertexts = fopen(outputFile, "w");

// Loop through passwords file, grabbing one word at a time, until NULL...
    while (fgets(password, 16, passwords) != NULL)
    {
// Make sure password possibilities are between 3 and 8 chars of length...
      if (strlen(password) <= 9 && strlen(password) >= 4)
      {
// Replace the newline char at the end of each word/line with a null char...
        password[(strlen(password) - 1)] = '\0';

// Generate the ciphertext using the given salt...
        ciphertext = crypt(password, salt);

// Print the password and ciphertext to the new file, comma separated.
// If returns a value less than 1, something went wrong...
        if (fprintf(ciphertexts, "%s, %s\n", password, ciphertext) < 1)
        {
// Output error message...
          printf("\033[01;31mERROR: There was a problem writing to %s.....\n\n", outputFile);
          break;
        }
      }
    }

// Report Progress...
// If this is the first file...
    if (f < 1)
    {
// Output success message with no `s` on file..
      printf("\033[22;32m1 file written.\n");
      f++;
    }
    else
// Output success message with `s` on file..
    {
      printf("\033[22;32m%d files written.\n", ++f);
    }
    printf("\033[0m");

// Close the files.
    fclose(passwords);
    fclose(ciphertexts);
}


// Implement ciphertext array variable creation function...
void generatePaswwordArrayFile( char *passwordFiles[], char *outputFile )
{
  FILE *passwords;
  FILE *output;
  char str[32];
  char *tmp[3];
  static int c = 1;

  output = fopen(outputFile, "w");
// Print this at the beginning of the file..
  fprintf(
    output, "//\n//\n//\nchar * passwds[91150][3] = {\n\t//\n\t"
  );
  printf("\033[01;35mReading from file 1\n");

  int f = 0;
// Loop through the password files...
  for (int i = 0; i < 2; i++)
  {
    passwords = fopen(passwordFiles[i], "r");
// If this is the first go-round, skip the following...
    if (f > 0)
    {
      output = fopen(outputFile, "a");
      printf("\033[01;35mReading from file %d\n\n", f + 1);
    }

    int j = 1;
// Loop through the file, getting one line at a time, until there are none left...
    while (fgets(str, 32, passwords) != NULL)
    {
      str[(strlen(str) - 1)] = '\0';
// Split the line on `, `, and store items in `tmp` array...
      split(str, ", ", tmp);
// This condition is here to print a newline for every 10 cipher pairs...
      if (j % 10 == 0)
      {
// Print a newline after array entry...
        fprintf(output,"{\"%s\", \"%s\"},\n\t", tmp[0], tmp[1]);
        j++;
      }
      else
      {
// Print normally, without a \n...
        fprintf(output,"{\"%s\", \"%s\"}, ", tmp[0], tmp[1]);
        j++;
      }
    }

    if (i > 0)
    {
// Print closing bracket...
    fprintf(output, "\n};");
    }
// Close the files and increment the f count...
    fclose(passwords);
// Close file..
    fclose(output);
//
    f++;
  }

// Progress reporting..
  printf("\033[01;35mWriting cipherTexts document..................\n");
//
  printf("\033[22;32mcipherTexts document has written successfully.\n\n");
  printf("\033[0m");
// Increment c.
  c++;
}

/*
helpers.c

Software used to create a shizload of ciphertext hashes from a collection of
common passwords, and a dictionary...

Eric James Foster, MIT License..
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

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

// The main thread...
int main()
{
  char *top1000 = "./top1000.txt";
  char *dictionary = "./dictionary.txt";
  char *passFiles[3] = {"./topCipherTexts50", "./dictCipherTexts50"};
  char *passFiles2[3] = {"./topCipherTextsHA", "./dictCipherTextsHA"};


  printf("Writing 4 files...........................\n\n\n");

// Create ciphertext file from top 1000 passwords with a salt of "50"...
  generateCipherTextFile(top1000, "./topCipherTexts50", "50");

// Create ciphertext file from top 1000 passwords with a salt of "HA"...
  generateCipherTextFile(top1000, "./topCipherTextsHA", "HA");

// Create ciphertext file from dictionary entries between the length of 3 and 8,
// with a salt of '50'...
  generateCipherTextFile(dictionary, "./dictCipherTexts50", "50");

// Create ciphertext file from dictionary entries between the length of 3 and 8,
// with a salt of 'HA'...
  generateCipherTextFile(dictionary, "./dictCipherTextsHA", "HA");

// Create a header file containing a variable, `passwds`, that holds an array
// of arrays of password/ciphertext combos..
  generatePaswwordArrayFile(passFiles, "./cipherTexts50.h");

// Create a header file containing a variable, `passwds`, that holds an array
// of arrays of password/ciphertext combos..
  generatePaswwordArrayFile(passFiles2, "./cipherTextsHA.h");

// Completion report.
  printf("SUCCESS: All files are complete.\n\n");

// All is well.
  return 0;
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
          printf("ERROR: There was a problem writing to %s.....", outputFile);
          break;
        }
      }
    }

// Report Progress...
// If this is the first file...
    if (f < 1)
    {
// Output success message with no `s` on file..
      printf("1 file written.\n");
      f++;
    }
    else
// Output success message with `s` on file..
    {
      printf("%d files written.\n", ++f);
    }

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
    output, "char * passwds[3][1001] = {\n\t//\n\t"
  );
  printf("Reading from file 1\n");

  int f = 0;
// Loop through the password files...
  for (int i = 0; i < 2; i++)
  {
    passwords = fopen(passwordFiles[i], "r");
// If this is the first go-round, skip the following...
    if (f > 0)
    {
      output = fopen(outputFile, "a");
      printf("Reading from file %d\n", f + 1);
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
// Close the files and increment the f count...
    fclose(passwords);
    fclose(output);
    f++;
  }

// Print closing bracket...
  fprintf(output, "\n}");

// Progress reporting..
  printf("Writing cipherTexts document %d...................\n", c);
//
  printf("cipherTexts document #%d has written successfully.\n", c);
// Increment c.
  c++;
}

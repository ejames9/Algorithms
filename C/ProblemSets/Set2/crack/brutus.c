/*
brutus.c

A simple program to experiment with the brute force attack. I will try to
print all 27 possible combinations of a 3 char set.

Eric James Foster, MIT License (Not that anyone should care).
*/


#include <stdio.h>
#include <string.h>
#include <math.h>
#include <unistd.h>

//
void print3CharCombos();


int main()
{
  char set[4] = "top";

//
  // print3CharCombos(set);

  printf("%s\n", crypt("hEaD", "50"));
  return 0;
}

//
void print3CharCombos( char *word )
{
  char combo[4];
  int len = (int)((pow(strlen(word), strlen(word))));

//
  for (int i = 0, j = 1, k = 2; i < len; i++)
  {
    if (i == 0)
    {
      printf("\033[0;33m%s\n", word);
    }
    else
    {
      combo[0] = word[i % 3];
//
      if (i % 3 == 0)
      {
        j++;
      }
      combo[1] = word[j % 3];
//
      if (i % (int)pow(strlen(word), 2) == 0)
      {
        k++;
      }
      combo[2] = word[k % 3];
      combo[3] = '\0';
      printf("%s\n", combo);
    }
//
  }
}

/*
users.h

A header file to publicize the user struct..

Eric James Foster, MIT License..
*/


// User struct, contains user `name`, and password `ciphertext`...
typedef struct user
{
  char name[10];
  char ciphertext[14];
  char salt[3];
  char password[8];
}
user;

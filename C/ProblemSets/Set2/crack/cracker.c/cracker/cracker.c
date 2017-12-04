//
//  cracker.c
//  cracker
//
//  Created by Eric Foster on 12/3/17.
//  Copyright © 2017 Eric Foster. All rights reserved.
//
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
// #include "users.h"

typedef struct
{
    char *name;
    char *ciphertext;
    // char salt[3];
    // char password[9];
}
user;

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

int main()
{
    char *cipherText;
    char buffer[11];
    char *plainText = "password";
    char *salt = "60";
    FILE *top;
    FILE *passwrd;
    user users[USERS];
    
    
    passwrd = fopen("./passwd.txt", "r");
    
    buildUserDatabase(passwrd, users);
    
    for (int i = 0; i < USERS; i++)
    {
        printf("%s: %s\n", users[i].name, users[i].ciphertext);
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

//
void buildUserDatabase( FILE *passwd, user users[USERS])
{
    char str[32];
    char n[10];
    char c[14];
    user x;
    
    while (fgets(str, 32, passwd) != NULL)
    {
        //
        printf("%s", str);
        printf("%lu\n", strlen(str));
        //
        //
        bool flag = false;
        //
        
        for (int i = 0; i < strlen(str); i++)
        {
            if (!flag)
            {
                if (str[i] == ':')
                {
                    flag = true;
                }
                else
                {
                    n[i] = str[i];
                }
            }
            else
            {
                c[i] = str[i];
            }
        }
        printf("%s\n", n);
        printf("%s\n", c);
        memset(n, '\0', 10);
        memset(c, '\0', 14);
    }
}


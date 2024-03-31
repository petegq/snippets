#include <stdio.h>

int main(void) {
	printf("===^^===\n");
	printf("Welcome to the Decimal to Hexadecimal Converter!\n");
	printf("Enter a number:\n");
	
	int number; // declares an integer var

	scanf("%d", &number); // aquires user input

	printf("Decimal representation:		%9d\n", number);
	printf("Converted to hexadecimal:	%9X\n", number);
	
	printf("===^^===\n");

  return 0;
}
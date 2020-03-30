Bank Kata
====================================
 
### Description
This repo contains a Bank Kata written in TypeScript

 
### Problem description 
 
Create a simple bank application with the following features:

     - Deposit into Account
     - Withdraw from an Account
     - Print a bank statement to the console
 
## Acceptance criteria

Statement should have transactions in the following format:

```
  DATE       | AMOUNT  | BALANCE
  10-04-2014 | 500.00  | 1400.00
  02-04-2014 | -100.00 | 900.00
  01-04-2014 | 1000.00 | 1000.00
```

## Starting point and constraints

Start with a class the following structure:

    interface Account {
        deposit(amount: number): void;
        withdraw(amount: number): void;
        printStatement(): void;
    }




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
  10-01-2012 | 1000.00 | 1000.00
  13-01-2012 | 2000.00 | 3000.00
  14-01-2012 | -500.00 | 2500.00
```

## Starting point and constraints

Start with a class the following structure:

    interface Account {
        deposit(amount: number): void;
        withdraw(amount: number): void;
        printStatement(): void;
    }




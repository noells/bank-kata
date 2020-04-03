import {AccountFactory} from './account/AccountFactory';

const account = AccountFactory.build();

account.deposit(250);
account.withdraw(35);
account.deposit(1657);

account.printStatement();

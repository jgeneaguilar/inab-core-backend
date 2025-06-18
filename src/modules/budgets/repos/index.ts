import { AccountRepository } from './implementations/accountRepository';
import { BudgetRepository } from './implementations/budgetRepository';
import { TransactionRepository } from './implementations/transactionRepository';

const accountRepository = new AccountRepository();
const budgetRepository = new BudgetRepository();
const transactionRepository = new TransactionRepository();

export { accountRepository, budgetRepository, transactionRepository };

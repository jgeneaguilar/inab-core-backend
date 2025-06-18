import { ITransactionRepository } from 'modules/budgets/repos/interfaces/transactionRepository';

import { AccountModel } from 'infra/database/models/account.model';
import { BudgetModel } from 'infra/database/models/budget.model';
import { TransactionModel } from 'infra/database/models/transaction.model';

import Transaction from 'modules/budgets/domain/entities/transaction';
import { TransactionMapper } from 'modules/budgets/mappers/transactionMapper';
import { Guid } from 'shared/domain';

export class TransactionRepository implements ITransactionRepository {
	async exists(transactionId: Guid): Promise<boolean> {
		const transaction = await TransactionModel.exists({
			_id: transactionId.value,
		});

		return !!transaction;
	}

	async getTransactionById(transactionId: Guid): Promise<Transaction> {
		const transaction = await TransactionModel.findById(transactionId.value);

		if (!transaction) {
			throw new Error('Account not found');
		}

		return TransactionMapper.toDomain(transaction);
	}

	async save(transaction: Transaction): Promise<void> {
		const budget = await BudgetModel.findById(transaction.budgetId);

		if (!budget) {
			throw new Error('Budget not found');
		}

		const account = await AccountModel.findById(transaction.accountId);

		if (!account) {
			throw new Error('Account not found');
		}

		const newTransaction = new TransactionModel(
			TransactionMapper.toModel(transaction)
		);
		await newTransaction.save();
	}
}

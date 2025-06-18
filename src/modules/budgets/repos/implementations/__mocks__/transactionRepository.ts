import faker from '@faker-js/faker';
import Transaction from 'modules/budgets/domain/entities/transaction';
import TransactionAmount from 'modules/budgets/domain/valueObjects/transactionAmount';
import { ITransactionRepository } from 'modules/budgets/repos/interfaces/transactionRepository';
import { Guid } from 'shared/domain';

export class TransactionRepository implements ITransactionRepository {
	async exists(): Promise<boolean> {
		return true;
	}

	async getTransactionById(transactionId: Guid): Promise<Transaction> {
		const transaction = this.createTransaction(transactionId);

		return transaction;
	}

	async save(_transaction: Transaction): Promise<void> {
		// pass
	}

	private createTransaction(
		transactionId: Guid,
		budgetId?: Guid,
		accountId?: Guid
	): Transaction {
		const transactionResult = Transaction.init(
			{
				accountId: accountId || new Guid(faker.datatype.uuid()),
				amount: TransactionAmount.init({ value: faker.datatype.number() })
					.value,
				budgetId: budgetId || new Guid(faker.datatype.uuid()),
			},
			transactionId
		);

		return transactionResult.value;
	}
}

import Transaction from 'modules/budgets/domain/entities/transaction';
import { Guid } from 'shared/domain';

export interface ITransactionRepository {
	exists(transactionId: Guid): Promise<boolean>;
	getTransactionById(transactionId: Guid): Promise<Transaction>;

	save(transaction: Transaction): Promise<void>;
}

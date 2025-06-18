import Transaction from 'modules/budgets/domain/entities/transaction';
import { Guid } from 'shared/domain';

export class TransactionMapper {
	public static toDTO(transaction: Transaction) {
		return {
			accountId: transaction.accountId,
			amount: transaction.amount,
			budgetId: transaction.budgetId,
		};
	}

	public static toModel(transaction: Transaction) {
		return {
			_id: transaction.id.value,

			accountId: transaction.accountId,

			amount: transaction.amount,

			budgetId: transaction.budgetId,
		};
	}

	public static toDomain(transaction: any): Transaction | null {
		const transactionResult = Transaction.init(
			{
				accountId: transaction.accountId,
				amount: transaction.amount,
				budgetId: transaction.budgetId,
			},
			new Guid(transaction._id)
		);

		return transactionResult.isSuccess ? transactionResult.value : null;
	}
}

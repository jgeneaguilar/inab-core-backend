import Account from 'modules/budgets/domain/entities/account';
import { Guid } from 'shared/domain';

export class AccountMapper {
	public static toDTO(account: Account) {
		return {
			id: account.id.value,
			budgetId: account.budgetId.value,
			name: account.name,
		};
	}

	public static toDomain(account: any): Account {
		const accountResult = Account.init({
			name: account.name,

			balance: 0,

			budgetId: new Guid(account.budgetId),
		});

		return accountResult.isSuccess ? accountResult.value : null;
	}

	public static toModel(account: Account): any {
		return {
			_id: account.id.value,

			budgetId: account.budgetId.value,

			name: account.name,
		};
	}
}

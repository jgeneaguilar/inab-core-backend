import { Guid } from 'shared/domain';

import Budget from 'modules/budgets/domain/entities/budget';
import Accounts from 'modules/budgets/domain/valueObjects/accounts';
import { IBudgetRepository } from 'modules/budgets/repos/interfaces/budgetRepository';
import faker from '@faker-js/faker';

export class BudgetRepository implements IBudgetRepository {
	async exists(): Promise<boolean> {
		return true;
	}

	async getBudgetById(budgetId: Guid): Promise<Budget> {
		const mockBudgetResult = Budget.init(
			{
				name: faker.finance.accountName(),
				accounts: Accounts.init([]),
				ownerId: new Guid(faker.datatype.uuid()),
			},
			budgetId
		);

		return mockBudgetResult.value;
	}

	async save(): Promise<void> {
		// pass
	}
}

import Accounts from './accounts';
import Account from 'modules/budgets/domain/entities/account';

import faker from '@faker-js/faker';
import { Guid } from 'shared/domain';

describe('Accounts', () => {
	it('should accept an array of accounts', () => {
		const accounts = Accounts.init([]);

		expect(accounts).toBeDefined();
	});

	it('should set the initial value of accounts', () => {
		const account = Account.init({
			budgetId: Guid.init(),
			name: faker.finance.accountName(),
			balance: faker.datatype.number({ precision: 0.01 }),
		}).value;

		const accounts = Accounts.init([account]);

		expect(accounts.items).toHaveLength(1);
		expect(accounts.items[0]).toEqual(account);
	});
});

import { CreateAccount, ICreateAccountDTO } from './CreateAccount';

import { AccountRepository } from 'modules/budgets/repos/implementations/accountRepository';
import { BudgetRepository } from 'modules/budgets/repos/implementations/budgetRepository';

import faker from '@faker-js/faker';
import { accountRepository, budgetRepository } from 'modules/budgets/repos';

jest.mock('modules/budgets/repos/implementations/accountRepository');
jest.mock('modules/budgets/repos/implementations/budgetRepository');

describe('Create Account', () => {
	const createAccountUseCase = (
		budgetRepository?: BudgetRepository,
		request?: Partial<ICreateAccountDTO>
	) => {
		const defaultRequest = {
			name: faker.finance.accountName(),
			balance: faker.datatype.number({ precision: 0.01 }),
			budgetId: faker.datatype.uuid(),
		};

		const _request = { ...defaultRequest, ...request };

		const _accountRepository = new AccountRepository();
		const _budgetRepository = budgetRepository || new BudgetRepository();

		const createAccount = new CreateAccount(
			_accountRepository,
			_budgetRepository
		);

		return {
			budgetRepository: _budgetRepository,
			createAccount,
			request: _request,
		};
	};

	describe('execute', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should create an account', async () => {
			const { createAccount, request } = createAccountUseCase();

			const accountResult = await createAccount.execute(request);

			expect(accountResult.isSuccess).toBeTruthy();
			expect(accountResult.value).toBeDefined();
		});

		it('should return failed result when budgetId does not exist', async () => {
			const { createAccount, budgetRepository, request } =
				createAccountUseCase();

			jest.spyOn(budgetRepository, 'exists').mockResolvedValueOnce(false);

			const accountResult = await createAccount.execute(request);

			expect(accountResult.isSuccess).toBeFalsy();
			expect(accountResult.error).toBeDefined();
		});

		it('should not call save when initializing account has failed', async () => {
			const { createAccount, request } = createAccountUseCase(undefined, {
				name: '',
			});

			const saveAccountSpy = jest
				.spyOn(budgetRepository, 'save')
				.mockImplementation();

			await createAccount.execute(request);

			expect(saveAccountSpy).not.toHaveBeenCalled();
		});

		it('should return failed Result when saving throws an error', async () => {
			jest.spyOn(accountRepository, 'save').mockImplementation(() => {
				throw new Error();
			});

			const { createAccount, request } = createAccountUseCase();

			const accountResult = await createAccount.execute(request);

			expect(accountResult.isFailure).toBeTruthy();
		});
	});
});

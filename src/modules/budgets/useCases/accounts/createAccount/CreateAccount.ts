import { Result } from 'shared/core/Result';
import { Guid, UseCase } from 'shared/domain';

import Account from 'modules/budgets/domain/entities/account';
import { IAccountRepository } from 'modules/budgets/repos/interfaces/accountRepository';
import { IBudgetRepository } from 'modules/budgets/repos/interfaces/budgetRepository';

import { Guard } from 'shared/core/guards/Guard';
import { accountRepository } from 'modules/budgets/repos';
import { Service } from 'typedi';
import CreateAccountFactory from './CreateAccountFactory';

export interface ICreateAccountDTO {
	name: string;
	budgetId: string;
	balance: number;
}

type CreateAccountResponse = Result<Account | undefined>;

@Service({ factory: CreateAccountFactory })
export class CreateAccount
	implements UseCase<ICreateAccountDTO, CreateAccountResponse>
{
	private budgetRepository: IBudgetRepository;
	private accountRepository: IAccountRepository;

	constructor(
		accountRepository: IAccountRepository,
		budgetRepository: IBudgetRepository
	) {
		this.accountRepository = accountRepository;
		this.budgetRepository = budgetRepository;
	}

	async execute(request: ICreateAccountDTO): Promise<CreateAccountResponse> {
		const budgetId = new Guid(request.budgetId);

		try {
			const budget = await this.budgetRepository.exists(budgetId);
			Guard.isFalsy(budget, 'Budget');
		} catch (err) {
			return Result.fail(err as Error);
		}

		const accountResult = Account.init({
			budgetId: budgetId,
			name: request.name,
			balance: request.balance,
		});

		if (accountResult.isFailure) {
			return accountResult;
		}

		try {
			accountRepository.save(accountResult.value);
			return accountResult;
		} catch (err) {
			return Result.fail(err as Error);
		}
	}
}

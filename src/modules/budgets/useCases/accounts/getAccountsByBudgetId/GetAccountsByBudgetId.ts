import Accounts from 'modules/budgets/domain/valueObjects/accounts';
import { AccountRepository } from 'modules/budgets/repos/implementations/accountRepository';
import { IAccountRepository } from 'modules/budgets/repos/interfaces/accountRepository';
import { Result } from 'shared/core/Result';
import { Guid, UseCase } from 'shared/domain';
import { Service } from 'typedi';
import GetAccountsByBudgetIdFactory from './GetAccountsByBudgetIdFactory';

export interface IGetAccountsByBudgetIdDTO {
	budgetId: string;
}

type GetAccountsByBudgetIdResponse = Result<Accounts>;

@Service({
	factory: GetAccountsByBudgetIdFactory,
})
export class GetAccountsByBudgetId
	implements UseCase<IGetAccountsByBudgetIdDTO, GetAccountsByBudgetIdResponse>
{
	private accountRepository: IAccountRepository;

	constructor(accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
	}

	async execute(
		request?: IGetAccountsByBudgetIdDTO
	): Promise<GetAccountsByBudgetIdResponse> {
		const budgetId = new Guid(request.budgetId);

		try {
			const accounts = await this.accountRepository.getAccountsByBudgetId(
				budgetId
			);

			return Result.ok(accounts);
		} catch (err) {
			return Result.fail(err as Error);
		}
	}
}

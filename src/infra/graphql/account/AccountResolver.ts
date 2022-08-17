import { AccountMapper } from 'modules/budgets/mappers/accountMapper';
import { CreateAccount } from 'modules/budgets/useCases/accounts/createAccount/CreateAccount';

import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import AccountType from './types/AccountType';

@Service()
@Resolver(AccountType)
export default class AccountResolver {
	constructor(private readonly createAccountUseCase: CreateAccount) {}

	@Mutation(() => AccountType)
	async createAccount(
		@Arg('name') name: string,
		@Arg('budgetId') budgetId: string,
		@Arg('balance') balance: number
	) {
		const account = await this.createAccountUseCase.execute({
			name,
			budgetId,
			balance,
		});

		if (account.isFailure) {
			throw account.error;
		}

		return AccountMapper.toDTO(account.value);
	}
}

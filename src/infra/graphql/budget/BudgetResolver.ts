import {
	Arg,
	Resolver,
	Query,
	Mutation,
	FieldResolver,
	Root,
} from 'type-graphql';

import { Service } from 'typedi';

import BudgetType from './types/BudgetType';

import { AccountMapper } from 'modules/budgets/mappers/accountMapper';
import { BudgetMapper } from 'modules/budgets/mappers/budgetMapper';
import { CreateBudget } from 'modules/budgets/useCases/budget/createBudget/CreateBudget';
import { GetAccountsByBudgetId } from 'modules/budgets/useCases/accounts/getAccountsByBudgetId/GetAccountsByBudgetId';
import { GetBudget } from 'modules/budgets/useCases/budget/getBudget/GetBudget';

import { Guid } from 'shared/domain';

@Service()
@Resolver(BudgetType)
export default class BudgetResolver {
	constructor(
		private readonly getBudgetUseCase: GetBudget,
		private readonly createBudgetUseCase: CreateBudget,
		private readonly getAccountsByBudgetIdUseCase: GetAccountsByBudgetId
	) {}

	@Query(() => BudgetType)
	async budget(@Arg('budgetId') budgetId: string) {
		const budget = await this.getBudgetUseCase.execute({
			budgetId: new Guid(budgetId),
		});

		if (budget.isFailure) {
			throw budget.error;
		}

		return BudgetMapper.toDTO(budget.value);
	}

	@FieldResolver()
	async accounts(@Root() budget: BudgetType) {
		const accountsResult = await this.getAccountsByBudgetIdUseCase.execute({
			budgetId: budget.id,
		});

		if (accountsResult.isFailure) {
			throw accountsResult.error;
		}

		return accountsResult.value.items.map((acc) => AccountMapper.toDTO(acc));
	}

	@Mutation(() => BudgetType)
	async createBudget(
		@Arg('name') name: string,
		@Arg('ownerId') ownerId: string
	) {
		const budget = await this.createBudgetUseCase.execute({ name, ownerId });

		if (budget.isFailure) {
			throw budget.error;
		}

		return BudgetMapper.toDTO(budget.value);
	}
}

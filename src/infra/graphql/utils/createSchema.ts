import AccountResolver from '../account/AccountResolver';
import BudgetResolver from '../budget/BudgetResolver';

import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

export const createSchema = () =>
	buildSchema({
		resolvers: [BudgetResolver, AccountResolver],
		container: Container,
	});

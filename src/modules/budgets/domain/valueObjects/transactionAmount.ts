import { Result } from 'shared/core/Result';

interface TransactionAmountProps {
	value: number;
}

export default class TransactionAmount {
	private props: TransactionAmountProps;

	private constructor(props: TransactionAmountProps) {
		this.props = props;
	}

	public static init(props: TransactionAmountProps): Result<TransactionAmount> {
		// TODO: add guards
		return Result.ok(new TransactionAmount(props));
	}

	get amount(): number {
		return this.props.value;
	}
}

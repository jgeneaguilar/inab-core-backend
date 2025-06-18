import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
	accountId: { type: Schema.Types.ObjectId, ref: 'account' },

	amount: { type: Number, require: true },

	budgetId: { type: Schema.Types.ObjectId, ref: 'budget' },
});

export const TransactionModel = mongoose.model(
	'transaction',
	transactionSchema
);

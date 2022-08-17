export class Guard {
	static isNotNullOrUndefined(
		value: unknown,
		valueType: string
	): Error | undefined {
		if (value === null || value === undefined) {
			return new Error(`${valueType} is null or undefined.`);
		}
	}
	static isFalsy(value: boolean, valueType: string) {
		if (!value) {
			throw new Error(`${valueType} is falsy.`);
		}
	}
}

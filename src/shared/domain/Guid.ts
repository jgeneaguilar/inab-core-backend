import { ObjectId } from 'bson';

export class Guid {
	_id: ObjectId;

	constructor(value?: string | ObjectId) {
		if (value instanceof ObjectId) {
			this._id = new ObjectId(value);
			return;
		}

		this._id = ObjectId.isValid(value) ? new ObjectId(value) : new ObjectId();
	}

	get value(): string {
		return this._id.toString();
	}

	static init(): Guid {
		return new Guid(new ObjectId().toString());
	}
}

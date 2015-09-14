abstract class AbstractError extends Error {
	public message:string;

	get name():string { return 'AbstractError'; }

	constructor( message:string ) {
		super( message );
		this.message = message;
	}

	toString() {
		return this.name + ':' + this.message;
	}
}

export default AbstractError;
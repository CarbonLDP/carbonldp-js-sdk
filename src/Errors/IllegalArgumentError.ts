import AbstractError from "./AbstractError";

class IllegalArgumentError extends AbstractError {
	get name():string { return "IllegalArgumentError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, IllegalArgumentError.prototype );
	}
}

export default IllegalArgumentError;

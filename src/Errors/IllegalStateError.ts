import AbstractError from "./AbstractError";

class IllegalStateError extends AbstractError {
	get name():string { return "IllegalStateError"; }

	constructor( message:string = "" ) {
		super( message );
	}
}

export default IllegalStateError;

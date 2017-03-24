import AbstractError from "./AbstractError";

export class IllegalActionError extends AbstractError {
	get name():string { return "IllegalActionError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, IllegalActionError.prototype );
	}
}

export default IllegalActionError;

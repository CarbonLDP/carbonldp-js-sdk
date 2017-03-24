import AbstractError from "./AbstractError";

export class IDAlreadyInUseError extends AbstractError {

	get name():string { return "IDAlreadyInUseError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, IDAlreadyInUseError.prototype );
	}
}

export default IDAlreadyInUseError;

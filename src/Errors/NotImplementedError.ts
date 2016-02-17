import AbstractError from "./AbstractError";

class NotImplementedError extends AbstractError {
	get name():string { return "NotImplementedError"; }

	constructor( message:string = "" ) {
		super( message );
	}
}

export default NotImplementedError;

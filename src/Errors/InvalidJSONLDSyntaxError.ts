import AbstractError from "./AbstractError";

class InvalidJSONLDSyntaxError extends AbstractError {
	get name():string { return "InvalidJSONLDSyntaxError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, InvalidJSONLDSyntaxError.prototype );
	}
}

export default InvalidJSONLDSyntaxError;

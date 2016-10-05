abstract class AbstractError extends Error {
	public message:string;

	get name():string { return "AbstractError"; }

	constructor( message:string ) {
		super( message );
		if( "captureStackTrace" in Error ) Error.captureStackTrace( this, this.constructor );
		this.message = message;
	}

	toString():string {
		return this.name + ": " + this.message;
	}
}

export default AbstractError;

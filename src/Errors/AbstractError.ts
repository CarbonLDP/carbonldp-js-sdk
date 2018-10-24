/**
 * Class that works as template for the custom errors in the SDK.
 */
export abstract class AbstractError extends Error {
	message:string;

	get name():string { return "AbstractError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, new.target.prototype );

		if( "captureStackTrace" in Error ) Error.captureStackTrace( this, this.constructor );
	}

}

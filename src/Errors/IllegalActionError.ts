import AbstractError from "./AbstractError";

export class Class extends AbstractError {
	get name():string { return "IllegalActionError"; }

	constructor( message:string ) {
		super( message );
		Object.setPrototypeOf( this, Class.prototype );
	}
}

export default Class;

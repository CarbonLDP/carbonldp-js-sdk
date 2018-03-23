import { AbstractError } from "./AbstractError";

export class IllegalStateError extends AbstractError {
	get name():string { return "IllegalStateError"; }

	constructor( message?:string ) {
		super( message );
	}
}

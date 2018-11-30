import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that an action is not yet implemented.
 */
export class NotImplementedError extends AbstractError {
	get name():string { return "NotImplementedError"; }

	constructor( message?:string ) {
		super( message );
	}
}

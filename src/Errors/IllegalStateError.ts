import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that a task can't be completed because of the lack of pre-required configuration or execution of previous tasks.
 */
export class IllegalStateError extends AbstractError {
	get name():string { return "IllegalStateError"; }

	constructor( message?:string ) {
		super( message );
	}
}

import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that an action not allowed was attempted.
 */
export class IllegalActionError extends AbstractError {
	get name():string { return "IllegalActionError"; }
}

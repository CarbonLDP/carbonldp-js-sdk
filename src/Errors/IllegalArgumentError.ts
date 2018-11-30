import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that a different argument than the expected was provided.
 */
export class IllegalArgumentError extends AbstractError {
	get name():string { return "IllegalArgumentError"; }
}

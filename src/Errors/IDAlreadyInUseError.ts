import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that an identifier (ID) is already in use.
 */
export class IDAlreadyInUseError extends AbstractError {
	get name():string { return "IDAlreadyInUseError"; }
}

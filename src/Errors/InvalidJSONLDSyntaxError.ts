import { AbstractError } from "./AbstractError";

/**
 * Error class to indicate that there an invalid syntax in a JSON-LD object.
 */
export class InvalidJSONLDSyntaxError extends AbstractError {
	get name():string { return "InvalidJSONLDSyntaxError"; }
}

import { Parser } from "./Parser";

/**
 * Parser that only wraps the response body into a Promise.
 */
export class StringParser implements Parser<string> {
	/**
	 * Gets a string and returns a Promise with the same string.
	 * @param body The string to be wrapped.
	 */
	parse( body:string ):Promise<string> {
		return new Promise<string>( resolve => resolve( body ) );
	}
}

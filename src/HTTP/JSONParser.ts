import { Parser } from "./Parser";

/**
 * Wrapper class for the native `JSON.parse()` function using the `Promise` pattern.
 */
export class JSONParser implements Parser<object> {
	/**
	 * Parses a JSON string into JavaScript object.
	 * @param body The JSON string to be parsed.
	 */
	parse( body:string ):Promise<object> {
		// TODO: Handle SyntaxError
		return new Promise<object>( resolve => resolve( JSON.parse( body ) ) );
	}
}

import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";
import { JSONLDProcessor } from "./JSONLDProcessor";

/**
 * Parser that normalises JSON-LD objects into a complete expanded form.
 */
export class JSONLDParser extends JSONParser implements Parser<object[]> {
	/**
	 * Parse the string provided using the {@link JSONLDProcessor.expand}` method.
	 * @param input The JSON-LD string to parse.
	 */
	parse( input:string ):Promise<object[]> {
		return super.parse( input ).then( JSONLDProcessor.expand );
	}
}

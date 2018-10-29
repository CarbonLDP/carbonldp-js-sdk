import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";

import { SPARQLRawResults } from "./RawResults";


/**
 * Class to parse SPARQL Query result to a {@link SPARQLRawResults} object.
 */
export class SPARQLRawResultsParser extends JSONParser implements Parser<SPARQLRawResults> {
	/**
	 * Parse the SPARQL Query string result to a {@link SPARQLRawResults} object.
	 * @param input The string to parse.
	 */
	parse( input:string ):Promise<SPARQLRawResults> {
		return super.parse( input ).then( object => object as SPARQLRawResults );
	}
}

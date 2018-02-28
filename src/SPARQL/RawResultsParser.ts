import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";
import { SPARQLRawResults } from "./RawResults";

export class SPARQLRawResultsParser extends JSONParser implements Parser<SPARQLRawResults> {
	parse( input:string ):Promise<SPARQLRawResults> {
		return super.parse( input ).then( object => object as SPARQLRawResults );
	}
}

export default SPARQLRawResultsParser;

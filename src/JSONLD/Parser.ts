import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";
import { JSONLDProcessor } from "./Processor";

export class JSONLDParser extends JSONParser implements Parser<object[]> {
	parse( input:string ):Promise<object[]> {
		return super.parse( input ).then( JSONLDProcessor.expand );
	}
}

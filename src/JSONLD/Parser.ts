import { Parser } from "../HTTP/Parser";
import JSONParser from "./../HTTP/JSONParser";
import Processor from "./Processor";

export class Class implements Parser<Object[]> {
	parse( input:string ):Promise<Object[]> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			return Processor.expand( parsedObject );
		} );
	}
}

export default Class;

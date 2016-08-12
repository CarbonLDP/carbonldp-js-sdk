import JSONParser from "./../HTTP/JSONParser";
import Parser from "./../HTTP/Parser";
import Processor from "./Processor";

export class Class implements Parser<any> {
	parse( input:string ):Promise<any> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			return Processor.expand( parsedObject );
		} );
	}
}

export default Class;

import Parser from "./../HTTP/Parser";
import JSONParser from "./../HTTP/JSONParser";

import RawResults from "./RawResults";

export class Class implements Parser<RawResults> {
	parse( input:string ):Promise<any> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			return <any> parsedObject;
		});
	}
}

export default Class;

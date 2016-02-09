/// <reference path="./../../typings/typings.d.ts" />

import * as jsonld from "jsonld";

import Parser from "./../HTTP/Parser";
import JSONParser from "./../HTTP/JSONParser";

import Results from "./Results";

export class Class implements Parser<Results> {
	parse( input:string ):Promise<any> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			// TODO: Add sugar
			return <any> parsedObject;
		});
	}
}

export default Class;

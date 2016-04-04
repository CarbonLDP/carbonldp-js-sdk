import * as jsonld from "jsonld";

import Parser from "./Parser";
import JSONParser from "./JSONParser";

export class Class implements Parser<any> {
	parse( input:string ):Promise<any> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			return this.expandJSON( parsedObject );
		});
	}

	private expandJSON( parsedObject:Object, options?:jsonld.ExpandOptions ):Promise<Object> {
		return new Promise( ( resolve:( result:Object ) => void, reject:( error:any ) => void ):void => {
			jsonld.expand( parsedObject, options, ( error:any, expanded:Object ):void => {
				if ( error ) {
					// TODO: Handle jsonld.expand error
					reject( error );
				}

				parsedObject = expanded;

				resolve( expanded );
			} );
		} );
	}
}

export default Class;

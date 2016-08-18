import Documents from "./../Documents";
import Error from "./Error";
import * as FreeResources from "./../FreeResources";
import HTTPParser from "./../HTTP/Parser";
import JSONLDParser from "./../JSONLD/Parser";
import * as NS from "./../NS";
import ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import Resource from "./../Resource";
import SDKContext from "./../SDKContext";
import IllegalArgumentError from "../Errors/IllegalArgumentError";

export const RDF_CLASS:string = NS.C.Class.ErrorResponse;

export const SCHEMA:ObjectSchema = {
	"errors": {
		"@id": NS.C.Predicate.error,
		"@type": "@id",
		"@container": "@set",
	},
	"requestID": {
		"@id": NS.C.Predicate.requestID,
		"@type": NS.XSD.DataType.string,
	},
	"statusCode": {
		"@id": NS.C.Predicate.httpStatusCode,
		"@type": NS.XSD.DataType.int,
	},
};

export interface Class extends Resource {
	errors:Error[];
	requestID:string;
	statusCode:number;
}

export class Util {
	static getMessage( errorResponse:Class ):string {
		let messages:string[] = [];
		for( let error of errorResponse.errors ) {
			messages.push( error.message );
		}
		return messages.join( ", " );
	}
}

export class Parser implements HTTPParser<Class> {
	parse( input:string, errorResponse:Class = <any>{} ):Promise<Class> {
		let documents:Documents = SDKContext.documents;
		let parser:JSONLDParser = new JSONLDParser();

		return parser.parse( input ).then( ( freeNodes:RDF.Node.Class[] ) => {
			let freeResources:FreeResources.Class = FreeResources.Factory.create( documents );

			for( let node of freeNodes ) {
				let resource:Resource;
				let errorResponseFound:boolean = false;
				if( RDF.Node.Util.hasType( node, RDF_CLASS ) ) {
					if( errorResponseFound ) throw new IllegalArgumentError( "The input string contains more than once c:ErrorResponse." );

					resource = freeResources.createResourceFrom( errorResponse );

					errorResponseFound = true;
				} else {
					resource = freeResources.getPointer( node[ "@id" ] );
				}

				documents.jsonldConverter.compact( node, resource, documents.getSchemaFor( node ), freeResources );
			}

			if( ! errorResponse ) throw new IllegalArgumentError( "The input string does not contains a c:ErrorResponse." );

			return errorResponse;
		} );
	}
}

export default Class;

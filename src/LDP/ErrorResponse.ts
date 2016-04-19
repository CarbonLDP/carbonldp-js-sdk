import * as Document from "./../Document";
import Error from "./Error";
import * as NS from "./../NS";
import ObjectSchema from "./../ObjectSchema";
import * as RDFDocument from "./../RDF/Document";
import RDFNode from "./../RDF/RDFNode";
import Resource from "./../Resource";
import SDKContext from "./../SDKContext";

export const RDF_CLASS:string = NS.C.Class.ErrorResponse;

export const SCHEMA:ObjectSchema = {
	"errors": {
		"@id": NS.C.Predicate.error,
		"@type": "@id",
		"@container": "@set",
	},
	"statusCode": {
		"@id": NS.C.Predicate.httpStatusCode,
		"@type": NS.XSD.DataType.int,
	},
};

export interface Class {
	errors: Error[];
	statusCode: number;
}

export class Factory {
	static create( data:string ):Promise<Class> {
		let errorResponse:Class;
		let errors:Error[] = [];
		let parser:RDFDocument.Parser = new RDFDocument.Parser();
		let pointerLib:Document.Class = Document.Factory.create();

		return parser.parse( data ).then( ( parsedData:RDFDocument.Class[] ) => {
			if ( parsedData.length === 0 ) return null;

			let nodes:RDFNode[] = parsedData[ 0 ][ "@graph" ];
			for ( let node of nodes ) {

				let compacted:Resource = <any> {};
				SDKContext.documents.compact( node, compacted, pointerLib );

				if ( compacted.types.indexOf( RDF_CLASS ) !== -1 ) {
					errorResponse = <any> compacted;
				} else {
					errors.push( <any> compacted );
				}

				delete compacted.id;
				delete compacted.types;
			}

			errorResponse.errors = errors;
			return errorResponse;
		});
	}
}

export class Utils {
	static getMessage( errorResponse:Class ):string {
		let messages:string[] = [];
		for ( let error of errorResponse.errors ) {
			messages.push( error.message );
		}
		return messages.join( ", " );
	}
}

export default Class;

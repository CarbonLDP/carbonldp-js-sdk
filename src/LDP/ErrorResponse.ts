import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
import Error from "./Error";

export const RDF_CLASS:string = C.ErrorResponse;

export const SCHEMA:ObjectSchema = {
	"errors": {
		"@id": C.error,
		"@type": "@id",
		"@container": "@set",
	},
	"requestID": {
		"@id": C.requestID,
		"@type": XSD.string,
	},
	"statusCode": {
		"@id": C.httpStatusCode,
		"@type": XSD.int,
	},
};

export interface Class extends Resource {
	errors:Error[];
	requestID:string;
	statusCode:number;
}

export class Util {
	static getMessage( errorResponse:Class ):string {
		return errorResponse
			.errors
			.map( error => error.errorMessage )
			.join( ", " );
	}
}

export default Class;

import Error from "./Error";
import * as NS from "../Vocabularies/index";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";

export const RDF_CLASS:string = NS.C.ErrorResponse;

export const SCHEMA:ObjectSchema = {
	"errors": {
		"@id": NS.C.error,
		"@type": "@id",
		"@container": "@set",
	},
	"requestID": {
		"@id": NS.C.requestID,
		"@type": NS.XSD.string,
	},
	"statusCode": {
		"@id": NS.C.httpStatusCode,
		"@type": NS.XSD.int,
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

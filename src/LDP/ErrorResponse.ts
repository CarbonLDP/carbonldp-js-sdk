import Error from "./Error";
import * as NS from "./../NS";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";

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
		return errorResponse
			.errors
			.map( error => error.errorMessage )
			.join( ", " );
	}
}

export default Class;

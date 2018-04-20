import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { Error } from "./Error";


export interface ErrorResponse extends TransientResource {
	errors:Error[];
	requestID:string;
	statusCode:number;
}


export interface ErrorResponseFactory extends ModelFactory<ErrorResponse> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	getMessage( errorResponse:ErrorResponse ):string;
}

const SCHEMA:ObjectSchema = {
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

export const ErrorResponse:ErrorResponseFactory = {
	TYPE: C.ErrorResponse,
	SCHEMA,

	getMessage( errorResponse:ErrorResponse ):string {
		return errorResponse
			.errors
			.map( error => error.errorMessage )
			.join( ", " );
	},

};

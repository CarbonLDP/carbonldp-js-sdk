import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { CarbonError } from "./CarbonError";


export interface ErrorResponse extends Resource {
	errors:CarbonError[];
	requestID:string;
	statusCode:number;
}


export interface ErrorResponseConstant extends ModelFactory<ErrorResponse> {
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

export const ErrorResponse:ErrorResponseConstant = {
	TYPE: C.ErrorResponse,
	SCHEMA,

	getMessage( errorResponse:ErrorResponse ):string {
		return errorResponse
			.errors
			.map( error => error.errorMessage )
			.join( ", " );
	},

};

export default ErrorResponse;

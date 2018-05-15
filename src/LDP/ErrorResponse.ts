import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { Error } from "./Error";


export interface ErrorResponse extends TransientResource {
	errors:Error[];
	requestID:string;
	statusCode:number;
}


export interface ErrorResponseFactory extends ModelSchema {
	TYPE:C[ "ErrorResponse" ];
	SCHEMA:ObjectSchema;


	is( value:any ):value is ErrorResponse;


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


	is( value:any ):value is ErrorResponse {
		return TransientResource.is( value )
			&& value.hasType( ErrorResponse.TYPE )
			;
	},


	getMessage( errorResponse:ErrorResponse ):string {
		return errorResponse
			.errors
			.map( error => error.errorMessage )
			.join( ", " );
	},

};

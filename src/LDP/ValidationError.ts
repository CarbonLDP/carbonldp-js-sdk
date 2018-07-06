import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies";


export interface ValidationError extends TransientResource {
	errorDetails:Pointer;
}


export interface ValidationErrorFactory extends ModelSchema {
	TYPE:C[ "ValidationError" ];
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"errorDetails": {
		"@id": C.errorDetails,
		"@type": "@id",
	},
};

export const ValidationError:ValidationErrorFactory = {
	TYPE: C.ValidationError,
	SCHEMA,
};

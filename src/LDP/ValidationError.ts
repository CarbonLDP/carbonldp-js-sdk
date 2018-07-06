import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { C } from "../Vocabularies";


export interface ValidationError extends Resource {
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

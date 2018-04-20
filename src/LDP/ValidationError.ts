import { ModelFactory } from "../ModelFactory";
import { C } from "../Vocabularies/C";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";


export interface ValidationError extends TransientResource {
	errorDetails:Pointer;
}


export interface ValidationErrorFactory extends ModelFactory<ValidationError> {
	TYPE:string;
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

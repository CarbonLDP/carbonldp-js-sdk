import { ModelFactory } from "../ModelFactory";
import { C } from "../Vocabularies/C";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";


export interface ValidationError extends Resource {
	errorDetails:Pointer;
}


export interface ValidationErrorConstant extends ModelFactory<ValidationError> {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"errorDetails": {
		"@id": C.errorDetails,
		"@type": "@id",
	},
};

export const ValidationError:ValidationErrorConstant = {
	TYPE: C.ValidationError,
	SCHEMA,
};

export default ValidationError;

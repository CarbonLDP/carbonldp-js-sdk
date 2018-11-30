import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { ValidationReport } from "../SHACL/ValidationReport";

import { C } from "../Vocabularies/C";


/**
 * Model that represents a `c:ValidationError`.
 * This model is used in a `c:Error` when that error was caused by a failed SHACL validation.
 */
export interface ValidationError extends Resource {
	/**
	 * Object with a report of the failed validation.
	 */
	errorDetails:ValidationReport;
}


// TODO: Chane to type-alias
/**
 * Factory, decorator and utils for {@link ValidationError}.
 */
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

/**
 * Constant that implements {@link ValidationErrorFactory}.
 */
export const ValidationError:ValidationErrorFactory = {
	TYPE: C.ValidationError,
	SCHEMA,
};

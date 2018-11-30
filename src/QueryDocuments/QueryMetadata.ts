import { VolatileResource } from "../LDP/VolatileResource";
import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { QueryablePointer } from "./QueryablePointer";


/**
 * Model of the volatile resource expected by the SDK in the partial query request.
 */
export interface QueryMetadata extends VolatileResource {
	/**
	 * The pointers to the main targeted resources in the partial query.
	 */
	targets:QueryablePointer[];
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link QueryMetadata}.
 */
export interface QueryMetadataFactory extends ModelSchema {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( value:any ):value is QueryMetadata;
}

const SCHEMA:ObjectSchema = {
	"targets": {
		"@id": C.target,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant that implements {@link QueryMetadataFactory}.
 */
export const QueryMetadata:QueryMetadataFactory = {
	TYPE: C.QueryMetadata,
	SCHEMA,

	is( value:any ):value is QueryMetadata {
		return VolatileResource.is( value )
			&& value.$hasType( QueryMetadata.TYPE );
	},

};

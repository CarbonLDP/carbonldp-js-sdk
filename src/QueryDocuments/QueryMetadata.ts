import { VolatileResource } from "../LDP/VolatileResource";
import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { QueryablePointer } from "./QueryablePointer";
import { ModelTypeGuard } from "../Model";


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
export type QueryMetadataFactory =
	& ModelSchema<C[ "QueryMetadata" ]>
	& ModelTypeGuard<QueryMetadata>;

const SCHEMA:ObjectSchema = {
	"targets": {
		"@id": C.target,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant with the factory, decorator and/or utils for a {@link QueryMetadata} object.
 */
export const QueryMetadata:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#QueryMetadata`.
	 */
	TYPE: C["QueryMetadata"];

	/**
	 * Schema for the {@link QueryMetadata}.
	 */
	SCHEMA: ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be a {@link QueryMetadata}.
	 */
	is( object:object ): object is QueryMetadata;
} = <QueryMetadataFactory> {
	TYPE: C.QueryMetadata,
	SCHEMA,

	is( value:any ):value is QueryMetadata {
		return VolatileResource.is( value )
			&& value.$hasType( QueryMetadata.TYPE );
	},

};

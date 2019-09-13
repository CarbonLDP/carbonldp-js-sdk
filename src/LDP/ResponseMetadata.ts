import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";


/**
 * Model that represents a `c:ResponseMetadata`.
 * This model is returned in the response of a request when volatile metadata needs to be returned.
 */
export interface ResponseMetadata extends VolatileResource {
	/**
	 * Array with metadata of resources affected by the request.
	 */
	documentsMetadata?:DocumentMetadata[];
}


/**
 * Factory, decorator and utils for {@link ResponseMetadata}.
 */
export interface ResponseMetadataFactory extends ModelSchema {
	TYPE:C[ "ResponseMetadata" ];
	SCHEMA:ObjectSchema;

	is( object:object ):object is ResponseMetadata;
}

const SCHEMA:ObjectSchema = {
	"documentsMetadata": {
		"@id": C.documentMetadata,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant that implements {@link ResponseMetadataFactory}.
 */
export const ResponseMetadata:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#ResponseMetadata'
	 */
	TYPE: C["ResponseMetadata"];

	/**
	 * Defines the basic schema for the {@link ResponseMetadata}.
	 */
	SCHEMA: ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be a {@link ResponseMetadata}.
	 */
	is( object:object ): object is ResponseMetadata;

} = {
	TYPE: C.ResponseMetadata,
	SCHEMA,

	is( object:object ):object is ResponseMetadata {
		return VolatileResource.is( object )
			&& object.$hasType( ResponseMetadata.TYPE );
	},

};

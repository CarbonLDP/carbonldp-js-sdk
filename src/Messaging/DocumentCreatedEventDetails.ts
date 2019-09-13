import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Model that represents a `c:DocumentCreatedEventDetails`.
 */
export interface DocumentCreatedEventDetails extends Resource {
	/**
	 * Set of the created documents.
	 */
	createdDocuments:Document[];
}


// TODO: Change to type-alias
/**
 * Factory, decorators and utils for {@link DocumentCreatedEventDetails}.
 */
export interface DocumentCreatedEventDetailsFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"createdDocuments": {
		"@id": C.createdDocument,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant that implements {@link DocumentCreatedEventDetailsFactory}.
 */
export const DocumentCreatedEventDetails:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#DocumentCreatedEventDetails'
	 */
	TYPE: C["DocumentCreatedEventDetails"];

	/**
	 * Defines the basic schema for the {@link DocumentCreatedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.DocumentCreatedEventDetails,
	SCHEMA,
};

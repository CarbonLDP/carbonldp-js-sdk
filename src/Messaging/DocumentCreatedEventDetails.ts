import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";
import { ModelSchema } from "../Model";


/**
 * Model that represents a `c:DocumentCreatedEventDetails`.
 */
export interface DocumentCreatedEventDetails extends Resource {
	/**
	 * Set of the created documents.
	 */
	createdDocuments:Document[];
}


/**
 * Factory, decorators and utils for {@link DocumentCreatedEventDetails}.
 */
export type DocumentCreatedEventDetailsFactory =
	& ModelSchema<C["DocumentCreatedEventDetails"]>;

const SCHEMA:ObjectSchema = {
	"createdDocuments": {
		"@id": C.createdDocument,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentCreatedEventDetails} object.
 */
export const DocumentCreatedEventDetails:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentCreatedEventDetails`.
	 */
	TYPE: C["DocumentCreatedEventDetails"];

	/**
	 * Schema for the {@link DocumentCreatedEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = <DocumentCreatedEventDetailsFactory> {
	TYPE: C.DocumentCreatedEventDetails,
	SCHEMA,
};

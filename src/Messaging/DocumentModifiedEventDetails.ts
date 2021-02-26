import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
import { Document } from "../Document/Document";

import { C } from "../Vocabularies/C";

/**
 * Model that represents a `c:DocumentModifiedEventDetails`.
 */
export interface DocumentModifiedEventDetails extends Resource {
	/**
	 * Set of the created documents.
	 */
	added:Document[];
	deleted:Document[];
}


/**
 * Factory, decorators and utils for {@link DocumentModifiedEventDetails}.
 */
export type DocumentModifiedEventDetailsFactory =
	& ModelSchema<C["DocumentModifiedEventDetails"]>;

const SCHEMA:ObjectSchema = {
	"added": {
		"@id": C.added,
		"@type": "@id",
		"@container": "@set",
	},
	"deleted": {
		"@id": C.deleted,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentModifiedEventDetails} object.
 */
export const DocumentModifiedEventDetails:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentModifiedEventDetails`.
	 */
	TYPE:C["DocumentModifiedEventDetails"];

	/**
	 * Schema for the {@link DocumentModifiedEventDetails}.
	 */
	SCHEMA:ObjectSchema;
} = <DocumentModifiedEventDetailsFactory> {
	TYPE: C.DocumentModifiedEventDetails,
	SCHEMA,
};
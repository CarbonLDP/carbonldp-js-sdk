import { Document } from "../Document/Document";

import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { C } from "../Vocabularies/C";

import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";


/**
 * Model that represents a `c:DocumentMetadata`.
 * This model contains volatile information about an specific resource.
 */
export interface DocumentMetadata extends VolatileResource {
	/**
	 * Resource the metadata refers to.
	 */
	relatedDocument:Document;
	/**
	 * `c:Map` that contains the changed IDs when persisting BNodes.
	 */
	bNodesMap:Map<Pointer, Pointer>;
}


/**
 * Factory, decorator and utils for {@link DocumentMetadata}.
 */
// TODO: Change to type-alias
export interface DocumentMetadataFactory extends ModelSchema {
	TYPE:C[ "DocumentMetadata" ];
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"relatedDocument": {
		"@id": C.relatedDocument,
		"@type": "@id",
	},
	"bNodesMap": {
		"@id": C.bNodesMap,
		"@type": "@id",
	},
};

/**
 * Constant that implements {@link DocumentMetadataFactory}.
 */
export const DocumentMetadata:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#DocumentMetadata'
	 */
	TYPE: C["DocumentMetadata"];

	/**
	 * Defines the basic schema for the {@link DocumentMetadata}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.DocumentMetadata,
	SCHEMA,
};

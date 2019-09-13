import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { PlatformInstance } from "./PlatformInstance";


/**
 * Model that represents a `c:Platform`.
 * The model contains the reference of the metadata of a platform instance.
 */
export interface PlatformMetadata extends Document {
	/**
	 * Volatile fragment where the actual data of the instance lives on.
	 */
	instance:PlatformInstance;
}


// TODO: Change to type-alias.
/**
 * Factory and utils for {@link PlatformInstance}.
 */
export interface PlatformMetadataFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"instance": {
		"@id": C.instance,
		"@type": "@id",
	},
};

/**
 * Constant that implements {@link PlatformMetadata}.
 */
export const PlatformMetadata:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#PlatformMetadata'
	 */
	TYPE: C["Platform"];

	/**
	 * Defines the basic schema for the {@link PlatformMetadata}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.Platform,
	SCHEMA,
};


import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { PlatformInstance } from "./PlatformInstance";
import { ModelSchema } from "../Model";


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


/**
 * Factory and utils for {@link PlatformInstance}.
 */
export type PlatformMetadataFactory =
	& ModelSchema<C["Platform"]>;

const SCHEMA:ObjectSchema = {
	"instance": {
		"@id": C.instance,
		"@type": "@id",
	},
};

/**
 * Constant with the factory, decorator and/or utils for an {@link PlatformMetadata} object.
 */
export const PlatformMetadata:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#PlatformMetadata`.
	 */
	TYPE: C["Platform"];

	/**
	 * Schema for the {@link PlatformMetadata}.
	 */
	SCHEMA: ObjectSchema;
} = <PlatformMetadataFactory> {
	TYPE: C.Platform,
	SCHEMA,
};


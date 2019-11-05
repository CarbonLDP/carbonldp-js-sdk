import { VolatileResource } from "../LDP/VolatileResource";

import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";


/**
 * Model that represents a `c:PlatformInstance`.
 * The model contains the actual data of a platform instance.
 */
export interface PlatformInstance extends VolatileResource {
	/**
	 * The datetime when the platform was built.
	 */
	buildDate:Date;
	/**
	 * The version the platform instance.
	 */
	version:string;
}


/**
 * Factory and utils for {@link PlatformInstance}.
 */
export type PlatformInstanceFactory =
	& ModelSchema<C["PlatformInstance"]>;

const SCHEMA:ObjectSchema = {
	"buildDate": {
		"@id": C.buildDate,
		"@type": XSD.dateTime,
	},
	"version": {
		"@id": C.version,
		"@type": XSD.string,
	},
};

/**
 * Constant with the factory, decorator and/or utils for a {@link PlatformInstance} object.
 */
export const PlatformInstance:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#PlatformInstance`.
	 */
	TYPE:C["PlatformInstance"];

	/**
	 * Schema for the {@link PlatformInstance}.
	 */
	SCHEMA:ObjectSchema;
} = <PlatformInstanceFactory> {
	TYPE: C.PlatformInstance,
	SCHEMA,
};

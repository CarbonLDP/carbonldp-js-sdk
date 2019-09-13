import { VolatileResource } from "../LDP/VolatileResource";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { PlatformMetadata } from "./PlatformMetadata";


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


// TODO: Change to type-alias
/**
 * Factory and utils for {@link PlatformInstance}.
 */
export interface PlatformInstanceFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

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
 * Constant that implements {@link PlatformInstanceFactory}.
 */
export const PlatformInstance:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#PlatformInstance'
	 */
	TYPE: C["PlatformInstance"];

	/**
	 * Defines the basic schema for the {@link PlatformInstance}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.PlatformInstance,
	SCHEMA,
};

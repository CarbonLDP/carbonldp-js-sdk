import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { MapEntry } from "./MapEntry";


/**
 * Model that represents a `c:Map`.
 * This model contains a set of entries in a form of a key/value pair.
 */
export interface Map<K, V> extends Resource {
	/**
	 * Array of the entries's pairs.
	 */
	entries:MapEntry<K, V>[];
}


/**
 * Factory, decorator and utils for {@link Map}.
 */
// TODO: Change to type-alias
export interface MapFactory extends ModelSchema {
	TYPE:C[ "Map" ];
	SCHEMA:ObjectSchema;

	is( object:object ):object is Map<any, any>;
}

const SCHEMA:ObjectSchema = {
	"entries": {
		"@id": C.entry,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant that implements {@link MapFactory}.
 */
export const Map:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#Map'
	 */
	TYPE: C["Map"];

	/**
	 * Defines the basic schema for the map.
	 */
	SCHEMA: ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be a {@link Map}.
	 */
	is( object:object ): object is Map<any, any>;
} = {
	TYPE: C.Map,
	SCHEMA,

	is( object:object ):object is Map<any, any> {
		return Resource.is( object )
			&& object.$hasType( Map.TYPE )
			&& object.hasOwnProperty( "entries" );
	},

};

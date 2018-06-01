import { ModelFactory } from "../core/ModelFactory";
import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies/C";
import { MapEntry } from "./MapEntry";


export interface Map<K, V> extends TransientResource {
	entries:MapEntry<K, V>[];
}


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

export const Map:MapFactory = {
	TYPE: C.Map,
	SCHEMA,

	is( object:object ):object is Map<any, any> {
		return TransientResource.is( object )
			&& object.hasType( Map.TYPE )
			&& object.hasOwnProperty( "entries" );
	},

};

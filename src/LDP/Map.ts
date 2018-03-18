import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import { MapEntry } from "./MapEntry";


export interface Map<K, V> extends Resource {
	entries:MapEntry<K, V>[];
}


export interface MapFactory extends ModelFactory<Map<any, any>> {
	TYPE:string;
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
		return Resource.is( object )
			&& object.hasType( Map.TYPE )
			&& object.hasOwnProperty( "entries" );
	},

};

export default Map;

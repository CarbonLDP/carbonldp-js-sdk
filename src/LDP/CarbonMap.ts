import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import { CarbonMapEntry } from "./CarbonMapEntry";


export interface CarbonMap<K, V> extends Resource {
	entries:CarbonMapEntry<K, V>[];
}


export interface CarbonMapFactory extends ModelFactory<CarbonMap<any, any>> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( object:object ):object is CarbonMap<any, any>;
}

const SCHEMA:ObjectSchema = {
	"entries": {
		"@id": C.entry,
		"@type": "@id",
		"@container": "@set",
	},
};

export const CarbonMap:CarbonMapFactory = {
	TYPE: C.Map,
	SCHEMA,

	is( object:object ):object is CarbonMap<any, any> {
		return Resource.is( object )
			&& object.hasType( CarbonMap.TYPE )
			&& object.hasOwnProperty( "entries" );
	},

};

export default CarbonMap;

import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { C } from "../Vocabularies";


export interface MapEntry<K, V> extends Resource {
	entryKey:K;
	entryValue:V;
}


const SCHEMA:ObjectSchema = {
	"entryKey": {
		"@id": C.entryKey,
	},
	"entryValue": {
		"@id": C.entryValue,
	},
};

export interface MapEntryFactory {
	SCHEMA:ObjectSchema;
}

export const MapEntry:MapEntryFactory = {
	SCHEMA,
};

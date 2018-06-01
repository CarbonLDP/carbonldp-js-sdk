import { TransientBlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";


export interface MapEntry<K, V> extends TransientBlankNode {
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

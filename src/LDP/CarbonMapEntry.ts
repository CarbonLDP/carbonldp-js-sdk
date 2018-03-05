import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";


export interface CarbonMapEntry<K, V> extends BlankNode {
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

export interface CarbonMapEntryConstant {
	SCHEMA:ObjectSchema;
}

export const CarbonMapEntry:CarbonMapEntryConstant = {
	SCHEMA,
};

export default CarbonMapEntry;

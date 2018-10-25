import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
import { C } from "../Vocabularies/C";


/**
 * Model that represents an entry of a `c:Map`.
 */
export interface MapEntry<K, V> extends Resource {
	/**
	 * The key element of the entry's pair.
	 */
	entryKey:K;
	/**
	 * The value element of the entry's pair.
	 */
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

/**
 * Factory, decorator and utils for {@link MapEntry}.
 */
// TODO: Change to type-alias
export interface MapEntryFactory {
	SCHEMA:ObjectSchema;
}

/**
 * Constant the implements {@link MapEntryFactory}.
 */
export const MapEntry:MapEntryFactory = {
	SCHEMA,
};

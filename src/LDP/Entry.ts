import { C } from "../Vocabularies/C";
import { BlankNode } from "../BlankNode";
import { Class as ObjectSchema } from "./../ObjectSchema";

export const SCHEMA:ObjectSchema = {
	"entryKey": {
		"@id": C.entryKey,
	},
	"entryValue": {
		"@id": C.entryValue,
	},
};

export interface Class<K, V> extends BlankNode {
	entryKey:K;
	entryValue:V;
}

export default Class;

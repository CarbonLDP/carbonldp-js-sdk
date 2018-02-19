import { Class as BlankNode } from "./../BlankNode";
import * as NS from "../Vocabularies/index";
import { Class as ObjectSchema } from "./../ObjectSchema";

export const SCHEMA:ObjectSchema = {
	"entryKey": {
		"@id": NS.C.Predicate.entryKey,
	},
	"entryValue": {
		"@id": NS.C.Predicate.entryValue,
	},
};

export interface Class<K, V> extends BlankNode {
	entryKey:K;
	entryValue:V;
}

export default Class;

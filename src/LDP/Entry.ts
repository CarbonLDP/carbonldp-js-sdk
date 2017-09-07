import { Class as BlankNode } from "./../BlankNode";
import * as NS from "./../NS";
import { Class as ObjectSchema } from "./../ObjectSchema";

export const SCHEMA:ObjectSchema = {
	"key": {
		"@id": NS.C.Predicate.entryKey,
		"@type": "@id",
	},
	"value": {
		"@id": NS.C.Predicate.entryValue,
		"@type": "@id",
	},
};

export interface Class extends BlankNode {
	key:BlankNode;
	value:BlankNode;
}

export default Class;

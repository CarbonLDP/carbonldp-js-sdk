import { Class as BlankNode } from "./../BlankNode";
import * as NS from "./../NS";
import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Pointer } from "./../Pointer";

export const SCHEMA:ObjectSchema = {
	"key": {
		"@id": NS.C.Predicate.key,
		"@type": "@id",
	},
	"value": {
		"@id": NS.C.Predicate.value,
		"@type": "@id",
	},
};

export interface Class extends Pointer {
	key:BlankNode;
	value:BlankNode;
}

export default Class;

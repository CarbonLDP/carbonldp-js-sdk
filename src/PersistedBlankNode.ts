import * as PersistedFragment from "./PersistedFragment";
import * as ObjectSchema from "./ObjectSchema";
import * as NS from "./NS";

export const SCHEMA:ObjectSchema.Class = {
	"bNodeIdentifier": {
		"@id": NS.C.Predicate.bNodeIdentifier,
			"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends PersistedFragment.Class {
	bNodeIdentifier: string;
}

export default Class;

import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedFragment from "./../PersistedFragment";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.AccessControlEntry;

export const SCHEMA:ObjectSchema.Class = {
	"granting": {
		"@id": NS.CS.Predicate.granting,
		"@type": NS.XSD.DataType.boolean,
	},
	"permissions": {
		"@id": NS.CS.Predicate.permission,
		"@type": "@id",
		"@container": "@set",
	},
	"subject": {
		"@id": NS.CS.Predicate.subject,
		"@type": "@id",
	},
	"subjectClass": {
		"@id": NS.CS.Predicate.subjectClass,
		"@type": "@id",
	},
};

export interface Class extends PersistedFragment.Class {
	granting: boolean;
	permissions: Pointer.Class[];
	subject: Pointer.Class;
	subjectClass: Pointer.Class;
}

export default Class;

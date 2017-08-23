import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";

export const RDF_CLASS:string = NS.C.Class.Instance;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
	"description": {
		"@id": NS.CS.Predicate.description,
		"@type": NS.XSD.DataType.string,
	},
	"allowsOrigins": {
		"@id": NS.CS.Predicate.allowsOrigin,
		"@container": "@set",
	},
};

export interface Class extends PersistedProtectedDocument.Class {
	name?:string;
	description?:string;
	allowsOrigins?:(Pointer.Class | string)[];
}

export default Class;

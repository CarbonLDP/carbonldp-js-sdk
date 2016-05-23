import * as Document from "./Document";
import * as NS from "./NS";
import ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";

export const RDF_CLASS:string = NS.LDP.Class.RDFSource;

export const SCHEMA:ObjectSchema = {
	"defaultInteractionModel": {
		"@id": NS.C.Predicate.defaultInteractionModel,
		"@type": "@id",
	},
	"accessPoints": {
		"@id": NS.C.Predicate.accessPoint,
		"@type": "@id",
		"@container": "@set",
	},
	"accessControlList": {
		"@id": NS.CS.Predicate.accessControlList,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {
	defaultInteractionModel: Pointer.Class;
	accessPoints: Pointer.Class[];
	accessControlList: Pointer.Class;
}

import * as Document from "./Document";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";

export const RDF_CLASS:string = NS.CS.Class.ProtectedDocument;

export const SCHEMA:ObjectSchema.Class = {
	"accessControlList": {
		"@id": NS.CS.Predicate.accessControlList,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {

}

export default Class;

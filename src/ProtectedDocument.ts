import * as Document from "./Document";
import * as NS from "./Vocabularies/index";
import * as ObjectSchema from "./ObjectSchema";

export const RDF_CLASS:string = NS.CS.ProtectedDocument;

export const SCHEMA:ObjectSchema.Class = {
	"accessControlList": {
		"@id": NS.CS.accessControlList,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {

}

export default Class;

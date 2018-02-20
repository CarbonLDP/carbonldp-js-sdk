import * as Document from "./Document";
import * as ObjectSchema from "./ObjectSchema";
import { CS } from "./Vocabularies/CS";

export const RDF_CLASS:string = CS.ProtectedDocument;

export const SCHEMA:ObjectSchema.Class = {
	"accessControlList": {
		"@id": CS.accessControlList,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {

}

export default Class;

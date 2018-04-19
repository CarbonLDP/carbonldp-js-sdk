import { TransientDocument } from "./TransientDocument";
import { ObjectSchema } from "./ObjectSchema";
import { CS } from "./Vocabularies/CS";

export interface TransientProtectedDocument extends TransientDocument {
}


export interface TransientProtectedDocumentFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}


const SCHEMA:ObjectSchema = {
	"accessControlList": {
		"@id": CS.accessControlList,
		"@type": "@id",
	},
};

export const TransientProtectedDocument:TransientProtectedDocumentFactory = {
	TYPE: CS.ProtectedDocument,
	SCHEMA,
};

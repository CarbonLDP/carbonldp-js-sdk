import { TransientDocument } from "./TransientDocument";
import { ObjectSchema } from "./ObjectSchema";
import { CS } from "./Vocabularies/CS";

export interface ProtectedDocument extends TransientDocument {
}


export interface ProtectedDocumentFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}


const SCHEMA:ObjectSchema = {
	"accessControlList": {
		"@id": CS.accessControlList,
		"@type": "@id",
	},
};

export const ProtectedDocument:ProtectedDocumentFactory = {
	TYPE: CS.ProtectedDocument,
	SCHEMA,
};

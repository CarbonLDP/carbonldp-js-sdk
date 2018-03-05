import { Document } from "./Document";
import { ObjectSchema } from "./ObjectSchema";
import { CS } from "./Vocabularies/CS";

export interface ProtectedDocument extends Document {
}


export interface ProtectedDocumentConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}


const SCHEMA:ObjectSchema = {
	"accessControlList": {
		"@id": CS.accessControlList,
		"@type": "@id",
	},
};

export const ProtectedDocument:ProtectedDocumentConstant = {
	TYPE: CS.ProtectedDocument,
	SCHEMA,
};

export default ProtectedDocument;

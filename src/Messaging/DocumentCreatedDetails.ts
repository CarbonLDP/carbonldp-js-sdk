import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";


export interface DocumentCreatedDetails extends Resource {
	createdDocuments:Pointer[];
}


export interface DocumentCreatedDetailsConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"createdDocuments": {
		"@id": C.createdDocument,
		"@type": "@id",
		"@container": "@set",
	},
};

export const DocumentCreatedDetails:DocumentCreatedDetailsConstant = {
	TYPE: C.DocumentCreatedDetails,
	SCHEMA,
};

export default DocumentCreatedDetails;

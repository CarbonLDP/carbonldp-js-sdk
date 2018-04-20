import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";


export interface DocumentCreatedDetails extends TransientResource {
	createdDocuments:Pointer[];
}


export interface DocumentCreatedDetailsFactory {
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

export const DocumentCreatedDetails:DocumentCreatedDetailsFactory = {
	TYPE: C.DocumentCreatedDetails,
	SCHEMA,
};

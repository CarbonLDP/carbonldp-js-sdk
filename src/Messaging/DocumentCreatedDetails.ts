import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


export interface DocumentCreatedDetails extends Resource {
	createdDocuments:Document[];
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
	TYPE: C.DocumentCreatedEventDetails,
	SCHEMA,
};

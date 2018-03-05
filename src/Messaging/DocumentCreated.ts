import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { EventMessage } from "./EventMessage";


export interface DocumentCreated extends EventMessage {
	details:DocumentCreatedDetails;
}


export interface DocumentCreatedConstant {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const DocumentCreated:DocumentCreatedConstant = {
	SCHEMA,
};

export default DocumentCreated;

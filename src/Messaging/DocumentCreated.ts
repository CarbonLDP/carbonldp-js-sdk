import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies";
import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { EventMessage } from "./EventMessage";


export interface DocumentCreated extends EventMessage {
	details:DocumentCreatedDetails;
}


export interface DocumentCreatedFactory {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const DocumentCreated:DocumentCreatedFactory = {
	SCHEMA,
};

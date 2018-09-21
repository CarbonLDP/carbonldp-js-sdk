import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { EventMessage } from "./EventMessage";


export interface DocumentCreatedEvent extends EventMessage {
	details:DocumentCreatedEventDetails;
}


export interface DocumentCreatedEventFactory {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const DocumentCreatedEvent:DocumentCreatedEventFactory = {
	SCHEMA,
};

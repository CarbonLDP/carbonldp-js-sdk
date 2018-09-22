import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { EventMessage } from "./EventMessage";


export interface ChildCreatedEvent extends EventMessage {
	details:DocumentCreatedEventDetails;
}


export interface ChildCreatedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.ChildCreatedEvent;
const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const ChildCreatedEvent:ChildCreatedEventFactory = {
	TYPE,
	SCHEMA,
};

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


export interface DocumentDeletedEvent extends EventMessage {
}


export interface DocumentDeletedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentDeletedEvent;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

export const DocumentDeletedEvent:DocumentDeletedEventFactory = {
	TYPE,
	SCHEMA,
};


import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


export interface DocumentDeleted extends EventMessage {
}


export interface DocumentDeletedFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentDeletedEvent;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

export const DocumentDeleted:DocumentDeletedFactory = {
	TYPE,
	SCHEMA,
};


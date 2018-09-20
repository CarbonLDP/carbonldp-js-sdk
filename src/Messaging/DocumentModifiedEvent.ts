import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


export interface DocumentModifiedEvent extends EventMessage {
}


export interface DocumentModifiedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentModifiedEvent;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

export const DocumentModifiedEvent:DocumentModifiedEventFactory = {
	TYPE,
	SCHEMA,
};

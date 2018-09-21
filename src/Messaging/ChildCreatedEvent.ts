import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentCreatedEvent } from "./DocumentCreatedEvent";


export interface ChildCreatedEvent extends DocumentCreatedEvent {
}


export interface ChildCreatedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.ChildCreatedEvent;
const SCHEMA:ObjectSchema = DocumentCreatedEvent.SCHEMA;

export const ChildCreatedEvent:ChildCreatedEventFactory = {
	TYPE,
	SCHEMA,
};

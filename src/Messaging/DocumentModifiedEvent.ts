import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


/**
 * Model that represents a `c:DocumentModifiedEvent`.
 */
export interface DocumentModifiedEvent extends EventMessage {
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link DocumentModifiedEvent}.
 */
export interface DocumentModifiedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.DocumentModifiedEvent;
const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

/**
 * Constant that implements {@link DocumentModifiedEventFactory}.
 */
export const DocumentModifiedEvent:DocumentModifiedEventFactory = {
	TYPE,
	SCHEMA,
};

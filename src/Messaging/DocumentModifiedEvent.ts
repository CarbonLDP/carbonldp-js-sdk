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

const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

/**
 * Constant that implements {@link DocumentModifiedEventFactory}.
 */
export const DocumentModifiedEvent:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#DocumentModifiedEvent'
	 */
	TYPE: C["DocumentModifiedEvent"];

	/**
	 * Defines the basic schema for the {@link DocumentModifiedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE:C.DocumentModifiedEvent,
	SCHEMA,
};

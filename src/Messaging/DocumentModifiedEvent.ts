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
 * Constant with the factory, decorator and/or utils for a {@link DocumentModifiedEvent} object.
 */
export const DocumentModifiedEvent:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentModifiedEvent`.
	 */
	TYPE: C["DocumentModifiedEvent"];

	/**
	 * Schema for the {@link DocumentModifiedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE:C.DocumentModifiedEvent,
	SCHEMA,
};

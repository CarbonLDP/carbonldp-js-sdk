import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


/**
 * Model that represents a `c:DocumentDeletedEvent`.
 */
export interface DocumentDeletedEvent extends EventMessage {
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link DocumentDeletedEvent}.
 */
export interface DocumentDeletedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for an {@link DocumentDeletedEvent} object.
 */
export const DocumentDeletedEvent:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentDeletedEvent`.
	 */
	TYPE: C["DocumentDeletedEvent"];

	/**
	 * Schema for the {@link DocumentDeletedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.DocumentDeletedEvent,
	SCHEMA,
};

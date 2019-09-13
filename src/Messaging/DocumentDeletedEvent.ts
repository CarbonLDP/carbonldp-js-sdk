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
 * Constant that implements {@link DocumentDeletedEventFactory}
 */
export const DocumentDeletedEvent:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#DocumentDeletedEvent'
	 */
	TYPE: C["DocumentDeletedEvent"];

	/**
	 * Defines the basic schema for the {@link DocumentDeletedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.DocumentDeletedEvent,
	SCHEMA,
};

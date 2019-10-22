import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { ModelSchema } from '../Model';


/**
 * Model that represents a `c:DocumentDeletedEvent`.
 */
export interface DocumentDeletedEvent extends EventMessage {
}


/**
 * Factory, decorator and utils for {@link DocumentDeletedEvent}.
 */
export type DocumentDeletedEventFactory =
	& ModelSchema<C["DocumentDeletedEvent"]>;

const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for an {@link DocumentDeletedEvent} object.
 */
export const DocumentDeletedEvent:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentDeletedEvent`.
	 */
	TYPE: C["DocumentDeletedEvent"];

	/**
	 * Schema for the {@link DocumentDeletedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = <DocumentDeletedEventFactory> {
	TYPE: C.DocumentDeletedEvent,
	SCHEMA,
};

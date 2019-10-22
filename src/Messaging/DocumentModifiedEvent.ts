import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { ModelSchema } from "../Model";


/**
 * Model that represents a `c:DocumentModifiedEvent`.
 */
export interface DocumentModifiedEvent extends EventMessage {
}


/**
 * Factory, decorator and utils for {@link DocumentModifiedEvent}.
 */
export type DocumentModifiedEventFactory =
	& ModelSchema <C["DocumentModifiedEvent"]>;

const SCHEMA:ObjectSchema = EventMessage.SCHEMA;

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentModifiedEvent} object.
 */
export const DocumentModifiedEvent:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#DocumentModifiedEvent`.
	 */
	TYPE: C["DocumentModifiedEvent"];

	/**
	 * Schema for the {@link DocumentModifiedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = <DocumentModifiedEventFactory> {
	TYPE:C.DocumentModifiedEvent,
	SCHEMA,
};

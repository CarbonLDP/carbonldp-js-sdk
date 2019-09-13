import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { EventMessage } from "./EventMessage";


/**
 * Model that represents a `c:ChildCreatedEvent`.
 */
export interface ChildCreatedEvent extends EventMessage {
	/**
	 * Object with the child that was created.
	 */
	details:DocumentCreatedEventDetails;
}

// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link ChildCreatedEvent}.
 */
export interface ChildCreatedEventFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

/**
 * Constant that implements {@link ChildCreatedEventFactory}.
 */
export const ChildCreatedEvent:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#ChildCreatedEvent'
	 */
	TYPE: C["ChildCreatedEvent"];

	/**
	 * Defines the basic schema for the {@link ChildCreatedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.ChildCreatedEvent,
	SCHEMA,
};

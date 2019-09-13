import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { MemberAddedEventDetails } from "./MemberAddedEventDetails";


/**
 * Model that represents a `c:MemberAddedEvent`.
 */
export interface MemberAddedEvent extends EventMessage {
	/**
	 * Object with the members added.
	 */
	details:MemberAddedEventDetails;
}

// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link MemberAddedEvent}.
 */
export interface MemberAddedEventFactory {
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
 * Constant that implements {@link MemberAddedEventFactory}.
 */
export const MemberAddedEvent:{
	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#MemberAddedEvent'
	 */
	TYPE: C["MemberAddedEvent"];

	/**
	 * Defines the basic schema for the {@link MemberAddedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.MemberAddedEvent,
	SCHEMA,
};

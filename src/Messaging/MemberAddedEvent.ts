import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { MemberAddedEventDetails } from "./MemberAddedEventDetails";
import { ModelSchema } from "../Model";


/**
 * Model that represents a `c:MemberAddedEvent`.
 */
export interface MemberAddedEvent extends EventMessage {
	/**
	 * Object with the members added.
	 */
	details:MemberAddedEventDetails;
}

/**
 * Factory, decorator and utils for {@link MemberAddedEvent}.
 */
export type MemberAddedEventFactory =
	& ModelSchema<C["MemberAddedEvent"]>;

const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

/**
 * Constant with the factory, decorator and/or utils for a {@link MemberAddedEvent} object.
 */
export const MemberAddedEvent:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#MemberAddedEvent`.
	 */
	TYPE: C["MemberAddedEvent"];

	/**
	 * Schema for the {@link MemberAddedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = <MemberAddedEventFactory> {
	TYPE: C.MemberAddedEvent,
	SCHEMA,
};

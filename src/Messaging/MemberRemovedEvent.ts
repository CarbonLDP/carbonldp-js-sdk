import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";


/**
 * Model that represents a `c:MemberRemovedEvent`.
 */
export interface MemberRemovedEvent extends EventMessage {
	/**
	 * Object with the members removed.
	 */
	details:MemberRemovedEventDetails;
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils form {@link MemberRemovedEvent}.
 */
export interface MemberRemovedEventFactory {
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
 * Constant with the factory, decorator and/or utils for a {@link MemberRemovedEvent} object.
 */
export const MemberRemovedEvent:{
	/**
	 * Specifies the type of the model, in this case: `https://carbonldp.com/ns/v1/platform#MemberRemovedEvent`.
	 */
	TYPE: C["MemberRemovedEvent"];

	/**
	 * Schema for the {@link MemberRemovedEvent}.
	 */
	SCHEMA: ObjectSchema;
} = {
	TYPE: C.MemberRemovedEvent,
	SCHEMA,
};

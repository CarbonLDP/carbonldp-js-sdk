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

const TYPE:string = C.MemberRemovedEvent;
const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

/**
 * Constant that implements {@link MemberRemovedEventFactory}.
 */
export const MemberRemovedEvent:MemberRemovedEventFactory = {
	TYPE,
	SCHEMA,
};

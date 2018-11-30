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

const TYPE:string = C.MemberAddedEvent;
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
export const MemberAddedEvent:MemberAddedEventFactory = {
	TYPE,
	SCHEMA,
};

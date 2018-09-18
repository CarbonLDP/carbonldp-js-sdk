import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { MemberAddedEventDetails } from "./MemberAddedEventDetails";


export interface MemberAddedEvent extends EventMessage {
	details:MemberAddedEventDetails;
}


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

export const MemberAddedEvent:MemberAddedEventFactory = {
	TYPE,
	SCHEMA,
};

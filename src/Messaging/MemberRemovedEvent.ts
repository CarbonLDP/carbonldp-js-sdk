import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";
import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";


export interface MemberRemovedEvent extends EventMessage {
	details:MemberRemovedEventDetails;
}


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

export const MemberRemovedEvent:MemberRemovedEventFactory = {
	TYPE,
	SCHEMA,
};

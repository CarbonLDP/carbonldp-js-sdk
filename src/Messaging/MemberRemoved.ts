import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { EventMessage } from "./EventMessage";
import { MemberRemovedDetails } from "./MemberRemovedDetails";


export interface MemberRemoved extends EventMessage {
	details:MemberRemovedDetails;
}


export interface MemberRemovedConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberRemoved;
const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const MemberRemoved:MemberRemovedConstant = {
	TYPE,
	SCHEMA,
};

export default MemberRemoved;

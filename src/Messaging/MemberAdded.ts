import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { EventMessage } from "./EventMessage";
import { MemberAddedDetails } from "./MemberAddedDetails";


export interface MemberAdded extends EventMessage {
	details:MemberAddedDetails;
}


export interface MemberAddedConstant {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const TYPE:string = C.MemberAdded;
const SCHEMA:ObjectSchema = {
	...EventMessage.SCHEMA,
	"details": {
		"@id": C.details,
		"@type": "@id",
	},
};

export const MemberAdded:MemberAddedConstant = {
	TYPE,
	SCHEMA,
};

export default MemberAdded;

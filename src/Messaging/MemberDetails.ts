import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";


export interface MemberDetails extends TransientResource {
	members:Pointer[];
}


export interface MemberDetailsFactory {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"members": {
		"@id": C.member,
		"@type": "@id",
		"@container": "@set",
	},
};

export const MemberDetails:MemberDetailsFactory = {
	SCHEMA,
};

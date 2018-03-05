import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";


export interface MemberDetails extends Resource {
	members:Pointer[];
}


export interface MemberDetailsConstant {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"members": {
		"@id": C.member,
		"@type": "@id",
		"@container": "@set",
	},
};

export const MemberDetails:MemberDetailsConstant = {
	SCHEMA,
};

export default MemberDetails;

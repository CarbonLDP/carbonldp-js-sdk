import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


export interface MemberDetails extends Resource {
	members:Document[];
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

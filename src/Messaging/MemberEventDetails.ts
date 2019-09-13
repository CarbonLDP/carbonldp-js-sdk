import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Base model or the {@link MemberAddedEventDetails} and {@link MemberRemovedEventDetails} models.
 */
export interface MemberEventDetails extends Resource {
	/**
	 * The affected members of the event.
	 */
	members:Document[];
}


/**
 * Factory, decorator and utils for {@link MemberEventDetails}.
 */
export interface MemberEventDetailsFactory {
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"members": {
		"@id": C.member,
		"@type": "@id",
		"@container": "@set",
	},
};

/**
 * Constant that implements {@link MemberEventDetailsFactory}.
 */
export const MemberEventDetails:{
	/**
	 * Defines the basic schema for the {@link MemberEventDetails}.
	 */
	SCHEMA: ObjectSchema;
} = {
	SCHEMA,
};

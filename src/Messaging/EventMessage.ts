import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Base model for every notification message in a subscription event.
 */
export interface EventMessage extends Resource {
	/**
	 * Target document where the event occurred.
	 */
	target:Document;
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link EventMessage}.
 */
export interface EventMessageFactory {
	SCHEMA:ObjectSchema;

	is( value:any ):value is EventMessage;
}

const SCHEMA:ObjectSchema = {
	"target": {
		"@id": C.target,
		"@type": "@id",
	},
};

/**
 * Constant that implements {@link EventMessageFactory}.
 */
export const EventMessage:{
	/**
	 * Defines the basic schema for the {@link EventMessage}.
	 */
	SCHEMA: ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be a {@link Document}.
	 */
	is( value:any ):value is EventMessage;
} = {
	SCHEMA,

	is( value:any ):value is EventMessage {
		return Resource.is( value )
			&& value.hasOwnProperty( "target" )
			;
	},
};


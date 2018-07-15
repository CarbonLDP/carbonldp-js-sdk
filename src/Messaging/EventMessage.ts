import { Document } from "../Document/Document";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


export interface EventMessage extends Resource {
	target:Document;
}


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

export const EventMessage:EventMessageFactory = {
	SCHEMA,

	is( value:any ):value is EventMessage {
		return Resource.is( value )
			&& value.hasOwnProperty( "target" )
			;
	},
};


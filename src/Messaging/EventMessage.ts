import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { hasProperty } from "../Utils";
import { C } from "../Vocabularies/C";


export interface EventMessage extends Resource {
	target:Pointer;
}


export interface EventMessageFactory extends ModelFactory<EventMessage> {
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is EventMessage;
}

export const SCHEMA:ObjectSchema = {
	"target": {
		"@id": C.target,
		"@type": "@id",
	},
};

export const EventMessage:EventMessageFactory = {
	SCHEMA,

	isDecorated( object:object ):object is EventMessage {
		return hasProperty( object, "target" );
	},
};


export default EventMessage;

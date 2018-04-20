import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { hasProperty } from "../Utils";
import { C } from "../Vocabularies/C";


export interface EventMessage extends TransientResource {
	target:Pointer;
}


export interface EventMessageFactory extends ModelFactory<EventMessage> {
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is EventMessage;
}

const SCHEMA:ObjectSchema = {
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


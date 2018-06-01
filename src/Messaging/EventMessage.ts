import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies";


export interface EventMessage extends TransientResource {
	target:Pointer;
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
		return TransientResource.is( value )
			&& value.hasOwnProperty( "target" )
			;
	},
};


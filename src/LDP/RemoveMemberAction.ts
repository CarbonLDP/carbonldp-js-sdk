import { ModelDecorator } from "../core/ModelDecorator";
import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";


export interface RemoveMemberAction extends TransientResource {
	targetMembers:Pointer[];
}


export interface RemoveMemberActionFactory extends ModelDecorator<RemoveMemberAction>, ModelFactory<RemoveMemberAction> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is RemoveMemberAction;

	create( targetMembers:Pointer[] ):RemoveMemberAction;
}

const SCHEMA:ObjectSchema = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export const RemoveMemberAction:RemoveMemberActionFactory = {
	TYPE: C.RemoveMemberAction,
	SCHEMA,

	isDecorated( object:object ):object is RemoveMemberAction {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	},

	create( targetMembers:Pointer[] ):RemoveMemberAction {
		return TransientResource.createFrom( {
			types: [ RemoveMemberAction.TYPE ],
			targetMembers,
		} );
	},
};

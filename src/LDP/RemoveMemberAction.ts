import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";


export interface RemoveMemberAction extends Resource {
	targetMembers:Pointer[];
}


export interface RemoveMemberActionConstant extends ModelDecorator<RemoveMemberAction>, ModelFactory<RemoveMemberAction> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is RemoveMemberAction;

	create( targetMembers:Pointer[] ):RemoveMemberAction;
}

export const SCHEMA:ObjectSchema = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export const RemoveMemberAction:RemoveMemberActionConstant = {
	TYPE: C.RemoveMemberAction,
	SCHEMA,

	isDecorated( object:object ):object is RemoveMemberAction {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	},

	create( targetMembers:Pointer[] ):RemoveMemberAction {
		return Resource.createFrom( {
			types: [ RemoveMemberAction.TYPE ],
			targetMembers,
		} );
	},
};

export default RemoveMemberAction;

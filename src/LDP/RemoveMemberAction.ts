import { ModelFactory } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	BaseResource,
	Resource
} from "../Resource";
import { C } from "../Vocabularies";


export interface BaseRemoveMemberAction extends BaseResource {
	targetMembers:Pointer[];
}


export interface RemoveMemberAction extends Resource {
	targetMembers:Pointer[];
}


export interface RemoveMemberActionFactory extends ModelFactory<RemoveMemberAction> {
	TYPE:C[ "RemoveMemberAction" ];
	SCHEMA:ObjectSchema;

	is( value:any ):value is RemoveMemberAction;

	create<T extends object>( data:T & BaseRemoveMemberAction ):T & RemoveMemberAction;

	createFrom<T extends object>( object:T & BaseRemoveMemberAction ):T & RemoveMemberAction;
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

	is( value:any ):value is RemoveMemberAction {
		return Resource.is( value )
			&& value.hasType( RemoveMemberAction.TYPE )
			;
	},

	create<T extends object>( data:T & BaseRemoveMemberAction ):T & RemoveMemberAction {
		const copy:T & BaseRemoveMemberAction = Object.assign( {}, data );
		return RemoveMemberAction.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRemoveMemberAction ):T & RemoveMemberAction {
		const resource:T & RemoveMemberAction = Resource.createFrom( object );

		resource.addType( RemoveMemberAction.TYPE );

		return resource;
	},
};

import { ModelFactory } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	BaseResource,
	TransientResource
} from "../Resource";
import { C } from "../Vocabularies";


export interface BaseAddMemberAction extends BaseResource {
	targetMembers:Pointer[];
}


export interface AddMemberAction extends TransientResource {
	targetMembers:Pointer[];
}


export interface AddMemberActionFactory extends ModelFactory<AddMemberAction> {
	TYPE:C[ "AddMemberAction" ];
	SCHEMA:ObjectSchema;

	is( value:any ):value is AddMemberAction;


	create<T extends object>( data:T & BaseAddMemberAction ):T & AddMemberAction;

	createFrom<T extends object>( data:T & BaseAddMemberAction ):T & AddMemberAction;
}

const SCHEMA:ObjectSchema = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export const AddMemberAction:AddMemberActionFactory = {
	TYPE: C.AddMemberAction,
	SCHEMA,

	is( value:any ):value is AddMemberAction {
		return TransientResource.is( value )
			&& value.hasType( AddMemberAction.TYPE )
			;
	},


	create<T extends object>( data:T & BaseAddMemberAction ):T & AddMemberAction {
		const copy:T & BaseAddMemberAction = Object.assign( {}, data );
		return AddMemberAction.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseAddMemberAction ):T & AddMemberAction {
		const resource:T & AddMemberAction = TransientResource.createFrom( object );

		resource.addType( AddMemberAction.TYPE );

		return resource;
	},
};

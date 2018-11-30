import { ModelFactory } from "../Model/ModelFactory";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { BaseResource } from "../Resource/BaseResource";
import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Base properties for a {@link AddMemberAction}.
 */
export interface BaseAddMemberAction extends BaseResource {
	/**
	 * The resources to be added as members.
	 */
	targetMembers:Pointer[];
}


/**
 * Model that represents a `c:AddMemberAction`.
 * This model is used as a request body for adding members.
 */
export interface AddMemberAction extends Resource {
	/**
	 * Resources to add as members.
	 */
	targetMembers:Pointer[];
}


/**
 * Factory, decorator and utils for {@link AddMemberAction}.
 */
// TODO: Change to type-alias
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

/**
 * Constant that implements {@link AddMemberActionFactory}.
 */
export const AddMemberAction:AddMemberActionFactory = {
	TYPE: C.AddMemberAction,
	SCHEMA,

	is( value:any ):value is AddMemberAction {
		return Resource.is( value )
			&& value.$hasType( AddMemberAction.TYPE )
			;
	},


	create<T extends object>( data:T & BaseAddMemberAction ):T & AddMemberAction {
		const copy:T & BaseAddMemberAction = Object.assign( {}, data );
		return AddMemberAction.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseAddMemberAction ):T & AddMemberAction {
		const resource:T & AddMemberAction = Resource.createFrom( object );

		resource.$addType( AddMemberAction.TYPE );

		return resource;
	},
};

import { ModelFactory } from "../Model/ModelFactory";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { BaseResource } from "../Resource/BaseResource";
import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Base properties for a {@link RemoveMemberAction}.
 */
export interface BaseRemoveMemberAction extends BaseResource {
	/**
	 * The resources to be removed as members.
	 */
	targetMembers:Pointer[];
}


/**
 * Model that represents a `c:RemoveMemberAction`.
 * This model is used as a request body for removing members.
 */
export interface RemoveMemberAction extends Resource {
	/**
	 * The resources to remove as members.
	 */
	targetMembers:Pointer[];
}


/**
 * Factory, decorator and utils for {@link RemoveMemberAction}.
 */
// TODO: Change to type-alias
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

/**
 * Constant with the factory, decorator and/or utils for a {@link RemoveMemberAction} object.
 */
export const RemoveMemberAction:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#RemoveMemberAction`.
	 */
	TYPE: C["RemoveMemberAction"];

	/**
	 * Schema for the object.
	 */
	SCHEMA: ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be a {@link RemoveMemberAction}.
	 */
	is( value:any ): value is RemoveMemberAction;

	/**
	 * Creates a {@link RemoveMemberAction} with the provided data.
	 */
	create<T extends object>( data:T & BaseRemoveMemberAction ): T & RemoveMemberAction;

	/**
	 * Creates a {@link RemoveMemberAction} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseRemoveMemberAction ):T & RemoveMemberAction;
} = <RemoveMemberActionFactory> {
	TYPE: C.RemoveMemberAction,
	SCHEMA,

	is( value:any ):value is RemoveMemberAction {
		return Resource.is( value )
			&& value.$hasType( RemoveMemberAction.TYPE )
			;
	},

	create<T extends object>( data:T & BaseRemoveMemberAction ):T & RemoveMemberAction {
		const copy:T & BaseRemoveMemberAction = Object.assign( {}, data );
		return RemoveMemberAction.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRemoveMemberAction ):T & RemoveMemberAction {
		const resource:T & RemoveMemberAction = Resource.createFrom( object );

		resource.$addType( RemoveMemberAction.TYPE );

		return resource;
	},
};

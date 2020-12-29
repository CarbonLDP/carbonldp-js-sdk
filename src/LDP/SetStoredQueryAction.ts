import { ModelFactory } from "../Model/ModelFactory";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { BaseResource } from "../Resource/BaseResource";
import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";


/**
 * Base properties for a {@link SetStoredQueryAction}.
 */
export interface BaseSetStoredQueryAction extends BaseResource {
	/**
	 * The new `c:storedQuery` for the `c:ExecutableQueryDocument`.
	 */
	storedQuery:string;
}


/**
 * Model that represents a `c:SetStoredQueryAction`.
 * This model is used as a request body for modifying a `c:ExecutableQueryDocument`'s `c:storedQuery`.
 */
export interface SetStoredQueryAction extends Resource {
	/**
	 * The `c:storedQuery` to have once modified.
	 */
	storedQuery:string;
}


/**
 * Factory, decorator and utils for {@link AddMemberAction}.
 */
// TODO: Change to type-alias
export interface SetStoredQueryActionFactory extends ModelFactory<SetStoredQueryAction> {
	TYPE:C[ "SetStoredQueryAction" ];
	SCHEMA:ObjectSchema;

	is( value:any ):value is SetStoredQueryAction;


	create<T extends object>( data:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction;

	createFrom<T extends object>( data:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction;
}

const SCHEMA:ObjectSchema = {
	"storedQuery": {
		"@id": C.storedQuery,
		"@type": XSD.string,
	},
};

/**
 * Constant with the factory, decorator and/or utils for an {@link SetStoredQueryAction} object.
 */
export const SetStoredQueryAction:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#SetStoredQueryAction`.
	 */
	TYPE:C["SetStoredQueryAction"];

	/**
	 * Schema for the object.
	 */
	SCHEMA:ObjectSchema;

	/**
	 * Returns true when the value provided is considered to be an {@link SetStoredQueryAction}.
	 */
	is( value:any ):value is SetStoredQueryAction;

	/**
	 * Creates a {@link AddMemberAction} with the provided data.
	 */
	create<T extends object>( data:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction;

	/**
	 * Creates a {@link AddMemberAction} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction;
} = <SetStoredQueryActionFactory> {
	TYPE: C.SetStoredQueryAction,
	SCHEMA,

	is( value:any ):value is SetStoredQueryAction {
		return Resource.is( value )
			&& value.$hasType( SetStoredQueryAction.TYPE )
			;
	},


	create<T extends object>( data:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction {
		const copy:T & BaseSetStoredQueryAction = Object.assign( {}, data );
		return SetStoredQueryAction.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseSetStoredQueryAction ):T & SetStoredQueryAction {
		const resource:T & SetStoredQueryAction = Resource.createFrom( object );

		resource.$addType( SetStoredQueryAction.TYPE );

		return resource;
	},
};

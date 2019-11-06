import { ModelFactory } from "../Model/ModelFactory";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


/**
 * Model that represents a `c:VolatileResource`.
 * This model represents a free resource that was dynamically generated.
 */
export interface VolatileResource extends Resource {
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link VolatileResource}.
 */
export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
	TYPE:C[ "VolatileResource" ];

	is( value:any ):value is VolatileResource;

	create<T extends object>( data?:T ):T & VolatileResource;

	createFrom<T extends object>( object:T ):T & VolatileResource;
}

/**
 * Constant with the factory, decorator and/or utils for a {@link VolatileResource} object.
 */
export const VolatileResource:{
	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#VolatileResource`.
	 */
	TYPE:C["VolatileResource"];

	/**
	 * Returns true when the value provided is considered to be a {@link VolatileResource}.
	 */
	is( value:any ):value is VolatileResource;

	/**
	 * Creates a {@link VolatileResource} with the provided data.
	 */
	create<T extends object>( data?:T ):T & VolatileResource;

	/**
	 * Creates a {@link VolatileResource} from the provided object.
	 */
	createFrom<T extends object>( object:T ):T & VolatileResource;
} = <VolatileResourceFactory> {
	TYPE: C.VolatileResource,

	is( value:any ):value is VolatileResource {
		return Resource.is( value )
			&& value.$hasType( VolatileResource.TYPE );
	},

	create<T extends object>( data?:T ):T & VolatileResource {
		const copy:T = Object.assign( {}, data );
		return VolatileResource.createFrom( copy );
	},

	createFrom<T extends object>( object:T ):T & VolatileResource {
		const resource:T & Resource = Resource.createFrom( object );
		resource.$addType( VolatileResource.TYPE );

		return resource;
	},
};

import { ModelFactory } from "../Model/ModelFactory";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";


export interface VolatileResource extends Resource {
}


export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
	TYPE:C[ "VolatileResource" ];

	is( value:any ):value is VolatileResource;

	create<T extends object>( data?:T ):T & VolatileResource;

	createFrom<T extends object>( object:T ):T & VolatileResource;
}

export const VolatileResource:VolatileResourceFactory = {
	TYPE: C.VolatileResource,

	is( value:any ):value is VolatileResource {
		return Resource.is( value )
			&& value.hasType( VolatileResource.TYPE );
	},

	create<T extends object>( data?:T ):T & VolatileResource {
		const copy:T = Object.assign( {}, data );
		return VolatileResource.createFrom( copy );
	},

	createFrom<T extends object>( object:T ):T & VolatileResource {
		const resource:T & Resource = Resource.createFrom( object );
		resource.addType( VolatileResource.TYPE );

		return resource;
	},
};

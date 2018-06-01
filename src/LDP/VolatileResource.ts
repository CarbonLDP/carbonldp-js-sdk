import { ModelFactory } from "../core/ModelFactory";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies/C";

export interface VolatileResource extends TransientResource {
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
		return TransientResource.is( value )
			&& value.hasType( VolatileResource.TYPE );
	},

	create<T extends object>( data?:T ):T & VolatileResource {
		const copy:T = Object.assign( {}, data );
		return VolatileResource.createFrom( copy );
	},

	createFrom<T extends object>( object:T ):T & VolatileResource {
		const resource:T & TransientResource = TransientResource.createFrom( object );
		resource.addType( VolatileResource.TYPE );

		return resource;
	},
};

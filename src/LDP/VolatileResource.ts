import { ModelFactory } from "../ModelFactory";
import { TransientResource } from "../TransientResource";
import { C } from "../Vocabularies/C";

export interface VolatileResource extends TransientResource {
}


export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
	TYPE:string;

	is( object:object ):object is VolatileResource;

	create():VolatileResource;

	createFrom<T extends object>( object:T ):T & VolatileResource;
}

export const VolatileResource:VolatileResourceFactory = {
	TYPE: C.VolatileResource,

	is( object:object ):object is VolatileResource {
		return TransientResource.is( object )
			&& object.hasType( VolatileResource.TYPE );
	},

	create():VolatileResource {
		return VolatileResource.createFrom( {} );
	},

	createFrom<T extends object>( object:T ):T & VolatileResource {
		const resource:T & TransientResource = TransientResource.createFrom( object );
		resource.addType( VolatileResource.TYPE );

		return resource;
	},

};

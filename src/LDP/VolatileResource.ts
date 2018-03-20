import { ModelFactory } from "../ModelFactory";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";

export interface VolatileResource extends Resource {
}


export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
	TYPE:string;

	is( object:object ):object is VolatileResource;


	createFrom<T extends object>( object:T ):T & VolatileResource;
}

export const VolatileResource:VolatileResourceFactory = {
	TYPE: C.VolatileResource,

	is( object:object ):object is VolatileResource {
		return Resource.is( object )
			&& object.hasType( VolatileResource.TYPE );
	},

	createFrom<T extends object>( object:T ):T & VolatileResource {
		const resource:T & Resource = Resource.createFrom( object );

		resource.addType( VolatileResource.TYPE );
		return resource;
	},

};

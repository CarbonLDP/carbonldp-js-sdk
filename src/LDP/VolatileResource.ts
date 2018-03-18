import { ModelFactory } from "../ModelFactory";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";

export interface VolatileResource extends Resource {
}


export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
	TYPE:string;

	is( object:object ):object is VolatileResource;
}

export const VolatileResource:VolatileResourceFactory = {
	TYPE: C.VolatileResource,

	is( object:object ):object is VolatileResource {
		return Resource.is( object )
			&& object.hasType( VolatileResource.TYPE );
	},

};

export default VolatileResource;

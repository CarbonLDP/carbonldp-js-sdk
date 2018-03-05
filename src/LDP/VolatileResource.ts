import { ModelFactory } from "../ModelFactory";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";

export interface VolatileResource extends Resource {
}


export interface VolatileResourceConstant extends ModelFactory<VolatileResource> {
	TYPE:string;

	is( object:object ):object is VolatileResource;
}

export const VolatileResource:VolatileResourceConstant = {
	TYPE: C.VolatileResource,

	is( object:object ):object is VolatileResource {
		return Resource.is( object )
			&& object.hasType( VolatileResource.TYPE );
	},

};

export default VolatileResource;

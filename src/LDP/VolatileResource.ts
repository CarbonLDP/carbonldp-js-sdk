import { C } from "../Vocabularies/C";
import { Resource } from "./../Resource";

export const RDF_CLASS:string = C.VolatileResource;

export interface Class extends Resource {

}

export class Factory {

	static is( object:object ):object is Class {
		return Resource.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

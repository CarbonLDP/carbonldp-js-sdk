import { C } from "../Vocabularies/C";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = C.VolatileResource;

export interface Class extends Resource.Class {

}

export class Factory {

	static is( object:object ):object is Class {
		return Resource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

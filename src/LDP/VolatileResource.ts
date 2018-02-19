import * as NS from "../Vocabularies/index";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.C.VolatileResource;

export interface Class extends Resource.Class {

}

export class Factory {

	static is( object:object ):object is Class {
		return Resource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

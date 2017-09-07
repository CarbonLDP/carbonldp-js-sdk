import * as NS from "./../NS";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.C.Class.VolatileResource;

export interface Class extends Resource.Class {

}

export class Factory {

	static is( object:object ):object is Class {
		return Resource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

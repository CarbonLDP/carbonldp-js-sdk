import * as NS from "./../NS";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.C.Class.VolatileResource;

export interface Class extends Resource.Class {

}

export class Factory {

	static is( object:Object ):boolean {
		return Resource.Factory.is( object )
			&& Factory.hasRDFClass( object );
	}

	static hasRDFClass( object:Object ):boolean {
		if ( ! object ) return false;

		let types:string[] = ( "@type" in object ) ? object[ "@type" ] : ( "types" in object ) ? (<Resource.Class> object).types : [];
		return types.indexOf( RDF_CLASS ) !== -1;
	}

}

export default Class;

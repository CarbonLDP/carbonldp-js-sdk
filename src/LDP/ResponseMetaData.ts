import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import Resource from "./../Resource";
import * as Utils from "./../Utils";
import * as VolatileResource from "./VolatileResource";

export const RDF_CLASS:string = NS.C.Class.ResponseMetaData;

export const SCHEMA:ObjectSchema.Class = {
	"eTag": {
		"@id": NS.C.Predicate.eTag,
		"@type": NS.XSD.DataType.string,
	},
	"responsePropertyResource": {
		"@id": NS.C.Predicate.responsePropertyResource,
		"@type": "@id",
	},
};

export interface Class extends VolatileResource.Class {
	eTag: string;
	responsePropertyResource: Pointer.Class;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "eTag" )
			&& Utils.hasPropertyDefined( object, "responsePropertyResource" );
	}

	static is( object:Object ):boolean {
		return VolatileResource.Factory.is( object )
			&& Factory.hasClassProperties( object )
			&& Factory.hasRDFClass( object );
	}

	static hasRDFClass( object:Object ):boolean {
		if ( ! object ) return false;

		let types:string[] = ( "@type" in object ) ? object[ "@type" ] : ( "types" in object ) ? (<Resource> object).types : [];
		return types.indexOf( RDF_CLASS ) !== -1;
	}

}

export default Class;

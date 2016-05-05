import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as ResponseMetaData from "./ResponseMetaData";
import Resource from "./../Resource";
import * as Utils from "../Utils";
import * as VolatileResource from "./VolatileResource";

export const RDF_CLASS:string = NS.C.Class.ResponseDescription;

export const SCHEMA:ObjectSchema.Class = {
	"responseProperties": {
		"@id": NS.C.Predicate.responseProperty,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource.Class {
	responseProperties: ResponseMetaData.Class[];
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "responseProperties" );
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

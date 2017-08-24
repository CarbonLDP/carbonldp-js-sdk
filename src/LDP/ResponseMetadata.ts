import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentMetadata from "./DocumentMetadata";
import * as VolatileResource from "./VolatileResource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.C.Class.ResponseMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"documentsMetadata": {
		"@id": NS.C.Predicate.documentMetadata,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource.Class {
	documentsMetadata:DocumentMetadata.Class[];
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResource.Factory.is( object )
			&& Utils.hasProperty( object, "documentsMetadata" )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

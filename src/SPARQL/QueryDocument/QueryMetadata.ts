import * as NS from "../../Vocabularies/index";
import * as ObjectSchema from "../../ObjectSchema";
import * as Pointer from "../../Pointer";
import * as VolatileResource from "../../LDP/VolatileResource";

export const RDF_CLASS:string = NS.C.QueryMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"target": {
		"@id": NS.C.target,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource.Class {
	target:Pointer.Class;
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

import * as VolatileResource from "../../LDP/VolatileResource";
import * as ObjectSchema from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { C } from "../../Vocabularies/C";

export const RDF_CLASS:string = C.QueryMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"target": {
		"@id": C.target,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource.Class {
	target:Pointer;
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

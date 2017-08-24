import * as NS from "./../NS";
import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Pointer } from "./../Pointer";
import { Class as Entry } from "./Entry";
import { Class as VolatileResource, Factory as VolatileResourceFactory } from "./VolatileResource";

export const RDF_CLASS:string = NS.C.Class.BNodesMapping;

export const SCHEMA:ObjectSchema = {
	"resource": {
		"@id": NS.C.Predicate.resource,
		"@type": "@id",
	},
	"entries": {
		"@id": NS.C.Predicate.entry,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends VolatileResource {
	resource:Pointer;
	entries:Entry[];
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResourceFactory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import { Class as BNodesMapping } from "./BNodesMapping";
import * as ResourceMetadata from "./ResourceMetadata";
import * as VolatileResource from "./VolatileResource";

export const RDF_CLASS:string = NS.C.Class.ResponseMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"resourcesMetadata": {
		"@id": NS.C.Predicate.resourceMetadata,
		"@type": "@id",
		"@container": "@set",
	},
	"bNodesMapping": {
		"@id": NS.C.Predicate.bNodesMapping,
		"@type": "@id",
	},
};

export interface Class extends VolatileResource.Class {
	resourcesMetadata?:ResourceMetadata.Class[];
	bNodesMapping?:BNodesMapping;
}

export class Factory {

	static is( object:object ):object is Class {
		return VolatileResource.Factory.is( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

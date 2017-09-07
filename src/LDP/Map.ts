import * as NS from "./../NS";
import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Entry } from "./Entry";
import { Class as Resource, Factory as ResourceFactory } from "./../Resource";

export const RDF_CLASS:string = NS.C.Class.Map;

export const SCHEMA:ObjectSchema = {
	"entries": {
		"@id": NS.C.Predicate.entry,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource {
	entries:Entry[];
}

export class Factory {

	static is( object:object ):object is Class {
		return ResourceFactory.is( object )
			&& object.hasType( RDF_CLASS )
			&& object.hasOwnProperty( "entries" );
	}

}

export default Class;

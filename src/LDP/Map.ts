import * as NS from "../Vocabularies/index";
import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Entry } from "./Entry";
import { Class as Resource, Factory as ResourceFactory } from "./../Resource";

export const RDF_CLASS:string = NS.C.Map;

export const SCHEMA:ObjectSchema = {
	"entries": {
		"@id": NS.C.entry,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class<K, V> extends Resource {
	entries:Entry<K, V>[];
}

export class Factory {

	static is( object:object ):object is Class<any, any> {
		return ResourceFactory.is( object )
			&& object.hasType( RDF_CLASS )
			&& object.hasOwnProperty( "entries" );
	}

}

export default Class;

import { ObjectSchema as ObjectSchema } from "../ObjectSchema";
import {
	Resource as Resource,
	Resource as ResourceFactory
} from "../Resource";
import { C } from "../Vocabularies/C";
import { Class as Entry } from "./Entry";

export const RDF_CLASS:string = C.Map;

export const SCHEMA:ObjectSchema = {
	"entries": {
		"@id": C.entry,
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

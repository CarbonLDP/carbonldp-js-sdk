import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import BlankNode from "./../BlankNode";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";
import * as Map from "./Map";
import * as VolatileResource from "./VolatileResource";

export const RDF_CLASS:string = C.DocumentMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"relatedDocument": {
		"@id": C.relatedDocument,
		"@type": "@id",
	},
	"eTag": {
		"@id": C.eTag,
		"@type": XSD.string,
	},
	"bNodesMap": {
		"@id": C.bNodesMap,
		"@type": "@id",
	},
};

export interface Class extends VolatileResource.Class {
	relatedDocument:PersistedDocument.Class;
	eTag?:string;
	bNodesMap?:Map.Class<BlankNode, BlankNode>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "relatedDocument" );
	}

	static is( object:Object ):boolean {
		return VolatileResource.Factory.is( object )
			&& Factory.hasClassProperties( object )
			&& object.hasType( RDF_CLASS );
	}

}

export default Class;

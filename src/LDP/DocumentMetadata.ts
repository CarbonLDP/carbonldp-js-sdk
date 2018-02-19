import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";
import * as VolatileResource from "./VolatileResource";
import * as Map from "./Map";
import BlankNode from "./../BlankNode";

export const RDF_CLASS:string = NS.C.DocumentMetadata;

export const SCHEMA:ObjectSchema.Class = {
	"relatedDocument": {
		"@id": NS.C.relatedDocument,
		"@type": "@id",
	},
	"eTag": {
		"@id": NS.C.eTag,
		"@type": NS.XSD.DataType.string,
	},
	"bNodesMap": {
		"@id": NS.C.bNodesMap,
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

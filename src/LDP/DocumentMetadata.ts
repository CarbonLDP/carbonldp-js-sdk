import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { Document } from "../Document";
import * as Utils from "../Utils";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
import { ModelFactory } from "../ModelFactory";
import { ModelDecorator } from "../ModelDecorator";

export interface DocumentMetadata extends VolatileResource {
	relatedDocument:Document;
	eTag?:string;
	bNodesMap?:Map<BlankNode, BlankNode>;
}


export interface DocumentMetadataFactory extends ModelFactory<DocumentMetadata>, ModelDecorator<DocumentMetadata> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is DocumentMetadata;

	is( object:object ):object is DocumentMetadata;
}

const SCHEMA:ObjectSchema = {
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

export const DocumentMetadata:DocumentMetadataFactory = {
	TYPE: C.DocumentMetadata,
	SCHEMA,

	isDecorated( object:object ):object is DocumentMetadata {
		return Utils.hasPropertyDefined( object, "relatedDocument" );
	},

	is( object:object ):object is DocumentMetadata {
		return VolatileResource.is( object )
			&& object.hasType( DocumentMetadata.TYPE )
			&& DocumentMetadata.isDecorated( object )
			;
	},

};

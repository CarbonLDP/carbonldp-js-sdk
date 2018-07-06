import { TransientBlankNode } from "../BlankNode";
import { ModelSchema } from "../Model/ModelSchema";
import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";

export interface DocumentMetadata extends VolatileResource {
	relatedDocument:Document;
	eTag?:string;
	bNodesMap?:Map<TransientBlankNode, TransientBlankNode>;
}


export interface DocumentMetadataFactory extends ModelSchema {
	TYPE:C[ "DocumentMetadata" ];
	SCHEMA:ObjectSchema;
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
};

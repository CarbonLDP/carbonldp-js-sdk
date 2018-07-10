import { Document } from "../Document";
import { ModelSchema } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	C,
	XSD
} from "../Vocabularies";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";


export interface DocumentMetadata extends VolatileResource {
	relatedDocument:Document;
	eTag?:string;
	bNodesMap?:Map<Pointer, Pointer>;
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

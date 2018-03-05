import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import * as Utils from "../Utils";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { CarbonMap } from "./CarbonMap";
import { VolatileResource } from "./VolatileResource";
import { ModelFactory } from "../ModelFactory";
import { ModelDecorator } from "../ModelDecorator";

export interface DocumentMetadata extends VolatileResource {
	relatedDocument:PersistedDocument;
	eTag?:string;
	bNodesMap?:CarbonMap<BlankNode, BlankNode>;
}


export interface DocumentMetadataConstant extends ModelFactory<DocumentMetadata>, ModelDecorator<DocumentMetadata> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is DocumentMetadata;

	is( object:object ):object is DocumentMetadata;
}

export const SCHEMA:ObjectSchema = {
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

export const DocumentMetadata:DocumentMetadataConstant = {
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

export default DocumentMetadata;

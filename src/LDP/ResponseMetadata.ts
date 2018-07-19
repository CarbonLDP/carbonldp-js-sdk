import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";


export interface ResponseMetadata extends VolatileResource {
	documentsMetadata?:DocumentMetadata[];
}


export interface ResponseMetadataFactory extends ModelSchema {
	TYPE:C[ "ResponseMetadata" ];
	SCHEMA:ObjectSchema;

	is( object:object ):object is ResponseMetadata;
}

const SCHEMA:ObjectSchema = {
	"documentsMetadata": {
		"@id": C.documentMetadata,
		"@type": "@id",
		"@container": "@set",
	},
};

export const ResponseMetadata:ResponseMetadataFactory = {
	TYPE: C.ResponseMetadata,
	SCHEMA,

	is( object:object ):object is ResponseMetadata {
		return VolatileResource.is( object )
			&& object.hasType( ResponseMetadata.TYPE );
	},

};

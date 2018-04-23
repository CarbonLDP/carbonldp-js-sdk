import { TokenCredentials } from "../Auth";
import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import {
	C,
	CS,
} from "../Vocabularies";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";


export interface ResponseMetadata extends VolatileResource {
	documentsMetadata?:DocumentMetadata[];
	authToken?:TokenCredentials;
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
	"authToken": {
		"@id": CS.authToken,
		"@type": "@id",
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

import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import {
	C,
	CS,
} from "../Vocabularies";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
import { TokenCredentials } from "../Auth";


export interface ResponseMetadata extends VolatileResource {
	documentsMetadata?:DocumentMetadata[];
	authToken?:TokenCredentials.Class;
}


export interface ResponseMetadataFactory extends ModelFactory<ResponseMetadata> {
	TYPE:string;
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

import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";


export interface ResponseMetadata extends VolatileResource {
	documentsMetadata?:DocumentMetadata[];
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
};

export const ResponseMetadata:ResponseMetadataFactory = {
	TYPE: C.ResponseMetadata,
	SCHEMA,

	is( object:object ):object is ResponseMetadata {
		return VolatileResource.is( object )
			&& object.hasType( ResponseMetadata.TYPE );
	},

};

export default ResponseMetadata;

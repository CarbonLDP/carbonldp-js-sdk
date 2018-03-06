import { VolatileResource } from "../../LDP/VolatileResource";
import { ModelFactory } from "../../ModelFactory";
import { ObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { C } from "../../Vocabularies/C";


export interface QueryMetadata extends VolatileResource {
	target:Pointer;
}


export interface QueryMetadataFactory extends ModelFactory<QueryMetadata> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( object:object ):object is QueryMetadata;
}

const SCHEMA:ObjectSchema = {
	"target": {
		"@id": C.target,
		"@type": "@id",
		"@container": "@set",
	},
};

export const QueryMetadata:QueryMetadataFactory = {
	TYPE: C.QueryMetadata,
	SCHEMA,

	is( object:object ):object is QueryMetadata {
		return VolatileResource.is( object )
			&& object.hasType( QueryMetadata.TYPE );
	},

};

export default QueryMetadata;

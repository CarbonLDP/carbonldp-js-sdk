import { ModelSchema } from "../Model";
import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { C } from "../Vocabularies";


export interface QueryMetadata extends VolatileResource {
	target:Pointer;
}


export interface QueryMetadataFactory extends ModelSchema {
	TYPE:string;
	SCHEMA:ObjectSchema;

	is( value:any ):value is QueryMetadata;
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

	is( value:any ):value is QueryMetadata {
		return VolatileResource.is( value )
			&& value.hasType( QueryMetadata.TYPE );
	},

};

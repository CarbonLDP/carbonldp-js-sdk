import { VolatileResource } from "../LDP/VolatileResource";
import { ModelSchema } from "../Model/ModelSchema";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";

import { QueryablePointer } from "./QueryablePointer";


export interface QueryMetadata extends VolatileResource {
	target:QueryablePointer;
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

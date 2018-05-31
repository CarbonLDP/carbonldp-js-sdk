import { ObjectSchema } from "../ObjectSchema";
import { Document } from "../Document";
import { C } from "../Vocabularies/C";
import { PlatformInstance } from "./PlatformInstance";


export interface PlatformMetadata extends Document {
	instance:PlatformInstance;
}


export interface PlatformMetadataFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"instance": {
		"@id": C.instance,
		"@type": "@id",
	},
};

export const PlatformMetadata:PlatformMetadataFactory = {
	TYPE: C.Platform,
	SCHEMA,
};


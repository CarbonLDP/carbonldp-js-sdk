import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import { C } from "../Vocabularies/C";
import { PlatformInstance } from "./PlatformInstance";


export interface PlatformMetadata extends PersistedDocument {
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


export default PlatformMetadata;

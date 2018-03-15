import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";


export interface PlatformMetadata extends VolatileResource, PersistedDocument {
	version:string;
	buildDate:Date;
}


export interface PlatformMetadataFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"version": {
		"@id": C.version,
		"@type": XSD.string,
	},
	"buildDate": {
		"@id": C.buildDate,
		"@type": XSD.dateTime,
	},
};

export const PlatformMetadata:PlatformMetadataFactory = {
	TYPE: C.Platform,
	SCHEMA,
};


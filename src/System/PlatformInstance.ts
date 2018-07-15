import { VolatileResource } from "../LDP/VolatileResource";

import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { PlatformMetadata } from "./PlatformMetadata";


export interface PlatformInstance extends VolatileResource {
	$registry:PlatformMetadata;

	buildDate:Date;
	version:string;
}


export interface PlatformInstanceFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
	"buildDate": {
		"@id": C.buildDate,
		"@type": XSD.dateTime,
	},
	"version": {
		"@id": C.version,
		"@type": XSD.string,
	},
};

export const PlatformInstance:PlatformInstanceFactory = {
	TYPE: C.PlatformInstance,
	SCHEMA,
};

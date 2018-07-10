import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import {
	C,
	XSD
} from "../Vocabularies";
import { PlatformMetadata } from "./PlatformMetadata";


export interface PlatformInstance extends VolatileResource {
	_registry:PlatformMetadata;

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

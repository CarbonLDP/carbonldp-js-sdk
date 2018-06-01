import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { Fragment } from "../Fragment";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";


export interface PlatformInstance extends VolatileResource, Fragment {
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

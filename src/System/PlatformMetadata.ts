import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import * as VolatileResource from "./../LDP/VolatileResource";
import * as ObjectSchema from "./../ObjectSchema";
import { PersistedDocument } from "./../PersistedDocument";

export const RDF_CLASS:string = C.Platform;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"version": {
		"@id": C.version,
		"@type": XSD.string,
	},
	"buildDate": {
		"@id": C.buildDate,
		"@type": XSD.dateTime,
	},
};

export interface Class extends VolatileResource.Class, PersistedDocument {
	version:string;
	buildDate:Date;
}

export default Class;

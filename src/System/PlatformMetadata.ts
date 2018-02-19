import * as VolatileResource from "./../LDP/VolatileResource";
import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";

export const RDF_CLASS:string = NS.C.Platform;

export const SCHEMA:ObjectSchema.Class = {
	"version": {
		"@id": NS.C.version,
		"@type": NS.XSD.DataType.string,
	},
	"buildDate": {
		"@id": NS.C.buildDate,
		"@type": NS.XSD.DataType.dateTime,
	},
};

export interface Class extends VolatileResource.Class, PersistedDocument.Class {
	version:string;
	buildDate:Date;
}

export default Class;

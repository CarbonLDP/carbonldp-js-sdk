import * as VolatileResource from "./../LDP/VolatileResource";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";


export const RDF_CLASS:string = NS.C.Class.Platform;

export const SCHEMA:ObjectSchema.Class = {
	"version": {
		"@id": NS.C.Predicate.version,
		"@type": NS.XSD.DataType.string,
	},
	"buildDate": {
		"@id": NS.C.Predicate.buildDate,
		"@type": NS.XSD.DataType.dateTime,
	},
};

export interface Class extends VolatileResource.Class  {
	version:string;
	buildDate:Date;
}

export default Class;

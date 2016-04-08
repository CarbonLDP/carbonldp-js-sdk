import * as Document from "./../Document";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";

export const RDF_CLASS:string = NS.LDP.Class.RDFSource;

export const SCHEMA:ObjectSchema.Class = {
	"created": {
		"@id": NS.C.Predicate.created,
		"@type": NS.XSD.DataType.dateTime,
	},
	"modified": {
		"@id": NS.C.Predicate.modified,
		"@type": NS.XSD.DataType.dateTime,
	},
};

export interface Class extends Document.Class {
	created:Date;
	modified:Date;
}

export class Factory {

}

export default Class;

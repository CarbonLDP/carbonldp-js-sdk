import * as NS from "./../NS";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";

export const RDF_CLASS:string = NS.C.Class.Error;

export const SCHEMA:ObjectSchema = {
	"carbonCode": {
		"@id": NS.C.Predicate.carbonCode,
		"@type": NS.XSD.DataType.string,
	},
	"message": {
		"@id": NS.C.Predicate.message,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Resource {
	carbonCode:string;
	message:string;
}

export default Class;

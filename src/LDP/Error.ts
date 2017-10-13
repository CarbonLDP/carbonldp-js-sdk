import * as NS from "./../NS";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
import Map from "./Map";

export const RDF_CLASS:string = NS.C.Class.Error;

export const SCHEMA:ObjectSchema = {
	"errorCode": {
		"@id": NS.C.Predicate.errorCode,
		"@type": NS.XSD.DataType.string,
	},
	"errorMessage": {
		"@id": NS.C.Predicate.errorMessage,
		"@language": "en",
	},
	"errorParameters": {
		"@id": NS.C.Predicate.errorParameters,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	errorCode:string;
	errorMessage:string;
	errorParameters:Map<string, any>;
}

export default Class;

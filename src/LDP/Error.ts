import * as NS from "../Vocabularies/index";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
import Map from "./Map";

export const RDF_CLASS:string = NS.C.Error;

export const SCHEMA:ObjectSchema = {
	"errorCode": {
		"@id": NS.C.errorCode,
		"@type": NS.XSD.string,
	},
	"errorMessage": {
		"@id": NS.C.errorMessage,
		"@language": "en",
	},
	"errorParameters": {
		"@id": NS.C.errorParameters,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	errorCode:string;
	errorMessage:string;
	errorParameters:Map<string, any>;
}

export default Class;

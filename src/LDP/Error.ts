import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
import Map from "./CarbonMap";

export const RDF_CLASS:string = C.Error;

export const SCHEMA:ObjectSchema = {
	"errorCode": {
		"@id": C.errorCode,
		"@type": XSD.string,
	},
	"errorMessage": {
		"@id": C.errorMessage,
		"@language": "en",
	},
	"errorParameters": {
		"@id": C.errorParameters,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	errorCode:string;
	errorMessage:string;
	errorParameters:Map<string, any>;
}

export default Class;

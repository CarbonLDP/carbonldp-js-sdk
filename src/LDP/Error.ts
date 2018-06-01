import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../Resource";
import { Map } from "./Map";


export interface Error extends TransientResource {
	errorCode:string;
	errorMessage:string;
	errorParameters:Map<string, any>;
}


export interface ErrorFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
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

export const Error:ErrorFactory = {
	TYPE:C.Error,
	SCHEMA,
};


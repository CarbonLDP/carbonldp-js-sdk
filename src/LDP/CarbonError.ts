import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { CarbonMap } from "./CarbonMap";


export interface CarbonError extends Resource {
	errorCode:string;
	errorMessage:string;
	errorParameters:CarbonMap<string, any>;
}


export interface CarbonErrorFactory {
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

export const CarbonError:CarbonErrorFactory = {
	TYPE:C.Error,
	SCHEMA,
};


export default CarbonError;

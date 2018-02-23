import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = C.ValidationError;

export const SCHEMA:ObjectSchema.Class = {
	"errorDetails": {
		"@id": C.errorDetails,
		"@type": "@id",
	},
};

export interface Class extends Resource.Class {
	errorDetails:Pointer;
}

export default Class;

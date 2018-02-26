import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";

export const RDF_CLASS:string = C.ValidationError;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"errorDetails": {
		"@id": C.errorDetails,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	errorDetails:Pointer;
}

export default Class;

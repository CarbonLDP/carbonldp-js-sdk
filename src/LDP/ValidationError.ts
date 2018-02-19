import * as NS from "../Vocabularies/index";
import * as Resource from "./../Resource";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";

export const RDF_CLASS:string = NS.C.ValidationError;

export const SCHEMA:ObjectSchema.Class = {
	"errorDetails": {
		"@id": NS.C.errorDetails,
		"@type": "@id",
	},
};

export interface Class extends Resource.Class {
	errorDetails:Pointer.Class;
}

export default Class;

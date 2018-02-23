import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";

export const RDF_CLASS:string = C.DocumentCreatedDetails;

export const SCHEMA:ObjectSchema.Class = {
	"createdDocuments": {
		"@id": C.createdDocument,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource {
	createdDocuments:Pointer[];
}

export default Class;

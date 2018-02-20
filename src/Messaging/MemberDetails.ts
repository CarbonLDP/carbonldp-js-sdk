import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

export const SCHEMA:ObjectSchema.Class = {
	"members": {
		"@id": C.member,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource.Class {
	members:Pointer.Class[];
}

export default Class;

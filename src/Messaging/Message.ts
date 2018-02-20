import { hasProperty } from "../Utils";
import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

export const SCHEMA:ObjectSchema.Class = {
	"target": {
		"@id": C.target,
		"@type": "@id",
	},
};

export interface Class extends Resource.Class {
	target:Pointer.Class;
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return hasProperty( object, "target" );
	}
}

export default Class;

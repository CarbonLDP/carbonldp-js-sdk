import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
import { hasProperty } from "../Utils";

export const SCHEMA:ObjectSchema.Class = {
	"target": {
		"@id": NS.C.Predicate.target,
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

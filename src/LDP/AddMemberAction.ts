import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = C.AddMemberAction;

export const SCHEMA:ObjectSchema.Class = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource {
	targetMembers:Pointer[];
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	}

	static create( targetMembers:Pointer[] ):Class {
		return Resource.createFrom( {
			types: [ RDF_CLASS ],
			targetMembers,
		} );
	}
}

export default Class;

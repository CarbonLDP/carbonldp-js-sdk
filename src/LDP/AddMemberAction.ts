import { C } from "../Vocabularies/C";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = C.AddMemberAction;

export const SCHEMA:ObjectSchema.Class = {
	"targetMembers": {
		"@id": C.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource.Class {
	targetMembers:Pointer.Class[];
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	}

	static create( targetMembers:Pointer.Class[] ):Class {
		return Resource.Factory.createFrom( {
			types: [ RDF_CLASS ],
			targetMembers,
		} );
	}
}

export default Class;

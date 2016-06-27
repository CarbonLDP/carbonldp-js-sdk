import * as Document from "./../Document";
import * as Fragment from "./../Fragment";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.C.Class.AddMemberAction;

export const SCHEMA:ObjectSchema.Class = {
	"targetMembers": {
		"@id": NS.C.Predicate.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Fragment.Class {
	targetMembers:Pointer.Class[];
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "targetMembers" );
	}

	static createDocument( targetMembers:Pointer.Class[] ):Document.Class {
		let document:Document.Class = Document.Factory.create();

		let fragment:Class = document.createFragment( {targetMembers: targetMembers} );
		fragment.types.push( RDF_CLASS );

		return document;
	}
}

export default Class;

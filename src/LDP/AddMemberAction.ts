import * as Document from "./../Document";
import * as Fragment from "./../Fragment";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.C.Class.AddMemberAction;

export const SCHEMA:ObjectSchema.Class = {
	"targetMember": {
		"@id": NS.C.Predicate.targetMember,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Fragment.Class {
	targetMember:Pointer.Class;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "targetMember" );
	}

	static createDocument( targetMember:Pointer.Class ):Document.Class {
		let document:Document.Class = Document.Factory.create();

		let fragment:Class = document.createFragment( { targetMember: targetMember } );
		fragment.types.push( RDF_CLASS );

		return document;
	}
}

export default Class;

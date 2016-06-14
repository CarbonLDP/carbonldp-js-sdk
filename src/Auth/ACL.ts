import * as ACE from "./ACE";
import IllegalArgumentError from "../Errors/IllegalArgumentError";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Document from "./../Document";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.AccessControlList;

export const SCHEMA:ObjectSchema.Class = {
	"entries": {
		"@id": NS.CS.Predicate.accessControlEntry,
		"@type": "@id",
		"@container": "@set",
	},
	"accessTo": {
		"@id": NS.CS.Predicate.accessTo,
		"@type": "@id",
	},
	"inheritableEntries": {
		"@id": NS.CS.Predicate.inheritableEntry,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Document.Class {
	accessTo: Pointer.Class;
	entries?: ACE.Class[];
	inheritableEntries?: ACE.Class[];
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" );
	}

	static decorate<T extends Object>( object:T ):T & Class {
		let acl:T & Class = <any> object;

		if ( Factory.hasClassProperties( acl ) ) return acl;

		return acl;
	}

}

export default Class;

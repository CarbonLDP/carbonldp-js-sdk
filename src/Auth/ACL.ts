import * as ACE from "./ACE";
import IllegalArgumentError from "../Errors/IllegalArgumentError";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.AccessControlList;

export const SCHEMA:ObjectSchema.Class = {
	"accessControlEntries": {
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

export interface Class extends PersistedDocument.Class {
	accessTo: Pointer.Class;
	accessControlEntries?: ACE.Class[];
	inheritableEntries?: ACE.Class[];
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" );
	}

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		if ( ! PersistedDocument.Factory.is( document ) ) throw new IllegalArgumentError( "The object provided must be a PersistedDocument." );

		let acl:T & Class = <any> document;

		if ( Factory.hasClassProperties( acl ) ) return acl;

		return acl;
	}

}

export default Class;

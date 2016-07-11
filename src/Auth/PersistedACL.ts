import * as ACL from "./ACL";
import * as PersistedACE from "./PersistedACE";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	accessTo:Pointer.Class;
	entries?:PersistedACE.Class[];
	inheritableEntries?:PersistedACE.Class[];
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" );
	}

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		let acl:T & Class = <any> document;

		if( Factory.hasClassProperties( acl ) ) return acl;

		return acl;
	}

}

export default Class;

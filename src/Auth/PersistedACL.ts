import * as ACL from "./ACL";
import * as PersistedACE from "./PersistedACE";
import IllegalArgumentError from "../Errors/IllegalArgumentError";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	accessTo: Pointer.Class;
	accessControlEntries?: PersistedACE.Class[];
	inheritableEntries?: PersistedACE.Class[];
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" );
	}

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		if ( ! PersistedDocument.Factory.is( document ) ) throw new IllegalArgumentError( "The object provided must be a PersistedDocument." );
		if ( ! ACL.Factory.hasClassProperties( document ) ) throw new IllegalArgumentError( "The object provided must contains the form of an ACL." );

		let acl:T & Class = <any> ACL.Factory.decorate( document );

		if ( Factory.hasClassProperties( acl ) ) return acl;

		return acl;
	}

}

export default Class;

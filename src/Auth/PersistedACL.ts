import * as ACL from "./ACL";
import * as PersistedACE from "./PersistedACE";
import IllegalArgumentError from "../Errors/IllegalArgumentError";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	accessTo:Pointer.Class;
	entries?:PersistedACE.Class[];
	inheritableEntries?:PersistedACE.Class[];

	grant( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	grant( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
	grant( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	grant( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;

	deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
	deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;

	configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
	configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
	configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;

	grants( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean;
	denies( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean;
	getChildInheritance( subject:string | Pointer.Class, permissions:string | Pointer.Class ):boolean;

	remove( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
	remove( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
	removeChildInheritance( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
	removeChildInheritance( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" );
	}

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		let acl:T & Class = <any> ACL.Factory.decorate( document );

		if( Factory.hasClassProperties( acl ) ) return acl;

		return acl;
	}

}

export default Class;

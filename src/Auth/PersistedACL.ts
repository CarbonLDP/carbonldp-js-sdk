import * as ACL from "./ACL";
import { PersistedACE } from "./PersistedACE";
import * as PersistedDocument from "./../PersistedDocument";
import { Pointer } from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	accessTo:Pointer;
	entries?:PersistedACE[];
	inheritableEntries?:PersistedACE[];

	_parsePointer( element:string | Pointer ):Pointer;

	grant( subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;

	grant( subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	grant( subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;

	grant( subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	deny( subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;

	deny( subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	deny( subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;

	deny( subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	configureChildInheritance( granting:boolean, subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;

	configureChildInheritance( granting:boolean, subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	configureChildInheritance( granting:boolean, subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;

	configureChildInheritance( granting:boolean, subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;

	grants( subject:string | Pointer, permission:string | Pointer ):boolean;

	denies( subject:string | Pointer, permission:string | Pointer ):boolean;

	getChildInheritance( subject:string | Pointer, permissions:string | Pointer ):boolean;

	remove( subject:string | Pointer, permission:string | Pointer ):void;

	remove( subject:string | Pointer, permissions:(string | Pointer)[] ):void;

	removeChildInheritance( subject:string | Pointer, permission:string | Pointer ):void;

	removeChildInheritance( subject:string | Pointer, permissions:(string | Pointer)[] ):void;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessTo" )
			;
	}

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		let acl:T & Class = <any> ACL.Factory.decorate( document );

		Object.defineProperties( acl, {
			"_parsePointer": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: parsePointer,
			},
		} );

		// Check consistency in ACE
		// TODO: Possible removal when resolved: CarbonLDP/public-carbonldp-platform#2
		let removeInvalidACE:( ace:PersistedACE ) => void = ( ace ) => {
			if( ! ace.subjects ) acl._removeFragment( ace );
			return ! ! ace.subjects;
		};
		if( acl.entries ) acl.entries = acl.entries.filter( removeInvalidACE );
		if( acl.inheritableEntries ) acl.inheritableEntries = acl.inheritableEntries.filter( removeInvalidACE );


		return acl;
	}

}

function parsePointer( this:Class, element:string | Pointer ):Pointer {
	return Utils.isObject( element ) ? element : this.getPointer( element );
}

export default Class;

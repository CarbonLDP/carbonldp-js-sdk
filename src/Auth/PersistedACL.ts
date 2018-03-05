import { PersistedDocument } from "../PersistedDocument";
import { Pointer } from "../Pointer";
import * as Utils from "../Utils";
import { ACL } from "./ACL";
import { PersistedACE } from "./PersistedACE";
import { ModelDecorator } from "../ModelDecorator";
import { Documents } from "../Documents";

export interface PersistedACL extends PersistedDocument {
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


export interface PersistedACLConstant extends ModelDecorator<PersistedACL> {
	isDecorated( object:object ):object is PersistedACL;


	decorate<T extends object>( object:T, documents:Documents ):T & PersistedACL;
}


export const PersistedACL:PersistedACLConstant = {
	isDecorated( object:object ):object is PersistedACL {
		return Utils.hasPropertyDefined( object, "accessTo" )
			&& object[ "_parsePointer" ] === parsePointer
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedACL {
		if( PersistedACL.isDecorated( object ) ) return object;

		ACL.decorate( object );
		PersistedDocument.decorate( object, documents );

		const acl:T & PersistedACL = object as T & PersistedACL;
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
	},
};

function parsePointer( this:PersistedACL, element:string | Pointer ):Pointer {
	return Utils.isObject( element ) ? element : this.getPointer( element );
}

export default PersistedACL;

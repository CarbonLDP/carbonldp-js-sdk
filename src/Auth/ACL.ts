import { Document } from "../Document";
import { Pointer } from "../Pointer";
import * as Utils from "../Utils";
import { TransientACL } from "./TransientACL";
import { PersistedACE } from "./PersistedACE";
import { ModelDecorator } from "../ModelDecorator";
import { Documents } from "../Documents";

export interface ACL extends Document {
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


export interface ACLFactory extends ModelDecorator<ACL> {
	isDecorated( object:object ):object is ACL;


	decorate<T extends object>( object:T, documents:Documents ):T & ACL;
}


export const ACL:ACLFactory = {
	isDecorated( object:object ):object is ACL {
		return Utils.hasPropertyDefined( object, "accessTo" )
			&& object[ "_parsePointer" ] === parsePointer
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & ACL {
		if( ACL.isDecorated( object ) ) return object;

		TransientACL.decorate( object );
		Document.decorate( object, documents );

		const acl:T & ACL = object as T & ACL;
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

function parsePointer( this:ACL, element:string | Pointer ):Pointer {
	return Utils.isObject( element ) ? element : this.getPointer( element );
}

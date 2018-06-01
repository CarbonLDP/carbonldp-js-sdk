import { ModelDecorator } from "../../core/ModelDecorator";
import { ModelSchema } from "../../core/ModelSchema";
import { Document } from "../../Document";
import { Documents } from "../../Documents";
import { ObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { ProtectedDocument } from "../../ProtectedDocument";
import { isObject } from "../../Utils";
import { CS } from "../../Vocabularies";
import { ACE } from "../ACE";
import { TransientACL } from "./TransientACL";


export interface ACL extends Document {
	accessTo?:ProtectedDocument;
	entries?:ACE[];
	inheritableEntries?:ACE[];

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


export interface ACLFactory extends ModelDecorator<ACL>, ModelSchema {
	TYPE:CS[ "AccessControlList" ];
	SCHEMA:ObjectSchema;


	isDecorated( object:object ):object is ACL;


	decorate<T extends object>( object:T, documents:Documents ):T & ACL;
}


export const ACL:ACLFactory = {
	TYPE: CS.AccessControlList,
	SCHEMA: {
		"entries": {
			"@id": CS.accessControlEntry,
			"@type": "@id",
			"@container": "@set",
		},
		"accessTo": {
			"@id": CS.accessTo,
			"@type": "@id",
		},
		"inheritableEntries": {
			"@id": CS.inheritableEntry,
			"@type": "@id",
			"@container": "@set",
		},
	},


	isDecorated( object:object ):object is ACL {
		return isObject( object )
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
		let removeInvalidACE:( ace:ACE ) => void = ( ace ) => {
			if( ! ace.subjects ) acl._removeFragment( ace );
			return ! ! ace.subjects;
		};
		if( acl.entries ) acl.entries = acl.entries.filter( removeInvalidACE );
		if( acl.inheritableEntries ) acl.inheritableEntries = acl.inheritableEntries.filter( removeInvalidACE );


		return acl;
	},
};

function parsePointer( this:ACL, element:string | Pointer ):Pointer {
	return isObject( element ) ? element : this.getPointer( element );
}

import { ModelDecorator } from "../core/ModelDecorator";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies/CS";
import { TransientDocument } from "../Document";
import { TransientACE } from "./TransientACE";

export interface TransientACL extends TransientDocument {
	accessTo:Pointer;
	entries?:TransientACE[];
	inheritableEntries?:TransientACE[];

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


export interface TransientACLFactory extends ModelDecorator<TransientACL> {
	TYPE:string;
	SCHEMA:ObjectSchema;

	isDecorated( object:object ):object is TransientACL;


	decorate<T extends object>( object:T ):T & TransientACL;
}


const SCHEMA:ObjectSchema = {
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
};

export const TransientACL:TransientACLFactory = {
	TYPE: CS.AccessControlList,
	SCHEMA,

	isDecorated( object:object ):object is TransientACL {
		return Utils.hasPropertyDefined( object, "accessTo" )
			&& Utils.hasFunction( object, "_parsePointer" )
			&& Utils.hasFunction( object, "grant" )
			&& Utils.hasFunction( object, "deny" )
			&& Utils.hasFunction( object, "configureChildInheritance" )
			&& Utils.hasFunction( object, "grants" )
			&& Utils.hasFunction( object, "denies" )
			&& Utils.hasFunction( object, "getChildInheritance" )
			&& Utils.hasFunction( object, "remove" )
			&& Utils.hasFunction( object, "removeChildInheritance" );
	},

	decorate<T extends object>( object:T ):T & TransientACL {
		if( TransientACL.isDecorated( object ) ) return object;

		TransientDocument.decorate( object );

		const acl:T & TransientACL = object as T & TransientACL;
		Object.defineProperties( acl, {
			"_parsePointer": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: parsePointer,
			},
			"grant": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: grant,
			},
			"deny": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: deny,
			},
			"configureChildInheritance": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: configureChildInheritance,
			},
			"grants": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: grants,
			},
			"denies": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: denies,
			},
			"getChildInheritance": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getChildInheritance,
			},
			"remove": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: remove,
			},
			"removeChildInheritance": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeChildInheritance,
			},
		} );

		return acl;
	},

};

function parsePointer( element:string | Pointer ):Pointer {
	return Pointer.is( element ) ? element : Pointer.create( { id: element } );
}

function parsePointers( elements:string | Pointer | (string | Pointer)[] ):Pointer[] {
	let elementsArray:(string | Pointer)[] = Utils.isArray( elements ) ? <(string | Pointer)[]> elements : [ <string | Pointer> elements ];
	return elementsArray.map( ( element:string | Pointer ) => (this as TransientACL)._parsePointer( element ) );
}

function configACE( granting:boolean, subject:Pointer, subjectClass:Pointer, permissions:Pointer[], aces:TransientACE[] ):TransientACE {
	let subjectACEs:TransientACE[] = aces.filter( _ => _.subjects.length === 1 && _.granting === granting && Pointer.areEqual( _.subjects[ 0 ], subject ) );

	let ace:TransientACE;
	if( subjectACEs.length === 0 ) {
		ace = TransientACE.createFrom( (<TransientACL> this).createFragment(), granting, [ subject ], subjectClass, [] );
		aces.push( ace );
	} else {
		ace = subjectACEs[ 0 ];
	}

	Array.prototype.push.apply( ace.permissions, permissions );
	return ace;
}

function configACEs( granting:boolean, subjects:string | Pointer | (string | Pointer)[], subjectsClass:string | Pointer, permissions:string | Pointer | (string | Pointer)[], aces:TransientACE[] ):void {
	let subjectPointers:Pointer[] = parsePointers.call( this, subjects );
	let subjectClassPointer:Pointer = (this as TransientACL)._parsePointer( subjectsClass );
	let permissionPointers:Pointer[] = parsePointers.call( this, permissions );

	for( let subject of subjectPointers ) {
		removePermissionsFrom.call( this, subject, permissionPointers, aces );
		configACE.call( this, granting, subject, subjectClassPointer, permissionPointers, aces );
	}
}

function grant( subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;
function grant( subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function grant( subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;
function grant( subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function grant( subjects:string | Pointer | (string | Pointer)[], subjectsClass:string | Pointer, permissions:string | Pointer | (string | Pointer)[] ):void {
	let acl:TransientACL = this;
	acl.entries = acl.entries || [];
	configACEs.call( this, true, subjects, subjectsClass, permissions, acl.entries );
}

function deny( subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;
function deny( subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function deny( subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;
function deny( subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function deny( subjects:string | Pointer | (string | Pointer)[], subjectsClass:string | Pointer, permissions:string | Pointer | (string | Pointer)[] ):void {
	let acl:TransientACL = this;
	acl.entries = acl.entries || [];
	configACEs.call( this, false, subjects, subjectsClass, permissions, acl.entries );
}

function configureChildInheritance( granting:boolean, subject:string | Pointer, subjectClass:string | Pointer, permission:string | Pointer ):void;
function configureChildInheritance( granting:boolean, subject:string | Pointer, subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer)[], subjectClass:string | Pointer, permission:string | Pointer ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer)[], subjectClass:string | Pointer, permissions:(string | Pointer)[] ):void;
function configureChildInheritance( granting:boolean, subjects:string | Pointer | (string | Pointer)[], subjectsClass:string | Pointer, permissions:string | Pointer | (string | Pointer)[] ):void {
	let acl:TransientACL = this;
	acl.inheritableEntries = acl.inheritableEntries || [];
	configACEs.call( this, granting, subjects, subjectsClass, permissions, acl.inheritableEntries );
}

function grantingFrom( subject:Pointer, permission:Pointer, aces:TransientACE[] ):boolean {
	let subjectACEs:TransientACE[] = aces.filter( ace => Utils.ArrayUtils.indexOf( ace.subjects, subject, Pointer.areEqual ) !== - 1 );

	for( let ace of subjectACEs ) {
		if( Utils.ArrayUtils.indexOf( ace.permissions, permission, Pointer.areEqual ) !== - 1 )
			return ace.granting;
	}
	return null;
}

function getGranting( subject:string | Pointer, permission:string | Pointer, aces:TransientACE[] ):boolean {
	if( ! aces ) return null;

	let subjectPointer:Pointer = (this as TransientACL)._parsePointer( subject );
	let permissionPointer:Pointer = (this as TransientACL)._parsePointer( permission );

	return grantingFrom( subjectPointer, permissionPointer, aces );
}

function grants( subject:string | Pointer, permission:string | Pointer ):boolean {
	let acl:TransientACL = this;
	return getGranting.call( this, subject, permission, acl.entries );
}

function denies( subject:string | Pointer, permission:string | Pointer ):boolean {
	let acl:TransientACL = this;
	let granting:boolean = getGranting.call( this, subject, permission, acl.entries );
	return granting === null ? null : ! granting;
}

function getChildInheritance( subject:string | Pointer, permission:string | Pointer ):boolean {
	let acl:TransientACL = this;
	return getGranting.call( this, subject, permission, acl.inheritableEntries );
}

function removePermissionsFrom( subject:Pointer, permissions:Pointer[], aces:TransientACE[] ):void {
	if( ! aces ) return;

	let acl:TransientACL = <TransientACL> this;
	let opposedAces:TransientACE[] = acl.entries === aces ? acl.inheritableEntries : acl.entries;

	let subjectACEs:TransientACE[] = aces.filter( ace => Utils.ArrayUtils.indexOf( ace.subjects, subject, Pointer.areEqual ) !== - 1 );
	for( let ace of subjectACEs ) {
		if( opposedAces && Utils.ArrayUtils.indexOf( opposedAces, ace, Pointer.areEqual ) !== - 1 ) {
			aces.splice( Utils.ArrayUtils.indexOf( aces, ace, Pointer.areEqual ), 1 );

			let newACE:TransientACE = configACE.call( this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces );
			subjectACEs.push( newACE );
			continue;
		}

		if( ace.subjects.length > 1 ) {
			ace.subjects.splice( Utils.ArrayUtils.indexOf( ace.subjects, subject, Pointer.areEqual ), 1 );

			let newACE:TransientACE = configACE.call( this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces );
			subjectACEs.push( newACE );
			continue;
		}

		for( let permission of permissions ) {
			let index:number = Utils.ArrayUtils.indexOf( ace.permissions, permission, Pointer.areEqual );

			if( index === - 1 ) continue;
			ace.permissions.splice( index, 1 );
		}

		if( ace.permissions.length === 0 ) {
			aces.splice( Utils.ArrayUtils.indexOf( aces, ace, Pointer.areEqual ), 1 );
			acl._removeFragment( ace );
		}
	}
}

function removePermissions( subject:string | Pointer, permissions:string | Pointer | (string | Pointer)[], aces:TransientACE[] ):void {
	let subjectPointer:Pointer = (this as TransientACL)._parsePointer( subject );
	let permissionPointers:Pointer[] = parsePointers.call( this, permissions );
	removePermissionsFrom.call( this, subjectPointer, permissionPointers, aces );
}

function remove( subject:string | Pointer, permission:string | Pointer ):void;
function remove( subject:string | Pointer, permissions:(string | Pointer)[] ):void;
function remove( subject:string | Pointer, permissions:string | Pointer | (string | Pointer)[] ):void {
	let acl:TransientACL = this;
	removePermissions.call( this, subject, permissions, acl.entries );
}

function removeChildInheritance( subject:string | Pointer, permission:string | Pointer ):void;
function removeChildInheritance( subject:string | Pointer, permissions:(string | Pointer)[] ):void;
function removeChildInheritance( subject:string | Pointer, permissions:string | Pointer | (string | Pointer)[] ):void {
	let acl:TransientACL = this;
	removePermissions.call( this, subject, permissions, acl.inheritableEntries );
}

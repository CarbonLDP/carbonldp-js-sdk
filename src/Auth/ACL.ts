import * as ACE from "./ACE";
import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Document from "./../Document";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.AccessControlList;

export const SCHEMA:ObjectSchema.Class = {
	"entries": {
		"@id": NS.CS.accessControlEntry,
		"@type": "@id",
		"@container": "@set",
	},
	"accessTo": {
		"@id": NS.CS.accessTo,
		"@type": "@id",
	},
	"inheritableEntries": {
		"@id": NS.CS.inheritableEntry,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Document.Class {
	accessTo:Pointer.Class;
	entries?:ACE.Class[];
	inheritableEntries?:ACE.Class[];

	_parsePointer( element: string | Pointer.Class ):Pointer.Class;

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
	}

	static decorate<T extends Object>( object:T ):T & Class {
		let acl:T & Class = <any> object;

		if( Factory.hasClassProperties( acl ) ) return acl;

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
	}

}

function parsePointer( element:string | Pointer.Class ):Pointer.Class {
	return Pointer.Factory.is( element ) ? <Pointer.Class> element : Pointer.Factory.create( <string> element );
}

function parsePointers( elements:string | Pointer.Class | (string | Pointer.Class)[] ):Pointer.Class[] {
	let elementsArray:(string | Pointer.Class)[] = Utils.isArray( elements ) ? <(string | Pointer.Class)[]> elements : [ <string | Pointer.Class> elements ];
	return elementsArray.map( ( element:string | Pointer.Class ) => (this as Class)._parsePointer( element ) );
}

function configACE( granting:boolean, subject:Pointer.Class, subjectClass:Pointer.Class, permissions:Pointer.Class[], aces:ACE.Class[] ):ACE.Class {
	let subjectACEs:ACE.Class[] = aces.filter( ace => ace.subjects.length === 1 && ace.granting === granting && Pointer.Util.areEqual( ace.subjects[ 0 ], subject ) );

	let ace:ACE.Class;
	if( subjectACEs.length === 0 ) {
		ace = ACE.Factory.createFrom( (<Class> this).createFragment(), granting, [ subject ], subjectClass, [] );
		aces.push( ace );
	} else {
		ace = subjectACEs[ 0 ];
	}

	Array.prototype.push.apply( ace.permissions, permissions );
	return ace;
}
function configACEs( granting:boolean, subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[], aces:ACE.Class[] ):void {
	let subjectPointers:Pointer.Class[] = parsePointers.call( this, subjects );
	let subjectClassPointer:Pointer.Class = (this as Class)._parsePointer( subjectsClass );
	let permissionPointers:Pointer.Class[] = parsePointers.call( this, permissions );

	for( let subject of subjectPointers ) {
		removePermissionsFrom.call( this, subject, permissionPointers, aces );
		configACE.call( this, granting, subject, subjectClassPointer, permissionPointers, aces );
	}
}
function grant( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function grant( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function grant( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function grant( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function grant( subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let acl:Class = this;
	acl.entries = acl.entries || [];
	configACEs.call( this, true, subjects, subjectsClass, permissions, acl.entries );
}
function deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function deny( subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let acl:Class = this;
	acl.entries = acl.entries || [];
	configACEs.call( this, false, subjects, subjectsClass, permissions, acl.entries );
}
function configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function configureChildInheritance( granting:boolean, subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let acl:Class = this;
	acl.inheritableEntries = acl.inheritableEntries || [];
	configACEs.call( this, granting, subjects, subjectsClass, permissions, acl.inheritableEntries );
}

function grantingFrom( subject:Pointer.Class, permission:Pointer.Class, aces:ACE.Class[] ):boolean {
	let subjectACEs:ACE.Class[] = aces.filter( ace => Utils.A.indexOf( ace.subjects, subject, Pointer.Util.areEqual ) !== - 1 );

	for( let ace of subjectACEs ) {
		if( Utils.A.indexOf( ace.permissions, permission, Pointer.Util.areEqual ) !== - 1 )
			return ace.granting;
	}
	return null;
}
function getGranting( subject:string | Pointer.Class, permission:string | Pointer.Class, aces:ACE.Class[] ):boolean {
	if( ! aces ) return null;

	let subjectPointer:Pointer.Class = (this as Class)._parsePointer( subject );
	let permissionPointer:Pointer.Class = (this as Class)._parsePointer( permission );

	return grantingFrom( subjectPointer, permissionPointer, aces );
}
function grants( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let acl:Class = this;
	return getGranting.call( this, subject, permission, acl.entries );
}
function denies( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let acl:Class = this;
	let granting:boolean = getGranting.call( this, subject, permission, acl.entries );
	return granting === null ? null : ! granting;
}
function getChildInheritance( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let acl:Class = this;
	return getGranting.call( this, subject, permission, acl.inheritableEntries );
}

function removePermissionsFrom( subject:Pointer.Class, permissions:Pointer.Class[], aces:ACE.Class[] ):void {
	if( ! aces ) return;

	let acl:Class = <Class> this;
	let opposedAces:ACE.Class[] = acl.entries === aces ? acl.inheritableEntries : acl.entries;

	let subjectACEs:ACE.Class[] = aces.filter( ace => Utils.A.indexOf( ace.subjects, subject, Pointer.Util.areEqual ) !== - 1 );
	for( let ace of subjectACEs ) {
		if( opposedAces && Utils.A.indexOf( opposedAces, ace, Pointer.Util.areEqual ) !== - 1 ) {
			aces.splice( Utils.A.indexOf( aces, ace, Pointer.Util.areEqual ), 1 );

			let newACE:ACE.Class = configACE.call( this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces );
			subjectACEs.push( newACE );
			continue;
		}

		if( ace.subjects.length > 1 ) {
			ace.subjects.splice( Utils.A.indexOf( ace.subjects, subject, Pointer.Util.areEqual ), 1 );

			let newACE:ACE.Class = configACE.call( this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces );
			subjectACEs.push( newACE );
			continue;
		}

		for( let permission of permissions ) {
			let index:number = Utils.A.indexOf( ace.permissions, permission, Pointer.Util.areEqual );

			if( index === - 1 ) continue;
			ace.permissions.splice( index, 1 );
		}

		if( ace.permissions.length === 0 ) {
			aces.splice( Utils.A.indexOf( aces, ace, Pointer.Util.areEqual ), 1 );
			acl._removeFragment( ace );
		}
	}
}
function removePermissions( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[], aces:ACE.Class[] ):void {
	let subjectPointer:Pointer.Class = (this as Class)._parsePointer( subject );
	let permissionPointers:Pointer.Class[] = parsePointers.call( this, permissions );
	removePermissionsFrom.call( this, subjectPointer, permissionPointers, aces );
}
function remove( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
function remove( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function remove( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let acl:Class = this;
	removePermissions.call( this, subject, permissions, acl.entries );
}
function removeChildInheritance( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
function removeChildInheritance( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function removeChildInheritance( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let acl:Class = this;
	removePermissions.call( this, subject, permissions, acl.inheritableEntries );
}

export default Class;

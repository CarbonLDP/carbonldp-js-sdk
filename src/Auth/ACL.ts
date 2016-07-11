import * as ACE from "./ACE";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Document from "./../Document";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.AccessControlList;

export const SCHEMA:ObjectSchema.Class = {
	"entries": {
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

export interface Class extends Document.Class {
	accessTo:Pointer.Class;
	entries?:ACE.Class[];
	inheritableEntries?:ACE.Class[];

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
	let that:Class = this;
	return Pointer.Factory.is( element ) ? <Pointer.Class> element : that.getPointer( <string> element );
}

function parsePointers( elements:string | Pointer.Class | (string | Pointer.Class)[] ):Pointer.Class[] {
	let elementsArray:(string | Pointer.Class)[] = Utils.isArray( elements ) ? <(string | Pointer.Class)[]> elements : [ <string | Pointer.Class> elements ];
	return elementsArray.map( ( element:string | Pointer.Class ) => parsePointer.call( this, element ) );
}

function configACE( granting:boolean, subject:Pointer.Class, subjectClass:Pointer.Class, permissions:Pointer.Class[], aces:ACE.Class[] ):ACE.Class {
	let subjectACEs:ACE.Class[] = aces.filter( ace => ace.subjects.length === 1 && ace.subjects.indexOf( subject ) !== - 1 && ace.granting === granting );

	let ace:ACE.Class;
	if( subjectACEs.length === 0 ) {
		ace = ACE.Factory.decorate( (<Class> this).createFragment(), granting, [ subject ], subjectClass, [] );
		aces.push( ace );
	} else {
		ace = subjectACEs[ 0 ];
	}

	Array.prototype.push.apply( ace.permissions, permissions );
	return ace;
}
function configACEs( granting:boolean, subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[], aces:ACE.Class[] ):void {
	let subjectPointers:Pointer.Class[] = parsePointers.call( this, subjects );
	let subjectClassPointer:Pointer.Class = parsePointer.call( this, subjectsClass );
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
	let that:Class = this;
	that.entries = that.entries || [];
	configACEs.call( this, true, subjects, subjectsClass, permissions, that.entries );
}
function deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function deny( subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function deny( subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function deny( subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let that:Class = this;
	that.entries = that.entries || [];
	configACEs.call( this, false, subjects, subjectsClass, permissions, that.entries );
}
function configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function configureChildInheritance( granting:boolean, subject:string | Pointer.Class, subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permission:string | Pointer.Class ):void;
function configureChildInheritance( granting:boolean, subjects:(string | Pointer.Class)[], subjectClass:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function configureChildInheritance( granting:boolean, subjects:string | Pointer.Class | (string | Pointer.Class)[], subjectsClass:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let that:Class = this;
	that.inheritableEntries = that.inheritableEntries || [];
	configACEs.call( this, granting, subjects, subjectsClass, permissions, that.inheritableEntries );
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

	let subjectPointer:Pointer.Class = parsePointer.call( this, subject );
	let permissionPointer:Pointer.Class = parsePointer.call( this, permission );

	return grantingFrom( subjectPointer, permissionPointer, aces );
}
function grants( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let that:Class = this;
	return getGranting.call( this, subject, permission, that.entries );
}
function denies( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let that:Class = this;
	let granting:boolean = getGranting.call( this, subject, permission, that.entries );
	return granting === null ? null : ! granting;
}
function getChildInheritance( subject:string | Pointer.Class, permission:string | Pointer.Class ):boolean {
	let that:Class = this;
	return getGranting.call( this, subject, permission, that.inheritableEntries );
}

function removePermissionsFrom( subject:Pointer.Class, permissions:Pointer.Class[], aces:ACE.Class[] ):void {
	if( ! aces ) return;

	let that:Class = <Class> this;
	let opposedAces:ACE.Class[] = that.entries === aces ? that.inheritableEntries : that.entries;

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
			that.removeFragment( ace );
		}
	}
}
function removePermissions( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[], aces:ACE.Class[] ):void {
	let subjectPointer:Pointer.Class = parsePointer.call( this, subject );
	let permissionPointers:Pointer.Class[] = parsePointers.call( this, permissions );
	removePermissionsFrom.call( this, subjectPointer, permissionPointers, aces );
}
function remove( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
function remove( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function remove( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let that:Class = this;
	removePermissions.call( this, subject, permissions, that.entries );
}
function removeChildInheritance( subject:string | Pointer.Class, permission:string | Pointer.Class ):void;
function removeChildInheritance( subject:string | Pointer.Class, permissions:(string | Pointer.Class)[] ):void;
function removeChildInheritance( subject:string | Pointer.Class, permissions:string | Pointer.Class | (string | Pointer.Class)[] ):void {
	let that:Class = this;
	removePermissions.call( this, subject, permissions, that.inheritableEntries );
}

export default Class;

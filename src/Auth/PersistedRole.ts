import * as Documents from "./../Documents";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";
import * as Role from "./Role";
import * as Roles from "./Roles";

export interface Class extends PersistedProtectedDocument.Class {
	_roles:Roles.Class;

	name?:string;
	description?:string;

	parentRole?:Pointer.Class;
	childRoles?:Pointer.Class[];

	users?:Pointer.Class[];

	createChild<T extends object>( role:T & Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	createChild<T extends object>( role:T & Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	getUsers<T>( requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;

	addUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	addUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_roles" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "getUsers" )
			&& Utils.hasFunction( object, "addUser" )
			&& Utils.hasFunction( object, "addUsers" )
			&& Utils.hasFunction( object, "removeUser" )
			&& Utils.hasFunction( object, "removeUsers" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedProtectedDocument.Factory.is( object );
	}

	static decorate<T extends object>( object:T, documents:Documents.Class ):T & Class {
		let persistedRole:Class & T = <T & Class> object;
		if( Factory.hasClassProperties( persistedRole ) ) return persistedRole;

		PersistedProtectedDocument.Factory.decorate( persistedRole, documents );

		Object.defineProperties( persistedRole, {
			"_roles": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: documents[ "context" ] ? documents[ "context" ].auth.roles : null,
			},
			"createChild": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: createChild,
			},
			"getUsers": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getUsers,
			},
			"addUser": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addUser,
			},
			"addUsers": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addUsers,
			},
			"removeUser": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeUser,
			},
			"removeUsers": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeUsers,
			},
		} );

		return persistedRole;
	}

}

function createChild<T extends object>( role:T & Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends object>( role:T & Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends object>( this:Class, role:T & Role.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]> {
	checkState( this );
	return this._roles.createChild( this.id, role, slugOrRequestOptions, requestOptions );
}

function getUsers<T>( requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;
function getUsers<T>( this:Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]> {
	checkState( this );
	return this._roles.getUsers( this.id, requestOptions );
}

function addUser( this:Class, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.addUsers( this.id, [ user ], requestOptions );
}

function addUsers( this:Class, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.addUsers( this.id, users, requestOptions );
}

function removeUser( this:Class, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.removeUsers( this.id, [ user ], requestOptions );
}

function removeUsers( this:Class, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.removeUsers( this.id, users, requestOptions );
}

function checkState( role:Class ):void {
	if( ! role._roles ) throw new Errors.IllegalStateError( "The context of the current role, does not support roles management." );
}

export default Class;

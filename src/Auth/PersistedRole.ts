import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as Utils from "./../Utils";
import * as Role from "./Role";
import * as Roles from "./Roles";

export interface Class extends PersistedProtectedDocument.Class {
	_roles:Roles.Class;

	name?:string;
	description?:string;
	users?:Pointer.Class[];

	createChild<T extends Role.Class>( role:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
	createChild<T extends Role.Class>( role:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	listUsers( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getUsers( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
	getUsers( retrievalPreferencesOrRequestOptions?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	addUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	addUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
	removeUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_roles" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "listUsers" )
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

	static decorate<T extends PersistedDocument.Class>( object:T, roles:Roles.Class ):T & Class {
		let role:Class & T = <any> object;

		if( Factory.hasClassProperties( role ) ) return role;
		if( ! PersistedProtectedDocument.Factory.hasClassProperties( role ) ) PersistedProtectedDocument.Factory.decorate( role );

		Object.defineProperties( role, {
			"_roles": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: roles,
			},
			"createChild": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: createChild,
			},
			"listUsers": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: listUsers,
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

		return role;
	}

}

function createChild<T extends Role.Class>( role:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends Role.Class>( role:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends Role.Class>( role:T, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.createChild( (<Class> this).id, role, slugOrRequestOptions, requestOptions );
}

function listUsers( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.listUsers( (<Class> this).id, requestOptions );
}

function getUsers( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
function getUsers( retrievalPreferencesOrRequestOptions?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.getUsers( (<Class> this).id, retrievalPreferencesOrRequestOptions, requestOptions );
}


function addUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.addUsers( (<Class> this).id, [ user ], requestOptions );
}
function addUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.addUsers( (<Class> this).id, users, requestOptions );
}

function removeUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.removeUsers( (<Class> this).id, [ user ], requestOptions );
}
function removeUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.removeUsers( (<Class> this).id, users, requestOptions );
}

function checkState():void {
	if( ! (<Class> this)._roles ) throw new Errors.IllegalStateError( "The context of the current role, does not support roles management." );
}

export default Class;

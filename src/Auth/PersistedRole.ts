import { QueryDocumentsBuilder } from "../SPARQL/QueryDocument";
import * as Documents from "./../Documents";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";
import * as Roles from "./Roles";


export interface Class extends PersistedProtectedDocument.Class {
	name?:string;
	description?:string;

	parent?:Pointer.Class;
	children?:Pointer.Class[];

	users?:Pointer.Class[];


	createChild<T extends object>( role:T & Roles.NewRole, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	createChild<T extends object>( role:T & Roles.NewRole, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;


	getUsers<T>( requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;

	getUsers<T>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;


	addUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	addUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;


	removeUser( user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeUsers( users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
}

export class Factory {

	static hasClassProperties( object:object ):object is Class {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "getUsers" )
			&& Utils.hasFunction( object, "addUser" )
			&& Utils.hasFunction( object, "addUsers" )
			&& Utils.hasFunction( object, "removeUser" )
			&& Utils.hasFunction( object, "removeUsers" )
			;
	}

	static is( object:object ):object is Class {
		return Factory.hasClassProperties( object )
			&& PersistedProtectedDocument.Factory.is( object );
	}

	static decorate<T extends object>( object:T, documents:Documents.Class ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		PersistedProtectedDocument.Factory.decorate( object, documents );

		return Object.defineProperties( object, {
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
	}

}

function createChild<T extends object>( role:T & Roles.NewRole, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends object>( role:T & Roles.NewRole, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends object>( this:Class, role:T & Roles.NewRole, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]> {
	return getRolesClass( this )
		.then( roles => {
			return roles.createChild( this.id, role, slugOrRequestOptions, requestOptions );
		} );
}

function getUsers<T extends object>( requestOptions?:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;
function getUsers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;
function getUsers<T extends object>( this:Class, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]> {
	return getRolesClass( this )
		.then( roles => {
			return roles.getUsers<T>( this.id, queryBuilderFnOrOptions, queryBuilderFn );
		} );
}

function addUser( this:Class, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	return getRolesClass( this )
		.then( roles => {
			return roles.addUser( this.id, user, requestOptions );
		} );
}

function addUsers( this:Class, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	return getRolesClass( this )
		.then( roles => {
			return roles.addUsers( this.id, users, requestOptions );
		} );
}

function removeUser( this:Class, user:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	return getRolesClass( this )
		.then( roles => {
			return roles.removeUser( this.id, user, requestOptions );
		} );
}

function removeUsers( this:Class, users:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	return getRolesClass( this )
		.then( roles => {
			return roles.removeUsers( this.id, users, requestOptions );
		} );
}

function getRolesClass( role:Class ):Promise<Roles.Class> {
	return Utils.promiseMethod( () => {
		if( ! role._documents[ "context" ] )
			throw new Errors.IllegalStateError( "The context of the role doesn't support roles management." );

		return role._documents[ "context" ].auth.roles;
	} );
}

export default Class;

import { QueryDocumentsBuilder } from "../SPARQL/QueryDocument";
import { Documents } from "../Documents";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP/Request";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { Pointer } from "../Pointer";
import * as Utils from "./../Utils";
import * as Role from "./Role";
import * as Roles from "./Roles";


export interface Class extends PersistedProtectedDocument {
	name?:string;
	description?:string;

	parent?:Pointer;
	children?:Pointer[];

	users?:Pointer[];


	createChild<T extends object>( role:T & Roles.NewRole, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<T & Class>;
	createChild<T extends object>( role:T & Roles.NewRole, requestOptions?:RequestOptions ):Promise<T & Class>;

	getUsers<T>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedProtectedDocument.Class)[]>;
	getUsers<T>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedProtectedDocument.Class)[]>;

	addUser( user:Pointer | string, requestOptions?:RequestOptions ):Promise<void>;
	addUsers( users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void>;

	removeUser( user:Pointer | string, requestOptions?:RequestOptions ):Promise<void>;

	removeUsers( users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void>;
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
			&& PersistedProtectedDocument.is( object );
	}

	static decorate<T extends object>( object:T, documents:Documents ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		PersistedProtectedDocument.decorate( object, documents );

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

function createChild<T extends object>( role:T & Roles.NewRole, requestOptions?:RequestOptions ):Promise<T & Class>;
function createChild<T extends object>( role:T & Roles.NewRole, slug?:string, requestOptions?:RequestOptions ):Promise<T & Class>;
function createChild<T extends object>( this:Class, role:T & Roles.NewRole, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & Class> {
	return getRolesClass( this )
		.then( roles => {
			return roles.createChild( this.id, role, slugOrRequestOptions, requestOptions );
		} );
}

function getUsers<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedProtectedDocument)[]>;
function getUsers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedProtectedDocument)[]>;
function getUsers<T extends object>( this:Class, queryBuilderFnOrOptions:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & PersistedProtectedDocument)[]> {
	return getRolesClass( this )
		.then( roles => {
			return roles.getUsers<T>( this.id, queryBuilderFnOrOptions, queryBuilderFn );
		} );
}

function addUser( this:Class, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
	return getRolesClass( this )
		.then( roles => {
			return roles.addUser( this.id, user, requestOptions );
		} );
}

function addUsers( this:Class, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
	return getRolesClass( this )
		.then( roles => {
			return roles.addUsers( this.id, users, requestOptions );
		} );
}

function removeUser( this:Class, user:Pointer | string, requestOptions?:RequestOptions ):Promise<void> {
	return getRolesClass( this )
		.then( roles => {
			return roles.removeUser( this.id, user, requestOptions );
		} );
}

function removeUsers( this:Class, users:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
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

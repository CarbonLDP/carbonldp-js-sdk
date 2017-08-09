import * as HTTP from "./../HTTP";
import * as Errors from "./../Errors";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as Utils from "./../Utils";

export interface Class extends PersistedProtectedDocument.Class {
	_roles:Roles.Class;

	name?:string;
	description?:string;
	agents?:Pointer.Class[];

	createChild<T>( role:T & Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	createChild<T>( role:T & Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	listAgents( requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]>;

	getAgents<T>( requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;

	getAgents<T>( retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;

	addAgent( agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	addAgents( agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeAgent( agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	removeAgents( agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_roles" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "listAgents" )
			&& Utils.hasFunction( object, "getAgents" )
			&& Utils.hasFunction( object, "addAgent" )
			&& Utils.hasFunction( object, "addAgents" )
			&& Utils.hasFunction( object, "removeAgent" )
			&& Utils.hasFunction( object, "removeAgents" )
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
			"listAgents": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: listAgents,
			},
			"getAgents": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getAgents,
			},
			"addAgent": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addAgent,
			},
			"addAgents": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addAgents,
			},
			"removeAgent": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeAgent,
			},
			"removeAgents": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeAgents,
			},
		} );

		return role;
	}

}

function createChild<T>( role:T & Role.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T>( role:T & Role.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T>( this:Class, role:T & Role.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]> {
	checkState( this );
	return this._roles.createChild( this.id, role, slugOrRequestOptions, requestOptions );
}

function listAgents( this:Class, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedDocument.Class[], HTTP.Response.Class ]> {
	checkState( this );
	return this._roles.listAgents( this.id, requestOptions );
}

function getAgents<T>( requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;
function getAgents<T>( retrievalPreferences?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]>;
function getAgents<T>( this:Class, retrievalPreferencesOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class ]> {
	checkState( this );
	return this._roles.getAgents( this.id, retrievalPreferencesOrRequestOptions, requestOptions );
}

function addAgent( this:Class, agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.addAgents( this.id, [ agent ], requestOptions );
}

function addAgents( this:Class, agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.addAgents( this.id, agents, requestOptions );
}

function removeAgent( this:Class, agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.removeAgents( this.id, [ agent ], requestOptions );
}

function removeAgents( this:Class, agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState( this );
	return this._roles.removeAgents( this.id, agents, requestOptions );
}

function checkState( self:Class ):void {
	if( ! self._roles ) throw new Errors.IllegalStateError( "The context of the current role, does not support roles management." );
}

export default Class;

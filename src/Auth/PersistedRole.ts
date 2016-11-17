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
	agents?:Pointer.Class[];

	createChild<T extends Role.Class>( role:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
	createChild<T extends Role.Class>( role:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	listAgents( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getAgents( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
	getAgents( retrievalPreferencesOrRequestOptions?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

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
		});

		return role;
	}

}

function createChild<T extends Role.Class>( role:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends Role.Class>( role:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends Role.Class>( role:T, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.createChild( (<Class> this).id, role, slugOrRequestOptions, requestOptions );
}

function listAgents( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.listAgents( (<Class> this).id, requestOptions );
}

function getAgents( requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
function getAgents( retrievalPreferencesOrRequestOptions?:RetrievalPreferences.Class, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	checkState.call( this );
	return (<Class> this)._roles.getAgents( (<Class> this).id, retrievalPreferencesOrRequestOptions, requestOptions );
}


function addAgent( agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.addAgents( (<Class> this).id, [ agent ], requestOptions );
}
function addAgents( agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.addAgents( (<Class> this).id, agents, requestOptions );
}

function removeAgent( agent:Pointer.Class | string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.removeAgents( (<Class> this).id, [ agent ], requestOptions );
}
function removeAgents( agents:(Pointer.Class | string)[], requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
	checkState.call( this );
	return (<Class> this)._roles.removeAgents( (<Class> this).id, agents, requestOptions );
}

function checkState():void {
	if( ! (<Class> this)._roles ) throw new Errors.IllegalStateError( "The context of the current role, does not support roles management." );
}

export default Class;

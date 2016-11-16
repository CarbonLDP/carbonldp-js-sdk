import * as AppRole from "./Role";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedRole from "./../Auth/PersistedRole";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
import * as Utils from "./../Utils";

export interface Class extends PersistedRole.Class {
	_roles:Roles.Class;

	parentRole?:Pointer.Class;
	childRoles?:Pointer.Class[];

	createChild<T>( role:T & AppRole.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChild<T>( role:T & AppRole.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;

	createChildren<T>( roles:(T & AppRole.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & Class)[], HTTP.Response.Class[] ]>;
	createChildren<T>( roles:(T & AppRole.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & Class)[], HTTP.Response.Class[] ]>;

	createChildAndRetrieve<T>( role:T & AppRole.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T>( role:T & AppRole.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class ] ]>;

	createChildrenAndRetrieve<T>( roles:(T & AppRole.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & Class)[], [ HTTP.Response.Class[], HTTP.Response.Class[], HTTP.Response.Class ] ]>;
	createChildrenAndRetrieve<T>( roles:(T & AppRole.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & Class)[], [ HTTP.Response.Class[], HTTP.Response.Class[], HTTP.Response.Class ] ]>;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_roles" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& AppRole.Factory.is( object )
			&& PersistedRole.Factory.is( object )
			;
	}

	static decorate<T extends PersistedDocument.Class>( object:T, roles:Roles.Class ):T & Class {
		let role:T & Class = <any> object;
		if( Factory.hasClassProperties( role ) ) return role;

		PersistedRole.Factory.decorate( role, roles );

		return role;
	}

}

export default Class;

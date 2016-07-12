import * as AppRole from "./Role";
import * as PersistedRole from "./../Auth/PersistedRole";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
import * as Utils from "./../Utils";

export interface Class extends PersistedRole.Class {
	_roles:Roles.Class;

	parentRole?:Pointer.Class;
	childRoles?:Pointer.Class[];
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_roles" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& AppRole.Factory.is( object )
			;
	}

	static decorate<T extends Object>( object:T, roles:Roles.Class ):T & Class {
		let role:T & Class = <any> object;
		if( Factory.hasClassProperties( role ) ) return role;

		PersistedRole.Factory.decorate( role, roles );

		return role;
	}

}

export default Class;

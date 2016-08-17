import * as AppRole from "./Role";
import * as Pointer from "./../Pointer";
import * as PersistedRole from "./../Auth/PersistedRole";
import * as Utils from "./../Utils";

export interface Class extends PersistedRole.Class {
	parentRole?:Pointer.Class;
	childRoles?:Pointer.Class[];
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.isObject( object )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& AppRole.Factory.is( object )
			;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		let role:T & Class = <any> object;
		if( Factory.hasClassProperties( role ) ) return role;

		PersistedRole.Factory.decorate( role );

		return role;
	}

}

export default Class;

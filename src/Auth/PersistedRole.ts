import * as Role from "./Role";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	name:string;
	agents?:Pointer.Class;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			// && Utils.hasPropertyDefined( object, "agents" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& Role.Factory.is( object );
	}

	static decorate<T extends Object>( object:T ):T & Class {
		let role:Class & T = <any> object;
		if( Factory.hasClassProperties( role ) ) return role;

		return role;
	}

}

export default Class;

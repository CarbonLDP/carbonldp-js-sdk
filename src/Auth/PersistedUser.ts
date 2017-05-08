import * as User from "./User";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Utils from "./../Utils";

export interface Class extends PersistedProtectedDocument.Class {
	name:string;
	email:string;
	enabled:boolean;
	password?:string;

	enable():Promise<[ Class, HTTP.Response.Class ]>;
	disable():Promise<[ Class, HTTP.Response.Class ]>;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			&& Utils.hasPropertyDefined( object, "email" )
			&& Utils.hasPropertyDefined( object, "enabled" )
			&& Utils.hasFunction( object, "enable" )
			&& Utils.hasFunction( object, "disable" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedProtectedDocument.Factory.is( object )
			&& (<PersistedProtectedDocument.Class> object).hasType( User.RDF_CLASS )
			;
	}

	static decorate<T extends PersistedDocument.Class>( object:T ):Class & T {
		let user:T & Class = <any> object;

		if( Factory.hasClassProperties( user ) ) return user;
		if( ! PersistedProtectedDocument.Factory.hasClassProperties( user ) ) PersistedProtectedDocument.Factory.decorate( user );

		Object.defineProperties( user, {
			"enable": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: enable,
			},
			"disable": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: disable,
			},
		} );

		return user;
	}

}

function enable():Promise<[ Class, HTTP.Response.Class ]> {
	(<Class> this).enabled = true;
	return (<Class> this).save();
}
function disable():Promise<[ Class, HTTP.Response.Class ]> {
	(<Class> this).enabled = false;
	return (<Class> this).save();
}

export default Class;

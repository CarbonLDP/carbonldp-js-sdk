import * as Agent from "./Agent";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";
import * as PersistedDocument from "./../PersistedDocument";

export interface Class extends PersistedDocument.Class {
	name:string;
	email:string;
	enabled:boolean;

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
			&& PersistedDocument.Factory.is( object )
			&& (<PersistedDocument.Class> object).hasType( Agent.RDF_CLASS )
			;
	}

	static decorate<T extends Object>( object:T ):Class & T {
		let agent:T & Class = <any> object;
		if( Factory.hasClassProperties( agent ) ) return agent;

		Object.defineProperties( agent, {
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

		return agent;
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

import {
	hasFunction,
	isObject,
	Minus,
} from "../Utils";
import * as Document from "./../Document";
import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as User from "./User";

export interface Class extends Minus<User.Class, Document.Class>, PersistedProtectedDocument.Class {
	enable( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;

	disable( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;
}


export function enable( this:Class, requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]> {
	return changeAvailability.call( this, "enabled", requestOptions );
}

export function disable( this:Class, requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]> {
	return changeAvailability.call( this, "disabled", requestOptions );
}

function changeAvailability( this:Class, flag:"enabled" | "disabled", requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]> {
	const responses:HTTP.Response.Class[] = [];

	return this
		.resolve()
		.then( ( [ , response ] ) => {
			if( response ) responses.push( response );

			this[ flag ] = true;

			const reverse:"disabled" | "enabled" = flag === "enabled" ? "disabled" : "enabled";
			delete this[ reverse ];

			return this.save( requestOptions );
		} )
		.then<[ Class, HTTP.Response.Class[] ]>( ( [ , response ] ) => {
			responses.push( response );

			return [ this, responses ];
		} )
		;
}


export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return isObject( object )
			&& hasFunction( object, "enable" )
			&& hasFunction( object, "disable" )
			;
	}

	static is( object:object ):object is Class {
		return Factory.hasClassProperties( object )
			&& User.Factory.hasClassProperties( object )
			&& PersistedProtectedDocument.Factory.is( object )
			;
	}

	static decorate<T extends object>( object:T, documents:Documents.Class ):Class & T {
		if( Factory.hasClassProperties( object ) ) return object;

		User.Factory.decorate( object );
		PersistedProtectedDocument.Factory.decorate( object, documents );

		const persistedUser:T & Class = Object.defineProperties( object, {
			"enable": {
				configurable: true,
				writable: true,
				value: enable,
			},
			"disable": {
				configurable: true,
				writable: true,
				value: disable,
			},
		} );

		return persistedUser;
	}

}

export default Class;

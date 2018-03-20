import {
	hasFunction,
	isObject,
	Minus,
} from "../Utils";
import { Document } from "../Document";
import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import * as User from "./User";

export interface Class extends Minus<User.Class, Document>, PersistedProtectedDocument {
	enable( requestOptions?:RequestOptions ):Promise<Class>;

	disable( requestOptions?:RequestOptions ):Promise<Class>;
}


export function enable( this:Class, requestOptions?:RequestOptions ):Promise<Class> {
	return changeAvailability( this, "enabled", requestOptions );
}

export function disable( this:Class, requestOptions?:RequestOptions ):Promise<Class> {
	return changeAvailability( this, "disabled", requestOptions );
}

function changeAvailability( user:Class, flag:"enabled" | "disabled", requestOptions?:RequestOptions ):Promise<Class> {
	return user
		.resolve()
		.then( () => {
			user[ flag ] = true;

			const reverse:"disabled" | "enabled" = flag === "enabled" ? "disabled" : "enabled";
			delete user[ reverse ];

			return user.save( requestOptions );
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
			&& PersistedProtectedDocument.is( object )
			;
	}

	static decorate<T extends object>( object:T, documents:Documents ):Class & T {
		if( Factory.hasClassProperties( object ) ) return object;

		User.Factory.decorate( object );
		PersistedProtectedDocument.decorate( object, documents );

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

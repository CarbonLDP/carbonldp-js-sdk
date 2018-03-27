import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import {
	hasFunction,
	isObject,
} from "../Utils";
import { User } from "./User";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface PersistedUser extends PersistedProtectedDocument {
	name?:string;
	enabled?:boolean;
	disabled?:boolean;
	credentials?:UsernameAndPasswordCredentials;

	enable( requestOptions?:RequestOptions ):Promise<PersistedUser>;

	disable( requestOptions?:RequestOptions ):Promise<PersistedUser>;
}


export interface PersistedUserFactory {
	isDecorated( value:any ):value is PersistedUser;

	is( value:any ):value is PersistedUser;


	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T;
}

export const PersistedUser:PersistedUserFactory = {
	isDecorated( value:any ):value is PersistedUser {
		return isObject( value )
			&& hasFunction( value, "enable" )
			&& hasFunction( value, "disable" )
			;
	},

	is( value:any ):value is PersistedUser {
		return PersistedUser.isDecorated( value )
			&& User.isDecorated( value )
			&& PersistedProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T {
		if( PersistedUser.isDecorated( object ) ) return object;

		User.decorate( object );
		PersistedProtectedDocument.decorate( object, documents );

		return Object.defineProperties( object, {
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
	},
};


export function enable( this:PersistedUser, requestOptions?:RequestOptions ):Promise<PersistedUser> {
	return changeAvailability( this, "enabled", requestOptions );
}

export function disable( this:PersistedUser, requestOptions?:RequestOptions ):Promise<PersistedUser> {
	return changeAvailability( this, "disabled", requestOptions );
}

function changeAvailability( user:PersistedUser, flag:"enabled" | "disabled", requestOptions?:RequestOptions ):Promise<PersistedUser> {
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

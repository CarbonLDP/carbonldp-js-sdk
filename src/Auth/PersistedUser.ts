import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies/CS";
import * as Utils from "./../Utils";
import * as PersistedCredentials from "./PersistedCredentials";

export interface Class extends PersistedProtectedDocument {
	name?:string;
	credentials?:PersistedCredentials.Class;

	enableCredentials( requestOptions?:RequestOptions ):Promise<Class>;

	disableCredentials( requestOptions?:RequestOptions ):Promise<Class>;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "enableCredentials" )
			&& Utils.hasFunction( object, "disableCredentials" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedProtectedDocument.is( object )
			;
	}

	static decorate<T extends object>( object:T, documents:Documents ):Class & T {
		const persistedUser:T & Class = <any> object;

		if( Factory.hasClassProperties( persistedUser ) ) return persistedUser;
		if( ! PersistedProtectedDocument.isDecorated( persistedUser ) ) PersistedProtectedDocument.decorate( persistedUser, documents );

		Object.defineProperties( persistedUser, {
			"enableCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: changeEnabledCredentials.bind( persistedUser, true ),
			},
			"disableCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: changeEnabledCredentials.bind( persistedUser, false ),
			},
		} );
		if( persistedUser.credentials ) PersistedCredentials.Factory.decorate( persistedUser.credentials, documents );

		return persistedUser;
	}

}

function changeEnabledCredentials( this:Class, enabled:boolean, requestOptions?:RequestOptions ):Promise<Class> {
	return ensureCredentials( this )
		.then( () => {
			if( enabled ) return this.credentials.enable( requestOptions );
			return this.credentials.disable( requestOptions );
		} ).then( () => {
			return this;
		} );
}

function ensureCredentials( user:Class ):Promise<void> {
	if( PersistedCredentials.Factory.hasClassProperties( user.credentials ) )
		return Promise.resolve();

	return user
		.executeSELECTQuery<{ credentials:Pointer }>( `BASE<${ user.id }>SELECT?c FROM<>WHERE{GRAPH<>{<><${ CS.credentials }>?c}}` )
		.then( ( { bindings: [ credentialsBinding ] } ) => {
			user.credentials = PersistedCredentials.Factory.decorate( credentialsBinding.credentials, user._documents );
		} );
}

export default Class;

import { CS } from "../Vocabularies/CS";
import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as SELECTResults from "./../SPARQL/SELECTResults";
import * as Utils from "./../Utils";
import * as PersistedCredentials from "./PersistedCredentials";

export interface Class extends PersistedProtectedDocument.Class {
	name?:string;
	credentials?:PersistedCredentials.Class;

	enableCredentials( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;

	disableCredentials( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;
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
			&& PersistedProtectedDocument.Factory.is( object )
			;
	}

	static decorate<T extends object>( object:T, documents:Documents.Class ):Class & T {
		const persistedUser:T & Class = <any> object;

		if( Factory.hasClassProperties( persistedUser ) ) return persistedUser;
		if( ! PersistedProtectedDocument.Factory.hasClassProperties( persistedUser ) ) PersistedProtectedDocument.Factory.decorate( persistedUser, documents );

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

function changeEnabledCredentials( this:Class, enabled:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]> {
	const promise:Promise<void | HTTP.Response.Class> = "credentials" in this ?
		Promise.resolve() : obtainCredentials( this );

	let responses:HTTP.Response.Class[] = [];
	return promise.then( ( response ) => {
		if( response ) responses.push( response );

		if( enabled ) return this.credentials.enable( requestOptions );
		return this.credentials.disable( requestOptions );
	} ).then<[ Class, HTTP.Response.Class[] ]>( ( [ _credentials, credentialsResponses ]:[ PersistedCredentials.Class, HTTP.Response.Class[] ] ) => {
		responses.push( ...credentialsResponses );

		return [ this, responses ];
	} );
}

function obtainCredentials( user:Class ):Promise<HTTP.Response.Class> {
	return user
		.executeSELECTQuery( `BASE<${ user.id }>SELECT?c FROM<>WHERE{GRAPH<>{<><${ CS.credentials }>?c}}` )
		.then( ( [ { bindings: [ credentialsBinding ] }, response ]:[ SELECTResults.Class<{ credentials:Pointer.Class }>, HTTP.Response.Class ] ) => {
			user.credentials = PersistedCredentials.Factory.decorate( credentialsBinding.credentials, user._documents );
			return response;
		} );
}

export default Class;

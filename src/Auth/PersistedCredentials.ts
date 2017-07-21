import * as HTTP from "./../HTTP";
import * as Documents from "./../Documents";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

export interface Class extends PersistedProtectedDocument.Class {
	email?:string;
	password?:string;
	enabled?:boolean;
	user?:PersistedUser.Class;

	enable( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;
	disable( requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]>;
}

export class Factory {
	static hasClassProperties( object:object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "enable" )
			&& Utils.hasFunction( object, "disable" )
			;
	}

	static decorate<T extends object>( persistedDocument:T, documents:Documents.Class ):T & Class {
		const persistedCredentials:T & Class = <T & Class> persistedDocument;
		if( Factory.hasClassProperties( persistedDocument ) ) return persistedCredentials;

		PersistedProtectedDocument.Factory.decorate( persistedCredentials, documents );

		Object.defineProperties( persistedCredentials, {
			"enable": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: changeEnabled.bind( persistedCredentials, true ),
			},
			"disable": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: changeEnabled.bind( persistedCredentials, false ),
			},
		} );

		if( persistedCredentials.user ) {
			PersistedUser.Factory.decorate( persistedCredentials.user, documents );
			persistedCredentials.user.credentials = persistedCredentials;
		}

		return persistedCredentials;
	}
}

function changeEnabled( this:Class, enabled:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ Class, HTTP.Response.Class[] ]> {
	const responses:HTTP.Response.Class[] = [];
	const promise:Promise<[ Class, HTTP.Response.Class ]> = this.isResolved() ?
		Promise.resolve( [] as [ Class, HTTP.Response.Class ] ) : this.resolve();
	return promise.then( ( [ _credentials, response ] ) => {
		if( response ) responses.push( response );

		this.enabled = enabled;
		return this.save( requestOptions );
	} ).then( ( [ _credentials, response ] ) => {
		if( response ) responses.push( response );

		return [ this, responses ] as [ Class, HTTP.Response.Class[] ];
	} );
}

export default Class;

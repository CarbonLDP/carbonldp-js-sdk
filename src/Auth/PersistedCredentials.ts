import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

export interface Class extends PersistedProtectedDocument {
	email?:string;
	password?:string;
	enabled?:boolean;
	user?:PersistedUser.Class;

	enable( requestOptions?:RequestOptions ):Promise<[ Class, Response[] ]>;

	disable( requestOptions?:RequestOptions ):Promise<[ Class, Response[] ]>;
}

export class Factory {
	static hasClassProperties( object:object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "enable" )
			&& Utils.hasFunction( object, "disable" )
			;
	}

	static decorate<T extends object>( persistedDocument:T, documents:Documents ):T & Class {
		const persistedCredentials:T & Class = <T & Class> persistedDocument;
		if( Factory.hasClassProperties( persistedDocument ) ) return persistedCredentials;

		PersistedProtectedDocument.decorate( persistedCredentials, documents );

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

function changeEnabled( this:Class, enabled:boolean, requestOptions?:RequestOptions ):Promise<[ Class, Response[] ]> {
	const responses:Response[] = [];
	const promise:Promise<[ Class, Response ]> = this.isResolved() ? Promise.resolve<any>( [] ) : this.resolve();
	return promise.then( ( [ _credentials, response ] ) => {
		if( response ) responses.push( response );

		this.enabled = enabled;
		return this.save( requestOptions );
	} ).then<[ Class, Response[] ]>( ( [ _credentials, response ] ) => {
		if( response ) responses.push( response );

		return [ this, responses ];
	} );
}

export default Class;

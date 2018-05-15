import {
	AbstractAuthenticator,
	AuthService,
	User,
} from "../../../src/Auth";
import { Authenticator } from "../../../src/Auth";
import { CarbonLDP } from "../../../src/CarbonLDP";
import { Context } from "../../../src/Context";
import { Pointer } from "../../../src/Pointer";

import { createMockContext } from "./core";


export function createMockAuthService( data:{
	context:CarbonLDP;
	user?:User | true,
	authenticator?:Authenticator<any>,
} ):AuthService {
	data = Object.assign( {}, data );

	return new class extends AuthService {
		constructor() {
			super( data.context );

			if( data.user ) this._authenticatedUser = data.user === true ?
				createMockUser( { context: this.context } ) : data.user;

			if( data.authenticator ) this.authenticator = data.authenticator;
		}
	};
}


export function createMockAuthenticator( data?:{
	context:CarbonLDP;
	credentials?:object,
	header?:string,
	user?:User
} ):AbstractAuthenticator<object, object> {
	return new class extends AbstractAuthenticator<object, object> {

		protected _credentials:object = data && data.credentials;
		protected _authenticatedUser:User = data && data.user;

		authenticate():Promise<object> {
			throw new Error( "Method not implemented." );
		}

		protected _getHeaderValue():string {
			return data && data.header;
		}

	}( data.context );
}


export function createMockUser( data?:{
	context:Context;
} ):User {
	data = Object.assign( {}, data );

	if( ! data.context ) data.context = createMockContext();

	const pointer:Pointer = data.context.registry
		.getPointer( "users/my-user/" );

	return User.decorate( Object.assign( pointer, {
		types: [ User.TYPE ],
		username: null,
		enabled: true,
		name: null,
	} ) );
}

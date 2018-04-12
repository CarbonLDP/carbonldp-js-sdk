import {
	Authenticator,
	AuthService,
	PersistedUser,
	Role,
	User,
} from "../../../src/Auth";
import { Context } from "../../../src/Context";
import { Document } from "../../../src/Document";
import { Pointer } from "../../../src/Pointer";

import { createMockContext } from "./core";


export function createMockAuthService( data?:{
	context?:Context;
	user?:PersistedUser | true,
	authenticator?:Authenticator<any, any>,
} ):AuthService {
	data = Object.assign( {}, data );

	if( ! data.context ) data.context = createMockContext();

	return new class extends AuthService {
		constructor() {
			super( data.context );

			if( data.user ) this._authenticatedUser = data.user === true ?
				createMockPersistedUser( { context: this.context } ) : data.user;

			if( data.authenticator ) this.authenticator = data.authenticator;
		}
	};
}


export function createMockPersistedUser( data?:{
	context:Context;
} ):PersistedUser {
	data = Object.assign( {}, data );

	if( ! data.context ) data.context = createMockContext();

	const pointer:Pointer = data.context.documents
		.getPointer( "users/my-user/" );

	return PersistedUser.decorate( Object.assign( pointer, {
		types: [ User.TYPE ],
		username: null,
		enabled: true,
		name: null,
	} ), data.context.documents );
}


export function createMockRole( data?:{} ):Role {
	return Document.createFrom( {
		name: "Role name",
		description: "Role description",
	} );
}

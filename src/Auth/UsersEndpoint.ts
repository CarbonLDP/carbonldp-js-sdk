import { Documents } from "../Documents";
import { Endpoint } from "../Endpoint";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP";
import { ModelDecorator } from "../ModelDecorator";
import { hasFunction } from "../Utils";
import { CS } from "../Vocabularies";
import { PersistedUser } from "./PersistedUser";
import {
	User,
	UserBase,
} from "./User";


export interface UsersEndpoint extends Endpoint<UserBase, User, PersistedUser> {
	enable( userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser>;

	disable( userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser>;
}


export interface UsersEndpointFactory extends ModelDecorator<UsersEndpoint> {
	TYPE:CS[ "Users" ];

	isDecorated( object:object ):object is UsersEndpoint;

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint;
}

export const UsersEndpoint:UsersEndpointFactory = {
	TYPE: CS.Users,

	isDecorated( object:object ):object is UsersEndpoint {
		return (
			hasFunction( object, "enable" ) &&
			hasFunction( object, "disable" )
		);
	},


	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint {
		if( UsersEndpoint.isDecorated( object ) ) return object;

		Endpoint.decorate( object, documents );

		return Object.defineProperties( object, {
			"_ModelFactory": {
				value: <UsersEndpoint["_ModelFactory"]> {
					createFrom: createFromBase,
					decorate: PersistedUser.decorate,
				},
			},
			"enable": {
				configurable: true,
				value: enableUser,
			},
			"disable": {
				configurable: true,
				value: disableUser,
			},
		} );
	},
};


function createFromBase<T extends UserBase>( base:T ):T & User {
	if( ! base.credentials ) throw new IllegalArgumentError( "A credentials object is required." );
	const user:T & User = User.createFrom( base );

	if( ! user.credentials.username ) throw new IllegalArgumentError( "A credentials username cannot be empty." );
	if( ! user.credentials.password ) throw new IllegalArgumentError( "A credentials password cannot be empty." );
	user.setCredentials( user.credentials.username, user.credentials.password );

	return user;
}


function enableUser( this:UsersEndpoint, userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser> {
	return Endpoint
		.getChild( this, userURI )
		.then( user => user.enable( requestOptions ) )
		;
}

function disableUser( this:UsersEndpoint, userURI:string, requestOptions?:RequestOptions ):Promise<PersistedUser> {
	return Endpoint
		.getChild( this, userURI )
		.then( user => user.disable( requestOptions ) )
		;
}

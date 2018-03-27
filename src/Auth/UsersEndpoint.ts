import { Documents } from "../Documents";
import { Endpoint } from "../Endpoint";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP";
import { ModelDecorator } from "../ModelDecorator";
import { CS } from "../Vocabularies";
import { PersistedUser } from "./PersistedUser";
import {
	User,
	UserBase,
} from "./User";


export interface UsersEndpoint extends Endpoint<UserBase, User, PersistedUser> {
}


export interface UsersEndpointFactory extends ModelDecorator<UsersEndpoint> {
	TYPE:CS[ "Users" ];

	isDecorated( object:object ):object is UsersEndpoint;

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint;
}

const EndpointUserFactory:UsersEndpoint["_ModelFactory"] = {
	createFrom: createFromBase,
	decorate: PersistedUser.decorate,
};

export const UsersEndpoint:UsersEndpointFactory = {
	TYPE: CS.Users,

	isDecorated( object:object ):object is UsersEndpoint {
		return (
			object[ "_ModelFactory" ] === EndpointUserFactory
		);
	},


	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint {
		if( UsersEndpoint.isDecorated( object ) ) return object;

		Endpoint.decorate( object, documents );

		return Object.defineProperties( object, {
			"_ModelFactory": {
				value: EndpointUserFactory,
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

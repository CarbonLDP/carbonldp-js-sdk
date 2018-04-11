import { Document } from "../Document";
import { Fragment } from "../Fragment";
import { ObjectSchema } from "../ObjectSchema";
import {
	hasFunction,
	isObject,
} from "../Utils";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface UserBase {
	name?:string;
	credentials:UsernameAndPasswordCredentials;
}

export interface User extends Document {
	name?:string;
	credentials?:Fragment & UsernameAndPasswordCredentials;

	updateCredentials( username?:string, password?:string ):Fragment & UsernameAndPasswordCredentials;
}


export interface UserFactory {
	TYPE:CS[ "User" ];
	SCHEMA:ObjectSchema;


	isDecorated( object:object ):object is User;

	is( value:any ):value is User;


	decorate<T extends object>( object:T ):T & User;

	create( data:UserBase ):User;

	createFrom<T extends UserBase>( object:T ):T & User;
}

const SCHEMA:ObjectSchema = {
	"name": {
		"@id": CS.name,
		"@type": XSD.string,
	},
	"credentials": {
		"@id": CS.credentials,
		"@type": "@id",
	},
};

export const User:UserFactory = {
	TYPE: CS.User,
	SCHEMA,


	isDecorated( object:object ):object is User {
		return isObject( object )
			&& hasFunction( object, "updateCredentials" )
			;
	},

	is( value:any ):value is User {
		return Document.is( value )
			&& User.isDecorated( value )
			;
	},


	decorate<T extends object>( object:T ):T & User {
		if( User.isDecorated( object ) ) return object;

		Document.decorate( object );

		return Object.defineProperties( object, {
			"updateCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: updateCredentials,
			},
		} );
	},

	create( data:UserBase ):User {
		return User.createFrom( { ...data } );
	},

	createFrom<T extends UserBase>( object:T ):T & User {
		const user:T & User = User.decorate( object );
		user._normalize();

		user.addType( User.TYPE );

		return user;
	},
};

function updateCredentials( this:User, username?:string, password?:string ):UsernameAndPasswordCredentials {
	const credentials:UsernameAndPasswordCredentials = UsernameAndPasswordCredentials
		.createFrom( { username, password } );

	this.credentials = this.createFragment( credentials );
	this.credentials.addType( C.VolatileResource );

	return this.credentials;
}

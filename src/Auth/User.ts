import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import {
	hasFunction,
	isObject,
} from "../Utils";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import {
	UsernameAndPasswordCredentials,
	UsernameAndPasswordCredentialsBase,
} from "./UsernameAndPasswordCredentials";


export interface UserBase {
	name?:string;
	credentials:UsernameAndPasswordCredentialsBase;
}

export interface User extends Document {
	name?:string;
	credentials?:UsernameAndPasswordCredentials;

	setCredentials( email?:string, password?:string ):UsernameAndPasswordCredentials;
}


export interface UserFactory {
	TYPE:CS[ "User" ];
	SCHEMA:ObjectSchema;


	isDecorated( object:object ):object is User;

	is( value:any ):value is User;


	decorate<T extends object>( object:T ):T & User;

	create():User;

	createFrom<T extends object>( object:T ):T & User;
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
			&& hasFunction( object, "setCredentials" )
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
			"setCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: setCredentials,
			},
		} );
	},

	create():User {
		return User.createFrom( {} );
	},

	createFrom<T extends object>( object:T ):T & User {
		const user:T & User = User.decorate( object );

		user.addType( User.TYPE );

		return user;
	},
};

function setCredentials( this:User, username?:string, password?:string ):UsernameAndPasswordCredentials {
	const credentials:UsernameAndPasswordCredentials = UsernameAndPasswordCredentials.create( username, password );

	this.credentials = this.createFragment( credentials );
	this.credentials.addType( C.VolatileResource );

	return this.credentials;
}

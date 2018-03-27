import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import {
	hasFunction,
	isBoolean,
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
	enabled?:boolean;
	disabled?:boolean;
	credentials:UsernameAndPasswordCredentialsBase;
}

export interface User extends Document {
	name?:string;
	enabled?:boolean;
	disabled?:boolean;
	credentials?:UsernameAndPasswordCredentials;

	setCredentials( email?:string, password?:string ):UsernameAndPasswordCredentials;
}


export interface UserFactory {
	TYPE:CS[ "User" ];
	SCHEMA:ObjectSchema;


	isDecorated( object:object ):object is User;

	is( value:any ):value is User;


	decorate<T extends object>( object:T ):T & User;

	create( disabled?:boolean ):User;

	createFrom<T extends object>( object:T, disabled?:boolean ):T & User;
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
	"enabled": {
		"@id": CS.enabled,
		"@type": XSD.boolean,
	},
};

export const User:UserFactory = {
	TYPE: CS.User,
	SCHEMA,


	isDecorated( object:object ):object is User {
		return hasFunction( object, "setCredentials" )
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

	create( disabled?:boolean ):User {
		return User.createFrom( {}, disabled );
	},

	createFrom<T extends object>( object:T, disabled?:boolean ):T & User {
		const user:T & User = User.decorate( object );

		if( isBoolean( disabled ) ) user.disabled = disabled;
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

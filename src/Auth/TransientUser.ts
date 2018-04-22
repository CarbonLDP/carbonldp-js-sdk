import { TransientDocument } from "../TransientDocument";
import { TransientFragment } from "../Fragment";
import { ObjectSchema } from "../ObjectSchema";
import {
	hasFunction,
	isObject,
} from "../Utils";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface UserBase {
	name?:string;
	credentials:UsernameAndPasswordCredentials;
}

export interface TransientUser extends TransientDocument {
	name?:string;
	credentials?:TransientFragment & UsernameAndPasswordCredentials;

	updateCredentials( username?:string, password?:string ):TransientFragment & UsernameAndPasswordCredentials;
}


export interface TransientUserFactory {
	TYPE:CS[ "User" ];
	SCHEMA:ObjectSchema;


	isDecorated( object:object ):object is TransientUser;

	is( value:any ):value is TransientUser;


	decorate<T extends object>( object:T ):T & TransientUser;

	create( data:UserBase ):TransientUser;

	createFrom<T extends UserBase>( object:T ):T & TransientUser;
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

export const TransientUser:TransientUserFactory = {
	TYPE: CS.User,
	SCHEMA,


	isDecorated( object:object ):object is TransientUser {
		return isObject( object )
			&& hasFunction( object, "updateCredentials" )
			;
	},

	is( value:any ):value is TransientUser {
		return TransientDocument.is( value )
			&& TransientUser.isDecorated( value )
			;
	},


	decorate<T extends object>( object:T ):T & TransientUser {
		if( TransientUser.isDecorated( object ) ) return object;

		TransientDocument.decorate( object );

		return Object.defineProperties( object, {
			"updateCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: updateCredentials,
			},
		} );
	},

	create( data:UserBase ):TransientUser {
		return TransientUser.createFrom( { ...data } );
	},

	createFrom<T extends UserBase>( object:T ):T & TransientUser {
		const user:T & TransientUser = TransientUser.decorate( object );
		user._normalize();

		user.addType( TransientUser.TYPE );

		return user;
	},
};

function updateCredentials( this:TransientUser, username?:string, password?:string ):UsernameAndPasswordCredentials {
	const credentials:UsernameAndPasswordCredentials = UsernameAndPasswordCredentials
		.createFrom( { username, password } );

	this.credentials = this.createFragment( credentials );
	return this.credentials;
}

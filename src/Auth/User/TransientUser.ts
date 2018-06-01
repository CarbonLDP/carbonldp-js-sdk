import { TransientDocument } from "../../Document";
import { Documents } from "../../Documents";
import {
	hasFunction,
	isObject,
} from "../../Utils";
import { CS } from "../../Vocabularies";
import { UsernameAndPasswordCredentials } from "../UsernameAndPasswordCredentials";
import { BaseUser } from "./BaseUser";


export interface TransientUser extends TransientDocument {
	name?:string;
	credentials?:UsernameAndPasswordCredentials;

	updateCredentials( username?:string, password?:string ):UsernameAndPasswordCredentials;
}


export interface TransientUserFactory {
	TYPE:CS[ "User" ];


	isDecorated( object:object ):object is TransientUser;

	is( value:any ):value is TransientUser;


	decorate<T extends object>( object:T, documents?:Documents ):T & TransientUser;

	create<T extends object>( data:T & BaseUser ):T & TransientUser;

	createFrom<T extends object>( object:T & BaseUser ):T & TransientUser;
}

export const TransientUser:TransientUserFactory = {
	TYPE: CS.User,


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

	create<T extends object>( data:T & BaseUser ):T & TransientUser {
		const copy:T & BaseUser = Object.assign( {}, data );
		return TransientUser.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseUser ):T & TransientUser {
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

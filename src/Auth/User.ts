import { Documents } from "../Documents";
import { ProtectedDocument } from "../ProtectedDocument";
import { TransientUser } from "./TransientUser";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface User extends ProtectedDocument {
	name?:string;
	credentials?:UsernameAndPasswordCredentials;
}


export interface UserFactory {
	is( value:any ):value is User;


	decorate<T extends object>( object:T, documents:Documents ):User & T;
}

export const User:UserFactory = {
	is( value:any ):value is User {
		return TransientUser.isDecorated( value )
			&& ProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):User & T {
		TransientUser.decorate( object );
		ProtectedDocument.decorate( object, documents );

		const persistedUser:T & User = object as T & User;
		persistedUser.addType( TransientUser.TYPE );

		return persistedUser;
	},
};

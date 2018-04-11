import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { User } from "./User";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface PersistedUser extends PersistedProtectedDocument {
	name?:string;
	credentials?:UsernameAndPasswordCredentials;
}


export interface PersistedUserFactory {
	is( value:any ):value is PersistedUser;


	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T;
}

export const PersistedUser:PersistedUserFactory = {
	is( value:any ):value is PersistedUser {
		return User.isDecorated( value )
			&& PersistedProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T {
		User.decorate( object );
		PersistedProtectedDocument.decorate( object, documents );

		const persistedUser:T & PersistedUser = object as T & PersistedUser;
		persistedUser.addType( User.TYPE );

		return persistedUser;
	},
};

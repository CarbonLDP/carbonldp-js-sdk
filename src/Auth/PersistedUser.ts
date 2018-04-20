import { Documents } from "../Documents";
import { ProtectedDocument } from "../ProtectedDocument";
import { TransientUser } from "./TransientUser";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


export interface PersistedUser extends ProtectedDocument {
	name?:string;
	credentials?:UsernameAndPasswordCredentials;
}


export interface PersistedUserFactory {
	is( value:any ):value is PersistedUser;


	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T;
}

export const PersistedUser:PersistedUserFactory = {
	is( value:any ):value is PersistedUser {
		return TransientUser.isDecorated( value )
			&& ProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):PersistedUser & T {
		TransientUser.decorate( object );
		ProtectedDocument.decorate( object, documents );

		const persistedUser:T & PersistedUser = object as T & PersistedUser;
		persistedUser.addType( TransientUser.TYPE );

		return persistedUser;
	},
};

import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";


export interface UsersEndpoint extends PersistedProtectedDocument {
}


export interface UsersEndpointFactory {
	is( value:any ):value is UsersEndpoint;

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint;
}

export const UsersEndpoint:UsersEndpointFactory = {
	is( value:any ):value is UsersEndpoint {
		return PersistedProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint {
		PersistedProtectedDocument.decorate( object, documents );

		return object as T & UsersEndpoint;
	},
};

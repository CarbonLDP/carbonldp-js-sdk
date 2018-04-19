import { Documents } from "../Documents";
import { ProtectedDocument } from "../ProtectedDocument";


export interface UsersEndpoint extends ProtectedDocument {
}


export interface UsersEndpointFactory {
	is( value:any ):value is UsersEndpoint;

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint;
}

export const UsersEndpoint:UsersEndpointFactory = {
	is( value:any ):value is UsersEndpoint {
		return ProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & UsersEndpoint {
		ProtectedDocument.decorate( object, documents );

		return object as T & UsersEndpoint;
	},
};

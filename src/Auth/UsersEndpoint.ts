import { ProtectedDocument } from "../ProtectedDocument";


export interface UsersEndpoint extends ProtectedDocument {
}


export interface UsersEndpointFactory {
	is( value:any ):value is UsersEndpoint;

	decorate<T extends object>( object:T ):T & UsersEndpoint;
}

export const UsersEndpoint:UsersEndpointFactory = {
	is( value:any ):value is UsersEndpoint {
		return ProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T ):T & UsersEndpoint {
		ProtectedDocument.decorate( object );

		return object as T & UsersEndpoint;
	},
};

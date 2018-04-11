import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";

export type NewRole = {
	name:string;
	description?:string;
};


export interface RolesEndpoint extends PersistedProtectedDocument {
}


export interface RolesEndpointFactory {
	is( value:any ):value is RolesEndpoint;

	decorate<T extends object>( object:T, documents:Documents ):T & RolesEndpoint;
}

export const RolesEndpoint:RolesEndpointFactory = {
	is( value:any ):value is RolesEndpoint {
		return PersistedProtectedDocument.is( value )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & RolesEndpoint {
		PersistedProtectedDocument.decorate( object, documents );

		return object as T & RolesEndpoint;
	},
};

import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";


export interface UsernameAndPasswordCredentialsBase {
	username:string;
	password:string;
}

export interface UsernameAndPasswordCredentials extends VolatileResource {
	username?:string;
	password?:string;
}


export interface UsernameAndPasswordCredentialsFactory {
	TYPE:CS[ "UsernameAndPasswordCredentials" ];
	SCHEMA:ObjectSchema;

	create( username?:string, password?:string ):UsernameAndPasswordCredentials;

	createFrom<T extends object>( object:T, username?:string, password?:string ):T & UsernameAndPasswordCredentials;
}

const SCHEMA:ObjectSchema = {
	"username": {
		"@id": CS.username,
		"@type": XSD.string,
	},
	"password": {
		"@id": CS.password,
		"@type": XSD.string,
	},
};

export const UsernameAndPasswordCredentials:UsernameAndPasswordCredentialsFactory = {
	TYPE: CS.UsernameAndPasswordCredentials,
	SCHEMA,

	create( username?:string, password?:string ):UsernameAndPasswordCredentials {
		return UsernameAndPasswordCredentials.createFrom( {}, username, password );
	},

	createFrom<T extends object>( object:T, username?:string, password?:string ):T & UsernameAndPasswordCredentials {
		const credentials:T & UsernameAndPasswordCredentials = VolatileResource.createFrom<T>( object );

		credentials.addType( UsernameAndPasswordCredentials.TYPE );
		if( username ) credentials.username = username;
		if( password ) credentials.password = password;

		return credentials;
	},
};

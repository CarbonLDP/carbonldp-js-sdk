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

	create( data:UsernameAndPasswordCredentialsBase ):UsernameAndPasswordCredentials;

	createFrom<T extends UsernameAndPasswordCredentialsBase>( object:T ):T & UsernameAndPasswordCredentials;
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

	create( data:UsernameAndPasswordCredentialsBase ):UsernameAndPasswordCredentials {
		return UsernameAndPasswordCredentials.createFrom( { ...data } );
	},

	createFrom<T extends UsernameAndPasswordCredentialsBase>( object:T ):T & UsernameAndPasswordCredentials {
		const credentials:T & UsernameAndPasswordCredentials = VolatileResource.createFrom<T>( object );

		credentials.addType( UsernameAndPasswordCredentials.TYPE );

		return credentials;
	},
};

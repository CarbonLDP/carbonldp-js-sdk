import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import {
	isObject,
	isString,
} from "../Utils";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";


export interface TokenCredentialsBase {
	token:string;
	expires:string | Date;
}

export interface TokenCredentialsBaseFactory {
	is( value:any ):value is TokenCredentialsBase;
}

export const TokenCredentialsBase:TokenCredentialsBaseFactory = {
	is( value:any ):value is TokenCredentialsBase {
		return isObject( value )
			&& value.hasOwnProperty( "token" )
			&& value.hasOwnProperty( "expires" )
			;
	},
};


export interface TokenCredentials extends VolatileResource {
	token:string;
	expires:Date;
}


export interface TokenCredentialsFactory {
	TYPE:CS[ "TokenCredentials" ];
	SCHEMA:ObjectSchema;

	is( value:any ):value is TokenCredentials;

	createFrom<T extends TokenCredentialsBase>( object:T ):T & TokenCredentials;
}

const SCHEMA:ObjectSchema = {
	"token": {
		"@id": CS.token,
		"@type": XSD.string,
	},
	"expires": {
		"@id": CS.expires,
		"@type": XSD.dateTime,
	},
};

export const TokenCredentials:TokenCredentialsFactory = {
	TYPE: CS.TokenCredentials,
	SCHEMA,

	is( value:any ):value is TokenCredentials {
		return VolatileResource.is( value )
			&& value.hasType( TokenCredentials.TYPE )
			;
	},

	createFrom<T extends TokenCredentialsBase>( object:T ):T & TokenCredentials {
		const credentials:T & VolatileResource = VolatileResource.createFrom( object );
		credentials.addType( TokenCredentials.TYPE );

		if( isString( credentials.expires ) )
			credentials.expires = new Date( credentials.expires );

		return credentials as T & TokenCredentials;
	},
};

import * as Document from "./../Document";
import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import { IllegalArgumentError } from "./../Errors";

export const RDF_CLASS:string = NS.CS.Credentials;

export const SCHEMA:ObjectSchema.Class = {
	"email": {
		"@id": NS.VCARD.email,
		"@type": NS.XSD.string,
	},
	"password": {
		"@id": NS.CS.password,
		"@type": NS.XSD.string,
	},
	"enabled": {
		"@id": NS.CS.enabled,
		"@type": NS.XSD.boolean,
	},
	"user": {
		"@id": NS.CS.credentialsOf,
		"@type": "@id",
	},
};

export interface Class extends Document.Class {
	email:string;
	password:string;
	enabled?:boolean;
}

export class Factory {
	static create( email:string, password:string ):Class {
		return Factory.createFrom( {}, email, password );
	}

	static createFrom<T extends Object>( object:T, email:string, password:string ):T & Class {
		const credentials:T & Class = <T & Class> Document.Factory.createFrom<T>( object );

		if( ! email ) throw new IllegalArgumentError( "The email cannot be empty." );
		if( ! password ) throw new IllegalArgumentError( "The password cannot be empty." );

		credentials.addType( RDF_CLASS );
		credentials.email = email;
		credentials.password = password;

		return credentials;
	}
}

export default Class;

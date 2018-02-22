import { CS } from "../Vocabularies/CS";
import { VCARD } from "../Vocabularies/VCARD";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import { IllegalArgumentError } from "./../Errors";
import * as ObjectSchema from "./../ObjectSchema";

export const RDF_CLASS:string = CS.Credentials;

export const SCHEMA:ObjectSchema.Class = {
	"email": {
		"@id": VCARD.email,
		"@type": XSD.string,
	},
	"password": {
		"@id": CS.password,
		"@type": XSD.string,
	},
	"enabled": {
		"@id": CS.enabled,
		"@type": XSD.boolean,
	},
	"user": {
		"@id": CS.credentialsOf,
		"@type": "@id",
	},
};

export interface Class extends Document {
	email:string;
	password:string;
	enabled?:boolean;
}

export class Factory {
	static create( email:string, password:string ):Class {
		return Factory.createFrom( {}, email, password );
	}

	static createFrom<T extends Object>( object:T, email:string, password:string ):T & Class {
		const credentials:T & Class = <T & Class> Document.createFrom<T>( object );

		if( ! email ) throw new IllegalArgumentError( "The email cannot be empty." );
		if( ! password ) throw new IllegalArgumentError( "The password cannot be empty." );

		credentials.addType( RDF_CLASS );
		credentials.email = email;
		credentials.password = password;

		return credentials;
	}
}

export default Class;

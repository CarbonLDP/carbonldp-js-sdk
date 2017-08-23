import * as Document from "./../Document";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import { IllegalArgumentError } from "./../Errors";

export const RDF_CLASS:string = NS.CS.Class.Credentials;

export const SCHEMA:ObjectSchema.Class = {
	"email": {
		"@id": NS.VCARD.Predicate.email,
		"@type": NS.XSD.DataType.string,
	},
	"password": {
		"@id": NS.CS.Predicate.password,
		"@type": NS.XSD.DataType.string,
	},
	"enabled": {
		"@id": NS.CS.Predicate.enabled,
		"@type": NS.XSD.DataType.boolean,
	},
	"user": {
		"@id": NS.CS.Predicate.credentialsOf,
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

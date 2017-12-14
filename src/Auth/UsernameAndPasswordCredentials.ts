import { IllegalArgumentError } from "./../Errors";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.CS.Class.UsernameAndPasswordCredentials;

export const SCHEMA:ObjectSchema.Class = {
	"username": {
		"@id": NS.CS.Predicate.username,
		"@type": NS.XSD.DataType.string,
	},
	"password": {
		"@id": NS.CS.Predicate.password,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Resource.Class {
	username:string;
	password:string;
}

export class Factory {
	static create( username:string, password:string ):Class {
		return Factory.createFrom( {}, username, password );
	}

	static createFrom<T extends object>( object:T, username:string, password:string ):T & Class {
		const credentials:T & Resource.Class = Resource.Factory.createFrom<T>( object );

		if( ! username ) throw new IllegalArgumentError( "The credentials username cannot be empty." );
		if( ! password ) throw new IllegalArgumentError( "The credentials password cannot be empty." );

		credentials.addType( RDF_CLASS );
		return Object.assign( credentials, {
			username,
			password,
		} );
	}
}

export default Class;

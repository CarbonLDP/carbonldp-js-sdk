import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import { Resource } from "./../Resource";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

export const RDF_CLASS:string = CS.Token;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"key": {
		"@id": CS.tokenKey,
		"@type": XSD.string,
	},
	"expirationTime": {
		"@id": CS.expirationTime,
		"@type": XSD.dateTime,
	},
	"user": {
		"@id": CS.credentialsOf,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	key:string;
	expirationTime:Date;
	user:PersistedUser.Class;
}

export class Factory {
	static is( value:any ):boolean {
		return (
			Resource.is( value )
			&& Factory.hasClassProperties( value )
		);
	}

	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "key" )
			&& Utils.hasPropertyDefined( object, "expirationTime" )
			&& Utils.hasPropertyDefined( object, "user" )
		);
	}

	static hasRequiredValues( object:Object ):boolean {
		return (
			Utils.hasProperty( object, "key" )
			&& Utils.hasProperty( object, "expirationTime" )
		);
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( this.hasClassProperties( object ) ) return <any> object;

		return <any> object;
	}

}

export default Class;

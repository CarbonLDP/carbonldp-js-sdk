import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

export const RDF_CLASS:string = NS.CS.Class.Token;

export const SCHEMA:ObjectSchema.Class = {
	"key": {
		"@id": NS.CS.Predicate.tokenKey,
		"@type": NS.XSD.DataType.string,
	},
	"expirationTime": {
		"@id": NS.CS.Predicate.expirationTime,
		"@type": NS.XSD.DataType.dateTime,
	},
	"user": {
		"@id": NS.CS.Predicate.credentialsOf,
		"@type": "@id",
	},
};

export interface Class extends Resource.Class {
	key:string;
	expirationTime:Date;
	user:PersistedUser.Class;
}

export class Factory {
	static is( value:any ):boolean {
		return (
			Resource.Factory.is( value )
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

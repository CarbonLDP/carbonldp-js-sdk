import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";
import Credentials from "./Credentials";

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
};

export interface Class extends Pointer.Class, Credentials {
	key:string;
	expirationTime:Date;
}

export class Factory {
	static is( value:any ):boolean {
		return (
			Utils.isObject( value ) &&
			Factory.hasClassProperties( value )
		);
	}

	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "key" ) &&
			Utils.hasPropertyDefined( object, "expirationTime" )
		);
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( this.hasClassProperties( object ) ) return <any> object;

		return <any> object;
	}

}

export default Class;

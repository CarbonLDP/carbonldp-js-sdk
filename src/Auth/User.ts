import {
	hasFunction,
	isBoolean,
	isObject,
} from "../Utils";
import * as Document from "./../Document";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

export const RDF_CLASS:string = NS.CS.Class.User;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
	"credentials": {
		"@id": NS.CS.Predicate.credentials,
		"@type": "@id",
	},
	"enabled": {
		"@id": NS.CS.Predicate.enabled,
		"@type": NS.XSD.DataType.boolean,
	},
};

export interface Class extends Document.Class {
	name?:string;
	enabled?:boolean;
	disabled?:boolean;
	credentials?:UsernameAndPasswordCredentials.Class;

	setCredentials( email?:string, password?:string ):UsernameAndPasswordCredentials.Class;
}

function setCredentials( this:Class, email?:string, password?:string ):UsernameAndPasswordCredentials.Class {
	const credentials:UsernameAndPasswordCredentials.Class = UsernameAndPasswordCredentials
		.Factory.create( email, password );

	this.credentials = this.createFragment( credentials );
	this.credentials.addType( NS.C.Class.VolatileResource );

	return this.credentials;
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return isObject( object )
			&& hasFunction( object, "setCredentials" )
			;
	}

	static create( disabled?:boolean ):Class {
		return Factory.createFrom( {}, disabled );
	}

	static createFrom<T extends object>( object:T, disabled?:boolean ):T & Class {
		const user:T & Class = Factory.decorate( object );
		if( isBoolean( disabled ) ) user.disabled = disabled;

		return user;
	}

	static decorate<T extends object>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		Document.Factory.decorate( object );

		const user:T & Class = Object.defineProperties( object, {
			"setCredentials": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: setCredentials,
			},
		} );

		return user;

	}
}

export default Class;

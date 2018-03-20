import {
	hasFunction,
	isBoolean,
	isObject,
} from "../Utils";
import { C } from "../Vocabularies/C";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

export const RDF_CLASS:string = CS.User;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"name": {
		"@id": CS.name,
		"@type": XSD.string,
	},
	"credentials": {
		"@id": CS.credentials,
		"@type": "@id",
	},
	"enabled": {
		"@id": CS.enabled,
		"@type": XSD.boolean,
	},
};

export interface Class extends Document {
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
	this.credentials.addType( C.VolatileResource );

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

		Document.decorate( object );

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

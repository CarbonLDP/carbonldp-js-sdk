import * as Document from "./../Document";
import IllegalArgumentError from "./../Errors/IllegalArgumentError";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.Agent;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
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
	"platformRoles": {
		"@id": NS.CS.Predicate.platformRole,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Document.Class {
	name:string;
	email:string;
	password:string;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			&& Utils.hasPropertyDefined( object, "email" )
			&& Utils.hasPropertyDefined( object, "password" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& Document.Factory.hasClassProperties( object )
			&& (<Document.Class> object).hasType( RDF_CLASS )
			;
	}

	static create( name:string, email:string, password:string ):Class {
		return Factory.createFrom<Object>( {}, name, email, password );
	}

	static createFrom<T extends Object>( object:T, name:string, email:string, password:string ):T & Class {
		if( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if( ! name ) throw new IllegalArgumentError( "The name cannot be empty." );
		if( ! email ) throw new IllegalArgumentError( "The email cannot be empty." );
		if( ! password ) throw new IllegalArgumentError( "The password cannot be empty." );

		let app:T & Class = <T & Class> object;
		app.name = name;
		app.email = email;
		app.password = password;
		app.types.push( NS.CS.Class.Agent );

		return app;
	}

}

export default Class;

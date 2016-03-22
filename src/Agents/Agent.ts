import * as Utils from "./../Utils";
import * as Document from "./../Document";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import IllegalArgumentError from "../Errors/IllegalArgumentError";

export const RDF_CLASS:string = NS.CS.Class.Agent;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.name,
		"@type": NS.XSD.DataType.string,
	},
	"email": {
		"@id": NS.VCARD.Predicate.email,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Document.Class {
	name:string;
	email:string;
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "name" )
			&& Utils.hasPropertyDefined( resource, "email" );
	}

	static is( object:Object ):boolean {
		return Document.Factory.hasClassProperties( object )
			&& Factory.hasClassProperties( object )
			&& ( <Document.Class> object ).types.indexOf( NS.CS.Class.Agent ) !== -1;
	}

	static create( name:string, email:string ):Class {
		return Factory.createFrom<Object>( {}, name, email );
	}

	static createFrom<T extends Object>( object:T, name:string, email:string ):T & Class {
		if ( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if ( ! name ) throw new IllegalArgumentError( "The name cannot be empty." );
		if ( ! email ) throw new IllegalArgumentError( "The email cannot be empty." );

		let app:T & Class = <T & Class> object;
		app.name = name;
		app.email = email;
		app.types.push( NS.CS.Class.Agent );

		return app;
	}

}

export default Class;
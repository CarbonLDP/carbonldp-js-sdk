import * as Utils from "./../Utils";
import * as Document from "./../Document";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import IllegalArgumentError from "./../Errors/IllegalArgumentError";

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Document.Class {
	name:string;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" );
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& Document.Factory.is( object )
			;
	}

	static create( name:string ):Class {
		return Factory.createFrom<Object>( {}, name );
	}

	static createFrom<T extends Object>( object:T, name:string ):T & Class {
		if ( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if ( ! name ) throw new IllegalArgumentError( "The name cannot be empty." );

		let app:T & Class = <T & Class> object;
		app.name = name;

		return app;
	}

}

export default Class;

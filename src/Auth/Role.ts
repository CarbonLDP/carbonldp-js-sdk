import * as Document from "./../Document";
import IllegalArgumentError from "./../Errors/IllegalArgumentError";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.Role;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
	"description": {
		"@id": NS.CS.Predicate.description,
		"@type": NS.XSD.DataType.string,
	},
	"users": {
		"@id": NS.CS.Predicate.user,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Document.Class {
	name:string;
	description?:string;
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

	static create( name:string, description?:string ):Class {
		return Factory.createFrom<Object>( {}, name, description );
	}

	static createFrom<T extends Object>( object:T, name:string, description?:string ):T & Class {
		if( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if( ! name ) throw new IllegalArgumentError( "The name cannot be empty." );

		let role:T & Class = <T & Class> object;
		role.name = name;
		role.description = description;

		return role;
	}

}

export default Class;

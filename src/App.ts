import * as Document from "./Document";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import Pointer from "./Pointer";
import * as Utils from "./Utils";
import IllegalArgumentError from "./Errors/IllegalArgumentError";

import * as PersistedRole from "./App/PersistedRole";
import * as Role from "./App/Role";
import * as Roles from "./App/Roles";
import Context from "./App/Context";

export interface Class extends Document.Class {
	name:string;
	description?:string;
	allowsOrigins?:(Pointer | string)[];
}

export const RDF_CLASS:string = NS.CS.Class.Application;

// TODO Problem with circular reference: The SCHEMA is hardcoded in SDKContext module
export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.namae,
		"@type": NS.XSD.DataType.string,
	},
	"description": {
		"@id": NS.CS.Predicate.description,
		"@type": NS.XSD.DataType.string,
	},
	"rootContainer": {
		"@id": NS.CS.Predicate.rootContainer,
		"@type": "@id",
	},
	"allowsOrigins": {
		"@id": NS.CS.Predicate.allowsOrigin,
		"@container": "@set",
	},
};

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "name" );
	}

	static is( object:Object ):boolean {
		return Document.Factory.hasClassProperties( object )
			&& Factory.hasClassProperties( object )
			&& (object as Document.Class).hasType( RDF_CLASS );
	}

	static create( name:string, description?:string ):Class {
		return Factory.createFrom<Object>( {}, name, description );
	}

	static createFrom<T extends Object>( object:T, name:string, description?:string ):T & Class {
		if( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if( ! Utils.isString( name ) || ! name )
			throw new IllegalArgumentError( "The name cannot be empty." );

		let app:T & Class = <T & Class> object;
		app.name = name;
		app.types.push( NS.CS.Class.Application );

		if( ! ! description ) app.description = description;

		return app;
	}

}

export {
	Context,
	PersistedRole,
	Role,
	Roles,
};

export default Class;

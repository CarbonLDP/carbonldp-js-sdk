import * as Document from "./Document";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as Utils from "./Utils";
import {IllegalArgumentError} from "./Errors";

import Context from "./App/Context";

export interface Class extends Document.Class {
	name:string;
}

export const RDF_CLASS:string = NS.CS.Class.Application;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.name,
		"@type": NS.XSD.DataType.string,
	},
	"rootContainer": {
		"@id": NS.CS.Predicate.rootContainer,
		"@type": "@id",
	},
	"allowsOrigin": {
		"@id": NS.CS.Predicate.allowsOrigin,
	},
};

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "name" );
	}

	static is( object:Object ):boolean {
		return Document.Factory.hasClassProperties( object )
			&& Factory.hasClassProperties( object )
			&& ( <Document.Class> object ).types.indexOf( NS.CS.Class.Application ) !== -1;
	}

	static create( name:string ):Class {
		return Factory.createFrom<Object>( {}, name );
	}

	static createFrom<T extends Object>( object:T, name:string ):T & Class {
		if ( ! Document.Factory.hasClassProperties( object ) )
			object = Document.Factory.createFrom( object );

		if ( ! Utils.isString( name ) || ! name )
			throw new IllegalArgumentError( "The name cannot be empty." );

		let app:T & Class = <T & Class> object;
		app.name = name;
		app.types.push( NS.CS.Class.Application );

		return app;
	}

}

export default Class;

export {
	Context
};

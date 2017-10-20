import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";

const inherit:Readonly<{}> = Object.freeze( {} );

export class Class {
	inherit:Readonly<{}> = inherit;

	private _context:QueryContext.Class;

	constructor( queryContext:QueryContext.Class ) {
		this._context = queryContext;
	}

	property( name:string ):QueryProperty.Class {
		return this._context.getProperty( name );
	}

	value( value:string | number | boolean | Date ):QueryValue.Class {
		return new QueryValue.Class( this._context, value );
	}

	object( object:Pointer.Class | string ):QueryObject.Class {
		return new QueryObject.Class( this._context, object );
	}

	withType( iriClass:string ):Class {
		// TODO:
		throw new Error( "Not implemented" );
	}

	properties( propertiesSchema:any/*QueryPropertiesSchema*/ ):Class /*& QueryDocumentGetter*/ {
		// TODO:
		throw new Error( "Not implemented" );
	}
}

export default Class;


import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";
import { QueryRootProperty } from "./QueryRootProperty";
import { _getParentPath } from "./Utils";


export class QueryDocumentContainer extends QueryContainer {
	readonly _queryProperty:QueryRootProperty;


	constructor( context:AbstractContext<any, any, any>, propertyData:{ name:string, uri:string } ) {
		super( context );

		this._queryProperty = new QueryRootProperty( {
			queryContainer: this,
			...propertyData,
		} );
	}


	serializeLiteral( type:string, value:any ):string {
		if( ! this.context.jsonldConverter.literalSerializers.has( type ) )
			throw new IllegalArgumentError( `Type "${ type }" hasn't a defined serializer.` );

		return this.context.jsonldConverter
			.literalSerializers
			.get( type )
			.serialize( value );
	}


	hasSchemaFor( object:object, path?:string ):boolean {
		if( path === void 0 )
			return super.hasSchemaFor( object );

		const property:QueryProperty2 | undefined = this
			.__getProperty( path );

		return ! property && ! property.isEmpty();
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 )
			return super.getSchemaFor( object );

		const property:QueryProperty2 | undefined = this.__getProperty( path );
		if( property ) return property.getSchema();

		const parentPath:string = _getParentPath( path );
		const parent:QueryProperty2 | undefined = this.__getProperty( parentPath );

		if( ! parent || ! parent.isComplete() )
			throw new IllegalArgumentError( `Schema path "${ path }" does not exists.` );

		return super.getSchemaFor( object );
	}

	protected __getProperty( path:string ):QueryProperty2 | undefined {
		return this
			._queryProperty
			.getProperty( path )
			;
	}

}

import * as Context from "../../Context";
import { IllegalArgumentError } from "../../Errors";
import {
	DigestedObjectSchema,
	DigestedPropertyDefinition
} from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryProperty from "./QueryProperty";
import { getLevelRegExp } from "./Utils";

export class Class extends QueryContext.Class {

	private _propertiesMap:Map<string, QueryProperty.Class>;
	private _schemas:DigestedObjectSchema[];

	constructor( context?:Context.Class ) {
		super( context );
		this._propertiesMap = new Map();
	}

	hasProperty( name:string ):boolean {
		return this._propertiesMap.has( name );
	}

	hasProperties( name:string ):boolean {
		const levelRegex:RegExp = getLevelRegExp( name );
		return Array.from( this._propertiesMap.keys() )
			.some( propertyName => levelRegex.test( propertyName ) );
	}

	addProperty( name:string ):QueryProperty.Class {
		const property:QueryProperty.Class = new QueryProperty.Class( this, name, );
		this._propertiesMap.set( name, property );
		return property;
	}

	getProperty( name:string ):QueryProperty.Class {
		return this._propertiesMap.get( name );
	}

	getProperties( name:string ):QueryProperty.Class[] {
		const levelRegex:RegExp = getLevelRegExp( name );
		return Array.from( this._propertiesMap.entries() )
			.filter( ( [ propertyName ] ) => levelRegex.test( propertyName ) )
			.map( ( [ propertyName, property ] ) => property );
	}

	getInheritTypeDefinition( existingSchema:DigestedObjectSchema, propertyName:string, propertyURI?:string ):DigestedPropertyDefinition {
		const schemas:DigestedObjectSchema[] = [ existingSchema, ...this._getTypeSchemas() ];

		for( const schema of schemas ) {
			if( ! schema.properties.has( propertyName ) ) continue;
			const digestedProperty:DigestedPropertyDefinition = schema.properties.get( propertyName );

			if( propertyURI && digestedProperty.uri.stringValue !== propertyURI ) continue;
			return digestedProperty;
		}
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const property:QueryProperty.Class = this.getProperty( path );
		if( property ) {
			switch( property.getType() ) {
				case QueryProperty.PropertyType.PARTIAL:
					return this.getProperty( path ).getSchema();

				case QueryProperty.PropertyType.FULL:
					return super.getSchemaFor( object );

				default:
					throw new IllegalArgumentError( `Property "${ path }" is not a resource.` );
			}
		}

		const parent:QueryProperty.Class = this.getProperty( path
			.split( "." )
			.slice( 0, - 1 )
			.join( "." )
		);

		if( ! parent || parent.getType() !== QueryProperty.PropertyType.FULL )
			throw new IllegalArgumentError( `Schema path "${ path }" does not exists.` );

		return super.getSchemaFor( object );
	}

	isPartial( path:string ):boolean {
		if( ! this.hasProperty( path ) ) return false;

		return this
			.getProperty( path )
			.getType() === QueryProperty.PropertyType.PARTIAL
			;
	}

	private _getTypeSchemas():DigestedObjectSchema[] {
		if( this._schemas ) return this._schemas;

		const schemasTypes:Set<string> = new Set();
		(function addSchemasTypes( context:Context.Class ):void {
			if( ! context ) return;
			Array.from( context[ "typeObjectSchemaMap" ].keys() ).forEach( schemasTypes.add, schemasTypes );
			addSchemasTypes( context.parentContext );
		})( this.context );

		this._schemas = [];
		schemasTypes.forEach( type => this._schemas.push( this.context.getObjectSchema( type ) ) );
		return this._schemas;
	}

}

export default Class;

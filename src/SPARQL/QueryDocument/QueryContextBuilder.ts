import { PatternToken } from "sparqler/tokens";

import * as Context from "../../Context";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
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
		name += ".";
		return Array.from( this._propertiesMap.keys() )
			.some( key => key.startsWith( name ) );
	}

	addProperty( name:string, pattern?:PatternToken ):QueryProperty.Class {
		const property:QueryProperty.Class = new QueryProperty.Class( this, name, pattern );
		this._propertiesMap.set( name, property );
		return property;
	}

	getProperty( name:string ):QueryProperty.Class {
		return this._propertiesMap.get( name );
	}

	getProperties( propertyLevel:string ):QueryProperty.Class[] {
		const levelRegex:RegExp = getLevelRegExp( propertyLevel );
		return Array.from( this._propertiesMap.entries() )
			.filter( ( [ name ] ) => levelRegex.test( name ) )
			.map( ( [ name, property ] ) => property );
	}

	getInheritTypeDefinition( propertyName:string, propertyURI?:string, existingSchema:DigestedObjectSchema = this.context.getObjectSchema() ):DigestedPropertyDefinition {
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

		const property:QueryProperty.Class = this._propertiesMap.get( path );
		if( ! property ) throw new Error( `Schema path "${ path }" does not exists.` );

		return property.getSchema();
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

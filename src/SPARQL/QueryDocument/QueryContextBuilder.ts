import { Context } from "../../Context";
import { IllegalArgumentError } from "../../Errors";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaDigester,
	ObjectSchemaUtils,
} from "../../ObjectSchema";
import { QueryContext } from "./QueryContext";
import {
	QueryProperty,
	QueryPropertyType,
} from "./QueryProperty";
import {
	getLevelRegExp,
	getParentPath,
} from "./Utils";

export class QueryContextBuilder extends QueryContext {

	private _propertiesMap:Map<string, QueryProperty>;
	private _schemas:DigestedObjectSchema[];

	constructor( context?:Context ) {
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

	addProperty( name:string ):QueryProperty {
		const property:QueryProperty = new QueryProperty( this, name, );
		this._propertiesMap.set( name, property );
		return property;
	}

	getProperty( name:string ):QueryProperty {
		return this._propertiesMap.get( name );
	}

	getProperties( name:string ):QueryProperty[] {
		const levelRegex:RegExp = getLevelRegExp( name );
		return Array.from( this._propertiesMap.entries() )
			.filter( ( [ propertyName ] ) => levelRegex.test( propertyName ) )
			.map( ( [ propertyName, property ] ) => property );
	}

	getInheritTypeDefinition( existingSchema:DigestedObjectSchema, propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty {
		const schemas:DigestedObjectSchema[] = [ existingSchema, ...this._getTypeSchemas() ];

		for( const schema of schemas ) {
			if( ! schema.properties.has( propertyName ) ) continue;

			const mergeSchema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [ existingSchema, schema ] );
			const digestedProperty:DigestedObjectSchemaProperty = ObjectSchemaUtils.resolveProperty( mergeSchema, schema.properties.get( propertyName ) );

			if( ! propertyURI || propertyURI === digestedProperty.uri ) return digestedProperty;
		}
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		if( path === void 0 ) return super.hasSchemaFor( object );
		if( ! this.hasProperty( path ) ) return false;

		const property:QueryProperty = this.getProperty( path );
		return property.getType() !== void 0;
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) return super.getSchemaFor( object );

		const property:QueryProperty = this.getProperty( path );
		if( property ) {
			switch( property.getType() ) {
				case QueryPropertyType.PARTIAL:
					return this.getProperty( path ).getSchema();

				case QueryPropertyType.FULL:
				case QueryPropertyType.ALL:
					return super.getSchemaFor( object );

				default:
					throw new IllegalArgumentError( `Property "${ path }" is not a resource.` );
			}
		}

		const parent:QueryProperty = this.getProperty( getParentPath( path ) );
		if( ! parent || parent.getType() !== QueryPropertyType.FULL )
			throw new IllegalArgumentError( `Schema path "${ path }" does not exists.` );

		return super.getSchemaFor( object );
	}

	private _getTypeSchemas():DigestedObjectSchema[] {
		if( this._schemas ) return this._schemas;

		const schemasTypes:Set<string> = new Set();
		(function addSchemasTypes( context:Context ):void {
			if( ! context ) return;
			Array.from( context[ "typeObjectSchemaMap" ].keys() ).forEach( schemasTypes.add, schemasTypes );
			addSchemasTypes( context.parentContext );
		})( this.context );

		this._schemas = [];
		schemasTypes.forEach( type => this._schemas.push( this.context.getObjectSchema( type ) ) );
		return this._schemas;
	}

}

export default QueryContextBuilder;

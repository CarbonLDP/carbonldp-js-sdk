import { isPrefixed, isRelative } from "sparqler/iri";
import { IRIToken, PatternToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";

import * as Context from "../../Context";
import { DigestedObjectSchema, DigestedPropertyDefinition, Resolver, Util as SchemaUtils } from "../../ObjectSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";
import { getLevelRegExp } from "./Utils";

export class Class implements Resolver {
	readonly context?:Context.Class;

	protected _propertiesMap:Map<string, QueryProperty.Class>;

	private _variablesCounter:number;
	private _variablesMap:Map<string, QueryVariable.Class>;

	private _prefixesMap:Map<string, PrefixToken>;

	private _schemas:DigestedObjectSchema[];

	constructor( context?:Context.Class ) {
		this.context = context;
		this._propertiesMap = new Map();

		this._variablesCounter = 0;
		this._variablesMap = new Map();

		this._prefixesMap = new Map();
	}

	getVariable( name:string ):QueryVariable.Class {
		if( this._variablesMap.has( name ) ) return this._variablesMap.get( name );

		const variable:QueryVariable.Class = new QueryVariable.Class( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );
		return variable;
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

	serializeLiteral( type:string, value:any ):string {
		type = this.expandIRI( type );

		if( ! this.context || ! this.context.documents.jsonldConverter.literalSerializers.has( type ) ) return "" + value;
		return this.context.documents.jsonldConverter.literalSerializers.get( type ).serialize( value );
	}

	expandIRI( iri:string ):string {
		if( this.context ) {
			const vocab:string = this.context.hasSetting( "vocabulary" ) ? this.context.resolve( this.context.getSetting( "vocabulary" ) ) : void 0;
			iri = SchemaUtils.resolveURI( iri, this.context.getObjectSchema(), vocab );
		}

		if( isPrefixed( iri ) ) throw new Error( `Prefix "${ iri.split( ":" )[ 0 ] }" has not been declared.` );

		return iri;
	}

	compactIRI( iri:string ):IRIToken | PrefixedNameToken {
		if( ! this.context ) {
			if( isPrefixed( iri ) ) throw new Error( `Prefixed iri "${ iri }" is not supported without a context.` );
			if( isRelative( iri ) ) throw new Error( `Relative iri "${ iri }" is not supported without a context.` );
			return new IRIToken( iri );
		}

		const schema:DigestedObjectSchema = this.context.getObjectSchema();

		let namespace:string;
		let localName:string;
		if( ! isPrefixed( iri ) ) {
			for( const [ prefixName, { stringValue: prefixURI } ] of Array.from( schema.prefixes.entries() ) ) {
				if( ! iri.startsWith( prefixURI ) ) continue;
				namespace = prefixName;
				localName = iri.substr( prefixURI.length );
				break;
			}
			if( namespace === void 0 ) return new IRIToken( iri );
		}

		const prefixedName:PrefixedNameToken = new PrefixedNameToken( namespace || iri, localName );

		namespace = prefixedName.namespace;
		if( ! this._prefixesMap.has( namespace ) ) {
			if( ! schema.prefixes.has( namespace ) ) throw new Error( `Prefix "${ namespace }" has not been declared.` );
			const prefixIRI:IRIToken = new IRIToken( schema.prefixes.get( namespace ).stringValue );
			this._prefixesMap.set( namespace, new PrefixToken( namespace, prefixIRI ) );
		}

		return prefixedName;
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

	getGeneralSchema():DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.documents.getGeneralSchema();
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( path === void 0 ) {
			if( ! this.context ) return new DigestedObjectSchema();
			return this.context.documents.getSchemaFor( object );
		}

		const property:QueryProperty.Class = this._propertiesMap.get( path );
		if( ! property ) throw new Error( `Schema path "${ path }" does not exists.` );

		return property.getSchema();
	}

	getPrologues():PrefixToken[] {
		return Array.from( this._prefixesMap.values() );
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

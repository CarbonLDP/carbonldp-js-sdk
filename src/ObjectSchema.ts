import * as Errors from "./Errors";
import * as NS from "./NS";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface PropertyDefinition {
	"@id"?:string;
	"@type"?:string;
	"@language"?:string;
	"@container"?:string;
}

export interface Class {
	"@base"?:string;
	"@vocab"?:string;
	"@index"?:Object;
	"@language"?:string;
	"@reverse"?:Object;

	[ name:string ]:(string | PropertyDefinition);
}

export enum ContainerType {
	SET,
	LIST,
	LANGUAGE,
}

export enum PointerType {
	ID,
	VOCAB,
}

export class DigestedObjectSchema {
	base:string;
	language:string;
	vocab:string;
	prefixes:Map<string, string>;
	properties:Map<string, DigestedPropertyDefinition>;

	constructor() {
		this.base = "";
		this.vocab = null;
		this.language = null;
		this.prefixes = new Map<string, string>();
		this.properties = new Map<string, DigestedPropertyDefinition>();
	}
}

export class DigestedPropertyDefinition {
	uri:string = null;
	literal:boolean = null;
	literalType:string = null;
	pointerType:PointerType = null;
	language:string;
	containerType:ContainerType = null;
}

export interface Resolver {
	getGeneralSchema():DigestedObjectSchema;

	hasSchemaFor( object:object, path?:string ):boolean;

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema;
}

export class Digester {

	static digestSchema( schemas:Class[], generalSchema?:DigestedObjectSchema ):DigestedObjectSchema;
	static digestSchema( schema:Class, generalSchema?:DigestedObjectSchema ):DigestedObjectSchema;
	static digestSchema( schemaOrSchemas:Class | Class[], generalSchema?:DigestedObjectSchema ):DigestedObjectSchema {
		const schemas:Class[] = Array.isArray( schemaOrSchemas ) ? schemaOrSchemas : [ schemaOrSchemas ];

		const digestedSchemas:DigestedObjectSchema[] = schemas
			.map( schema => Digester.digestSingleSchema( schema, generalSchema ) );

		return Digester.combineDigestedObjectSchemas( digestedSchemas );
	}

	static combineDigestedObjectSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		if( digestedSchemas.length === 0 ) throw new Errors.IllegalArgumentError( "At least one DigestedObjectSchema needs to be specified." );

		const target:DigestedObjectSchema = new DigestedObjectSchema();
		target.vocab = digestedSchemas[ 0 ].vocab;
		target.base = digestedSchemas[ 0 ].base;
		target.language = digestedSchemas[ 0 ].language;

		for( const digestedSchema of digestedSchemas ) {
			Utils.M.extend( target.prefixes, digestedSchema.prefixes );
			Utils.M.extend( target.properties, digestedSchema.properties );
		}

		return target;
	}

	static digestPropertyDefinition( digestedSchema:DigestedObjectSchema, propertyName:string, propertyDefinition:PropertyDefinition, generalSchema?:DigestedObjectSchema ):DigestedPropertyDefinition {
		const digestedDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();

		if( "@id" in propertyDefinition ) {
			if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );
			if( ! Utils.isString( propertyDefinition[ "@id" ] ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );
		}
		digestedDefinition.uri = Util.resolveURI( propertyDefinition[ "@id" ] || propertyName, digestedSchema, generalSchema );

		if( "@type" in propertyDefinition ) {
			if( ! Utils.isString( propertyDefinition[ "@type" ] ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

			if( propertyDefinition[ "@type" ] === "@id" || propertyDefinition[ "@type" ] === "@vocab" ) {
				digestedDefinition.literal = false;
				digestedDefinition.pointerType = ( propertyDefinition[ "@type" ] === "@id" ) ? PointerType.ID : PointerType.VOCAB;
			} else {
				digestedDefinition.literal = true;

				const type:string = propertyDefinition[ "@type" ];
				digestedDefinition.literalType = RDF.URI.Util.isRelative( type ) && type in NS.XSD.DataType ?
					NS.XSD.DataType[ type ] : Util.resolveURI( type, digestedSchema, generalSchema );
			}
		}

		if( "@language" in propertyDefinition ) {
			let language:string = propertyDefinition[ "@language" ];
			if( language !== null && ! Utils.isString( language ) ) throw new Errors.IllegalArgumentError( "@language needs to point to a string or null." );
			digestedDefinition.language = language;
		}

		if( "@container" in propertyDefinition ) {
			switch( propertyDefinition[ "@container" ] ) {
				case "@set":
					digestedDefinition.containerType = ContainerType.SET;
					break;
				case "@list":
					digestedDefinition.containerType = ContainerType.LIST;
					break;
				case "@language":
					if( Utils.isString( digestedDefinition.language ) ) throw new Errors.IllegalArgumentError( "@container cannot be set to @language when the property definition already contains an @language tag." );
					digestedDefinition.containerType = ContainerType.LANGUAGE;
					break;
				default:
					throw new Errors.IllegalArgumentError( "@container needs to be equal to '@list', '@set', or '@language'" );
			}
		}

		return digestedDefinition;
	}

	private static digestSingleSchema( schema:Class, generalSchema?:DigestedObjectSchema ):DigestedObjectSchema {
		const digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( const propertyName of [ "@base", "@vocab" ] as [ "@base" | "@vocab" ] ) {
			if( ! ( propertyName in schema ) ) continue;
			let value:string = schema[ propertyName ];

			if( value !== null && ! Utils.isString( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be a string or null.` );
			if( ( propertyName === "@vocab" && value === "" ) || ! RDF.URI.Util.isAbsolute( value ) && ! RDF.URI.Util.isBNodeID( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be an absolute URI${ propertyName === "@base" ? " or an empty string" : "" }.` );

			digestedSchema[ propertyName.substr( 1 ) ] = value;
		}
		digestedSchema.base = digestedSchema.base || "";

		if( "@language" in schema ) {
			let value:string = schema[ "@language" ];
			if( value !== null && ! Utils.isString( value ) ) throw new Errors.InvalidJSONLDSyntaxError( `The value of '@language' must be a string or null.` );
			digestedSchema.language = value;
		}

		const properties:[ string, PropertyDefinition ][] = [];

		for( let propertyName in schema ) {
			if( ! schema.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;
			if( propertyName === "@vocab" ) continue;
			if( propertyName === "@language" ) continue;

			let propertyValue:( string | PropertyDefinition ) = schema[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot be equal to another URI." );

				const uri:string = Util.resolveURI( propertyValue, digestedSchema );
				digestedSchema.prefixes.set( propertyName, uri );

			} else if( ! ! propertyValue && Utils.isObject( propertyValue ) ) {
				properties.push( [ propertyName, propertyValue ] );

			} else {
				throw new Errors.IllegalArgumentError( "ObjectSchema Properties can only have string values or object values." );
			}
		}

		properties.forEach( ( [ propertyName, definition ] ) => {
			const digestedDefinition:DigestedPropertyDefinition = Digester
				.digestPropertyDefinition( digestedSchema, propertyName, definition, generalSchema );
			digestedSchema.properties.set( propertyName, digestedDefinition );
		} );

		return digestedSchema;
	}

}

export class Util {

	static resolveURI( uri:string, schema:DigestedObjectSchema, generalSchema?:DigestedObjectSchema ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		if( RDF.URI.Util.isPrefixed( uri ) ) return Util._resolvePrefixedName( uri, schema, generalSchema );

		return Util._resolveRelativeURI( uri, schema, generalSchema );
	}

	static resolvePrefixedURI( uri:string, schema:DigestedObjectSchema ):string {
		if( ! RDF.URI.Util.isPrefixed( uri ) ) return uri;
		return this._resolvePrefixedName( uri, schema );
	}

	private static _resolveRelativeURI( uri:string, schema:DigestedObjectSchema, generalSchema?:DigestedObjectSchema ):string {
		if( schema && schema.vocab !== null ) return schema.vocab + uri;
		if( generalSchema && generalSchema.vocab !== null ) return generalSchema.vocab + uri;

		return uri;
	}

	private static _resolvePrefixedName( uri:string, schema:DigestedObjectSchema, generalSchema?:DigestedObjectSchema ):string {
		const [ namespace, localName ]:[ string, string ] = <[ string, string ]> uri.split( ":" );

		if( schema && schema.prefixes.has( namespace ) ) return schema.prefixes.get( namespace ) + localName;
		if( generalSchema && generalSchema.prefixes.has( namespace ) ) return generalSchema.prefixes.get( namespace ) + localName;

		throw new Errors.IllegalArgumentError( `The URI "${ uri }" cannot be resolved, its prefix "${ namespace }" has not been declared.` );
	}
}

export default Class;

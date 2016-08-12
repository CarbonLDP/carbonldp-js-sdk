import * as Errors from "./Errors";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
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
	"@index"?:Object;
	"@language"?:string;
	"@reverse"?:Object;
	"@vocab"?:string;
	[ name:string ]:(string | PropertyDefinition);
}

export enum ContainerType {
	SET,
	LIST,
	LANGUAGE
}

export enum PointerType {
	ID,
	VOCAB,
}

export class DigestedObjectSchema {
	base:string;
	vocab:string;
	prefixes:Map<string, RDF.URI.Class>;
	properties:Map<string, DigestedPropertyDefinition>;
	prefixedURIs:Map<string, RDF.URI.Class[]>;

	constructor() {
		this.base = "";
		this.vocab = null;
		this.prefixes = new Map<string, RDF.URI.Class>();
		this.properties = new Map<string, DigestedPropertyDefinition>();
		this.prefixedURIs = new Map<string, RDF.URI.Class[]>();
	}
}

export class DigestedPropertyDefinition {
	uri:RDF.URI.Class = null;
	literal:boolean = null;
	literalType:RDF.URI.Class = null;
	pointerType:PointerType = null;
	language:string = null;
	containerType:ContainerType = null;
}

export interface Resolver {
	getGeneralSchema():DigestedObjectSchema;
	getSchemaFor( object:Object ):DigestedObjectSchema;
}

export class Digester {
	static digestSchema( schemas:Class[] ):DigestedObjectSchema;
	static digestSchema( schema:Class ):DigestedObjectSchema;
	static digestSchema( schemaOrSchemas:any ):DigestedObjectSchema {
		if( ! Utils.isArray( schemaOrSchemas ) ) return Digester.digestSingleSchema( schemaOrSchemas );

		let digestedSchemas:DigestedObjectSchema[] = [];
		for( let schema of <Class[]> schemaOrSchemas ) {
			digestedSchemas.push( Digester.digestSingleSchema( schema ) );
		}

		return Digester.combineDigestedObjectSchemas( digestedSchemas );
	}

	static combineDigestedObjectSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		if( digestedSchemas.length === 0 ) throw new Errors.IllegalArgumentError( "At least one DigestedObjectSchema needs to be specified." );

		let combinedSchema:DigestedObjectSchema = new DigestedObjectSchema();
		combinedSchema.vocab = digestedSchemas[ 0 ].vocab;
		combinedSchema.base = digestedSchemas[ 0 ].base;

		for( let digestedSchema of digestedSchemas ) {
			Utils.M.extend( combinedSchema.prefixes, digestedSchema.prefixes );
			Utils.M.extend( combinedSchema.prefixedURIs, digestedSchema.prefixedURIs );
			Utils.M.extend( combinedSchema.properties, digestedSchema.properties );
		}

		Digester.resolvePrefixedURIs( combinedSchema );

		return combinedSchema;
	}

	public static resolvePrefixedURI( uri:string, digestedSchema:DigestedObjectSchema ):string {
		if( uri === null ) return null;
		if( ! RDF.URI.Util.isPrefixed( uri ) ) return uri;

		let [ prefix, slug ]:[ string, string ] = <[ string, string ]> uri.split( ":" );

		if( digestedSchema.prefixes.has( prefix ) ) {
			uri = digestedSchema.prefixes.get( prefix ) + slug;
		}

		return uri;
	}

	private static _resolvePrefixedURI( uri:RDF.URI.Class, digestedSchema:DigestedObjectSchema ):RDF.URI.Class {
		if( uri.stringValue === null || ! RDF.URI.Util.isPrefixed( uri.stringValue ) ) return uri;

		let [ prefix, slug ]:[ string, string ] = <[ string, string ]> uri.stringValue.split( ":" );

		if( digestedSchema.prefixes.has( prefix ) ) {
			uri.stringValue = digestedSchema.prefixes.get( prefix ) + slug;
		} else {
			if( ! digestedSchema.prefixedURIs.has( prefix ) ) digestedSchema.prefixedURIs.set( prefix, [] );
			digestedSchema.prefixedURIs.get( prefix ).push( uri );
		}

		return uri;
	}

	private static digestSingleSchema( schema:Class ):DigestedObjectSchema {
		let digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( let propertyName of [ "@base", "@vocab" ] ) {
			if( ! ( propertyName in schema ) ) continue;
			let value:string = <string> schema[ propertyName ];

			if( ! Utils.isString( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be a string or null.` );
			if( ( propertyName === "@vocab" || ! ! value ) && ! RDF.URI.Util.isAbsolute( value ) && ! RDF.URI.Util.isBNodeID( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be an absolute URI${ propertyName === "@base" ? " or an empty string" : "" }.` );

			digestedSchema[ propertyName.substr( 1 ) ] = value;
		}
		digestedSchema.base = digestedSchema.base || "";

		for( let propertyName in schema ) {
			if( ! schema.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;
			if( propertyName === "@vocab" ) continue;

			let propertyValue:( string | PropertyDefinition ) = schema[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot be equal to another URI." );

				let uri:RDF.URI.Class = new RDF.URI.Class( <string> propertyValue );
				if( RDF.URI.Util.isPrefixed( uri.stringValue ) ) uri = Digester._resolvePrefixedURI( uri, digestedSchema );

				digestedSchema.prefixes.set( propertyName, uri );
			} else if( ! ! propertyValue && Utils.isObject( propertyValue ) ) {
				let schemaDefinition:PropertyDefinition = <PropertyDefinition> propertyValue;
				let digestedDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();

				if( "@id" in schemaDefinition ) {
					if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );

					if( ! Utils.isString( schemaDefinition[ "@id" ] ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );
					digestedDefinition.uri = Digester._resolvePrefixedURI( new RDF.URI.Class( schemaDefinition[ "@id" ] ), digestedSchema );
				} else if( RDF.URI.Util.isPrefixed( propertyName ) ) {
					digestedDefinition.uri = Digester._resolvePrefixedURI( new RDF.URI.Class( propertyName ), digestedSchema );
				} else if( digestedSchema.vocab !== null ) {
					digestedDefinition.uri = new RDF.URI.Class( digestedSchema.vocab + <string> propertyName );
				} else {
					throw new Errors.IllegalArgumentError( `Every property definition needs to have a "@id" defined.` );
				}

				if( "@type" in schemaDefinition ) {
					if( ! Utils.isString( schemaDefinition[ "@type" ] ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

					if( schemaDefinition[ "@type" ] === "@id" || schemaDefinition[ "@type" ] === "@vocab" ) {
						digestedDefinition.literal = false;
						digestedDefinition.pointerType = ( schemaDefinition[ "@type" ] === "@id" ) ? PointerType.ID : PointerType.VOCAB;
					} else {
						digestedDefinition.literal = true;
						digestedDefinition.literalType = Digester._resolvePrefixedURI( new RDF.URI.Class( schemaDefinition[ "@type" ] ), digestedSchema );
					}
				}

				if( "@language" in schemaDefinition ) {
					if( ! Utils.isString( schemaDefinition[ "@language" ] ) ) throw new Errors.IllegalArgumentError( "@language needs to point to a string" );
					digestedDefinition.language = schemaDefinition[ "@language" ];
				}

				if( "@container" in schemaDefinition ) {
					switch( schemaDefinition[ "@container" ] ) {
						case "@set":
							digestedDefinition.containerType = ContainerType.SET;
							break;
						case "@list":
							digestedDefinition.containerType = ContainerType.LIST;
							break;
						case "@language":
							if( digestedDefinition.language !== null ) throw new Errors.IllegalArgumentError( "@container cannot be set to @language when the property definition already contains an @language tag." );
							digestedDefinition.containerType = ContainerType.LANGUAGE;
							break;
						default:
							throw new Errors.IllegalArgumentError( "@container needs to be equal to '@list', '@set', or '@language'" );
					}
				}

				digestedSchema.properties.set( propertyName, digestedDefinition );
			} else {
				throw new Errors.IllegalArgumentError( "ObjectSchema Properties can only have string values or object values." );
			}
		}

		Digester.resolvePrefixedURIs( digestedSchema );

		return digestedSchema;
	}

	private static resolvePrefixedURIs( digestedSchema:DigestedObjectSchema ):DigestedObjectSchema {
		digestedSchema.prefixes.forEach( ( prefixValue:RDF.URI.Class, prefixName:string ) => {
			if( ! digestedSchema.prefixedURIs.has( prefixName ) ) return;

			let prefixedURIs:RDF.URI.Class[] = digestedSchema.prefixedURIs.get( prefixName );
			for( let prefixedURI of prefixedURIs ) {
				Digester._resolvePrefixedURI( prefixedURI, digestedSchema );
			}

			digestedSchema.prefixedURIs.delete( prefixName );
		} );

		return digestedSchema;
	}
}


export default Class;

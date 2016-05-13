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

export class DigestedObjectSchema {
	base:string;
	vocab:string;
	prefixes:Map<string, RDF.URI.Class>;
	properties:Map<string, DigestedPropertyDefinition>;
	prefixedURIs:Map<string, RDF.URI.Class[]>;

	constructor() {
		this.base = "";
		this.vocab = "";
		this.prefixes = new Map<string, RDF.URI.Class>();
		this.properties = new Map<string, DigestedPropertyDefinition>();
		this.prefixedURIs = new Map<string, RDF.URI.Class[]>();
	}
}

export class DigestedPropertyDefinition {
	uri:RDF.URI.Class = null;
	literal:boolean = null;
	literalType:RDF.URI.Class = null;
	language:string = null;
	containerType:ContainerType = null;
}

export interface Resolver {
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

		for( let digestedSchema of digestedSchemas ) {
			Utils.M.extend( combinedSchema.prefixes, digestedSchema.prefixes );
			Utils.M.extend( combinedSchema.prefixedURIs, digestedSchema.prefixedURIs );
			Utils.M.extend( combinedSchema.properties, digestedSchema.properties );
		}

		Digester.resolvePrefixedURIs( combinedSchema );

		return combinedSchema;
	}

	private static digestSingleSchema( schema:Class ):DigestedObjectSchema {
		let digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( let propertyName in schema ) {
			if( ! schema.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;

			let propertyValue:( string | PropertyDefinition ) = schema[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot be equal to another URI." );

				let uri:RDF.URI.Class = new RDF.URI.Class( <string> propertyValue );
				if( RDF.URI.Util.isPrefixed( uri.stringValue ) ) uri = Digester.resolvePrefixedURI( uri, digestedSchema );

				if ( propertyName === "@vocab" ) {
					digestedSchema.vocab = uri.toString();
				} else {
					digestedSchema.prefixes.set( propertyName, uri );
				}
			} else if( !! propertyValue && Utils.isObject( propertyValue ) ) {
				let schemaDefinition:PropertyDefinition = <PropertyDefinition> propertyValue;
				let digestedDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();

				if( "@id" in schemaDefinition ) {
					if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );

					if( ! Utils.isString( schemaDefinition[ "@id" ] ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );
					digestedDefinition.uri = Digester.resolvePrefixedURI( new RDF.URI.Class( schemaDefinition[ "@id" ] ), digestedSchema );
				} else if( RDF.URI.Util.isPrefixed( propertyName ) ) {
					digestedDefinition.uri = Digester.resolvePrefixedURI( new RDF.URI.Class( propertyName ), digestedSchema );
				} else {
					// TODO: Handle @vocab or @base case
					throw new Errors.IllegalArgumentError( "Every property definition needs to have a uri defined." );
				}

				if( "@type" in schemaDefinition ) {
					if( ! Utils.isString( schemaDefinition[ "@type" ] ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

					if( schemaDefinition[ "@type" ] === "@id" ) {
						digestedDefinition.literal = false;
					} else {
						digestedDefinition.literal = true;
						digestedDefinition.literalType = Digester.resolvePrefixedURI( new RDF.URI.Class( schemaDefinition[ "@type" ] ), digestedSchema );
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
				Digester.resolvePrefixedURI( prefixedURI, digestedSchema );
			}

			digestedSchema.prefixedURIs.delete( prefixName );
		} );

		return digestedSchema;
	}

	private static resolvePrefixedURI( uri:RDF.URI.Class, digestedSchema:DigestedObjectSchema ):RDF.URI.Class {
		if( ! RDF.URI.Util.isPrefixed( uri.stringValue ) ) return uri;

		let uriParts:string[] = uri.stringValue.split( ":" );
		let prefix:string = uriParts[ 0 ];
		let slug:string = uriParts[ 1 ];

		if( digestedSchema.prefixes.has( prefix ) ) {
			uri.stringValue = digestedSchema.prefixes.get( prefix ) + slug;
		} else {
			if( ! digestedSchema.prefixedURIs.has( prefix ) ) digestedSchema.prefixedURIs.set( prefix, [] );
			digestedSchema.prefixedURIs.get( prefix ).push( uri );
		}

		return uri;
	}
}


export default Class;

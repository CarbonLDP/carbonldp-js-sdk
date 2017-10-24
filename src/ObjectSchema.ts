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
	prefixes:Map<string, RDF.URI.Class>;
	properties:Map<string, DigestedPropertyDefinition>;
	prefixedURIs:Map<string, RDF.URI.Class[]>;

	constructor() {
		this.base = "";
		this.vocab = null;
		this.language = null;
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
	language:string;
	containerType:ContainerType = null;
}

export interface Resolver {
	getGeneralSchema():DigestedObjectSchema;

	getSchemaFor( object:Object ):DigestedObjectSchema;
}

export class Digester {
	static digestSchema( schemas:Class[], vocab?:string ):DigestedObjectSchema;
	static digestSchema( schema:Class, vocab?:string ):DigestedObjectSchema;
	static digestSchema( schemaOrSchemas:any, vocab?:string ):DigestedObjectSchema {
		schemaOrSchemas = Utils.isArray( schemaOrSchemas ) ? schemaOrSchemas : [ schemaOrSchemas ];

		let digestedSchemas:DigestedObjectSchema[] = [];
		for( let schema of <Class[]> schemaOrSchemas ) {
			digestedSchemas.push( Digester.digestSingleSchema( schema, vocab ) );
		}

		return Digester.combineDigestedObjectSchemas( digestedSchemas );
	}

	static combineDigestedObjectSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		if( digestedSchemas.length === 0 ) throw new Errors.IllegalArgumentError( "At least one DigestedObjectSchema needs to be specified." );

		let combinedSchema:DigestedObjectSchema = new DigestedObjectSchema();
		combinedSchema.vocab = digestedSchemas[ 0 ].vocab;
		combinedSchema.base = digestedSchemas[ 0 ].base;
		combinedSchema.language = digestedSchemas[ 0 ].language;

		for( let digestedSchema of digestedSchemas ) {
			Utils.M.extend( combinedSchema.prefixes, digestedSchema.prefixes );
			Utils.M.extend( combinedSchema.prefixedURIs, digestedSchema.prefixedURIs );
			Utils.M.extend( combinedSchema.properties, digestedSchema.properties );
		}

		Digester.resolvePrefixedURIs( combinedSchema );

		return combinedSchema;
	}

	static digestPropertyDefinition( digestedSchema:DigestedObjectSchema, propertyName:string, propertyDefinition:PropertyDefinition, vocab?:string ):DigestedPropertyDefinition {
		const digestedDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();

		if( "@id" in propertyDefinition ) {
			if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );
			if( ! Utils.isString( propertyDefinition[ "@id" ] ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );
		}
		digestedDefinition.uri = new RDF.URI.Class( propertyDefinition[ "@id" ] || propertyName );
		Digester._resolveURI( digestedDefinition.uri, digestedSchema, vocab );

		if( "@type" in propertyDefinition ) {
			if( ! Utils.isString( propertyDefinition[ "@type" ] ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

			if( propertyDefinition[ "@type" ] === "@id" || propertyDefinition[ "@type" ] === "@vocab" ) {
				digestedDefinition.literal = false;
				digestedDefinition.pointerType = ( propertyDefinition[ "@type" ] === "@id" ) ? PointerType.ID : PointerType.VOCAB;
			} else {
				digestedDefinition.literal = true;

				let type:RDF.URI.Class = Digester._resolvePrefixedURI( new RDF.URI.Class( propertyDefinition[ "@type" ] ), digestedSchema );
				if( RDF.URI.Util.isRelative( type.stringValue ) && type.stringValue in NS.XSD.DataType ) type.stringValue = NS.XSD.DataType[ type.stringValue ];

				digestedDefinition.literalType = type;
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

	public static resolvePrefixedURI( uri:string, digestedSchema:DigestedObjectSchema ):string {
		if( uri === null ) return null;
		if( ! RDF.URI.Util.isPrefixed( uri ) ) return uri;

		let [ prefix, slug ]:[ string, string ] = <[ string, string ]> uri.split( ":" );

		if( digestedSchema.prefixes.has( prefix ) ) {
			uri = digestedSchema.prefixes.get( prefix ) + slug;
		}

		return uri;
	}

	private static _resolveURI( uri:RDF.URI.Class, digestedSchema:DigestedObjectSchema, vocab?:string ):RDF.URI.Class {
		uri.stringValue = Util.resolveURI( uri.stringValue, digestedSchema, vocab );
		if( RDF.URI.Util.isPrefixed( uri.stringValue ) ) {
			const [ prefix ]:string[] = uri.stringValue.split( ":" );
			if( ! digestedSchema.prefixedURIs.has( prefix ) ) digestedSchema.prefixedURIs.set( prefix, [] );
			digestedSchema.prefixedURIs.get( prefix ).push( uri );
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

	private static digestSingleSchema( schema:Class, vocab?:string ):DigestedObjectSchema {
		let digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( let propertyName of [ "@base", "@vocab" ] ) {
			if( ! ( propertyName in schema ) ) continue;
			let value:string = <string> schema[ propertyName ];

			if( value !== null && ! Utils.isString( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be a string or null.` );
			if( ( propertyName === "@vocab" && value === "" ) || ! RDF.URI.Util.isAbsolute( value ) && ! RDF.URI.Util.isBNodeID( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be an absolute URI${ propertyName === "@base" ? " or an empty string" : "" }.` );

			digestedSchema[ propertyName.substr( 1 ) ] = value;
		}
		digestedSchema.base = digestedSchema.base || "";

		if( "@language" in schema ) {
			let value:string = <string> schema[ "@language" ];
			if( value !== null && ! Utils.isString( value ) ) throw new Errors.InvalidJSONLDSyntaxError( `The value of '@language' must be a string or null.` );
			digestedSchema.language = value;
		}

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

				let uri:RDF.URI.Class = new RDF.URI.Class( <string> propertyValue );
				if( RDF.URI.Util.isPrefixed( uri.stringValue ) ) uri = Digester._resolvePrefixedURI( uri, digestedSchema );

				digestedSchema.prefixes.set( propertyName, uri );
			} else if( ! ! propertyValue && Utils.isObject( propertyValue ) ) {
				const digestedDefinition:DigestedPropertyDefinition = Digester.digestPropertyDefinition( digestedSchema, propertyName, propertyValue, vocab );
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

export class Util {
	static resolveURI( uri:string, schema:DigestedObjectSchema, vocab?:string ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		if( RDF.URI.Util.isPrefixed( uri ) ) {
			uri = Digester.resolvePrefixedURI( uri, schema );
		} else if( schema.vocab !== null || vocab ) {
			uri = ( schema.vocab || vocab ) + uri;
		}

		return uri;
	}
}

export default Class;

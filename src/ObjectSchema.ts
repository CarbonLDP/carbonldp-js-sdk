import * as Errors from "./Errors";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import { XSD } from "./Vocabularies/XSD";

export interface PropertyDefinition {
	"@id"?:string;
	"@type"?:string;
	"@language"?:string;
	"@container"?:string;
}

export interface Class {
	"@base"?:string;
	"@vocab"?:string;
	"@index"?:object;
	"@language"?:string;
	"@reverse"?:object;

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

export class DigestedPropertyDefinition {
	uri:string = null;
	literal:boolean = null;
	literalType:string = null;
	pointerType:PointerType = null;
	language?:string;
	containerType:ContainerType = null;
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

	/*_resolve():this {
		this.prefixes.forEach( ( uri, namespace, map ) => {
			if( RDF.URI.Util.isAbsolute( uri ) ) return;
			map.set( namespace, Util.resolveURI( uri, this ) );
		} );
		this.properties.forEach( ( definition, name, map ) => {
			const resolved:DigestedPropertyDefinition = Util.resolveProperty( this, definition );
			if( definition !== resolved ) map.set( name, resolved );
		} );

		return this;
	}*/

}

export interface Resolver {
	getGeneralSchema():DigestedObjectSchema;

	hasSchemaFor( object:object, path?:string ):boolean;

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema;
}

export class Digester {

	static digestSchema( schema:Class ):DigestedObjectSchema;
	static digestSchema( schemas:Class[] ):DigestedObjectSchema;
	static digestSchema( schemas:Class | Class[] ):DigestedObjectSchema {
		if( ! Array.isArray( schemas ) ) return Digester._digestSchema( schemas );

		const digestedSchemas:DigestedObjectSchema[] = schemas
			.map( schema => Digester._digestSchema( schema ) );

		return Digester._combineSchemas( digestedSchemas );
	}

	static digestProperty( name:string, definition:PropertyDefinition, digestedSchema?:DigestedObjectSchema ):DigestedPropertyDefinition {
		const digestedDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();

		if( "@id" in definition ) {
			const uri:any = definition[ "@id" ];

			if( RDF.URI.Util.isPrefixed( name ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );
			if( ! Utils.isString( uri ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );

			digestedDefinition.uri = uri;
		} else {
			digestedDefinition.uri = name;
		}

		if( "@type" in definition ) {
			let type:any = definition[ "@type" ];
			if( ! Utils.isString( type ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

			if( type === "@id" || type === "@vocab" ) {
				digestedDefinition.literal = false;
				digestedDefinition.pointerType = type === "@id" ? PointerType.ID : PointerType.VOCAB;

			} else {
				if( RDF.URI.Util.isRelative( type ) && type in XSD ) type = XSD[ type ];

				digestedDefinition.literal = true;
				digestedDefinition.literalType = type;
			}
		}

		if( "@language" in definition ) {
			const language:string = definition[ "@language" ];
			if( language !== null && ! Utils.isString( language ) ) throw new Errors.IllegalArgumentError( "@language needs to point to a string or null." );

			digestedDefinition.literal = true;
			digestedDefinition.language = language;
		}

		if( "@container" in definition ) {
			switch( definition[ "@container" ] ) {
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

		return digestedSchema ?
			Util.resolveProperty( digestedSchema, digestedDefinition, true ) :
			digestedDefinition;
	}

	static combineDigestedObjectSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		if( digestedSchemas.length === 0 ) throw new Errors.IllegalArgumentError( "At least one DigestedObjectSchema needs to be specified." );

		digestedSchemas.unshift( new DigestedObjectSchema() );
		return Digester._combineSchemas( digestedSchemas );
	}

	private static _digestSchema( schema:Class ):DigestedObjectSchema {
		const digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( const propertyName of [ "@base", "@vocab" ] as [ "@base", "@vocab" ] ) {
			if( ! ( propertyName in schema ) ) continue;
			const value:string = schema[ propertyName ];

			if( value !== null && ! Utils.isString( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be a string or null.` );
			if( ( propertyName === "@vocab" && value === "" ) || ! RDF.URI.Util.isAbsolute( value ) && ! RDF.URI.Util.isBNodeID( value ) ) throw new Errors.IllegalArgumentError( `The value of '${ propertyName }' must be an absolute URI${ propertyName === "@base" ? " or an empty string" : "" }.` );

			digestedSchema[ propertyName.substr( 1 ) ] = value;
		}
		digestedSchema.base = digestedSchema.base || "";

		if( "@language" in schema ) {
			const value:string = schema[ "@language" ];
			if( value !== null && ! Utils.isString( value ) ) throw new Errors.InvalidJSONLDSyntaxError( `The value of '@language' must be a string or null.` );
			digestedSchema.language = value;
		}

		for( const propertyName in schema ) {
			if( ! schema.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;
			if( propertyName === "@vocab" ) continue;
			if( propertyName === "@language" ) continue;

			let propertyValue:( string | PropertyDefinition ) = schema[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot be equal to another URI." );
				digestedSchema.prefixes.set( propertyName, propertyValue );

			} else if( ! ! propertyValue && Utils.isObject( propertyValue ) ) {
				const definition:DigestedPropertyDefinition = Digester.digestProperty( propertyName, propertyValue );
				digestedSchema.properties.set( propertyName, definition );

			} else {
				throw new Errors.IllegalArgumentError( "ObjectSchema Properties can only have string values or object values." );
			}
		}

		return digestedSchema;
	}

	private static _combineSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		const [ targetSchema, ...restSchemas ] = digestedSchemas;

		restSchemas.forEach( schema => {
			if( schema.vocab !== null ) targetSchema.vocab = schema.vocab;
			if( schema.base !== "" ) targetSchema.base = schema.base;
			if( schema.language !== null ) targetSchema.language = schema.language;

			Utils.M.extend( targetSchema.prefixes, schema.prefixes );
			Utils.M.extend( targetSchema.properties, schema.properties );
		} );

		return targetSchema;
	}

}

export class Util {

	static resolveURI( uri:string, schema:DigestedObjectSchema, relativeTo:{ vocab?:boolean, base?:boolean } = {} ):string {
		if( uri === null || RDF.URI.Util.isAbsolute( uri ) || RDF.URI.Util.isBNodeID( uri ) ) return uri;

		const [ prefix, localName = "" ]:[ string, string ] = uri.split( ":" ) as [ string, string ];

		const definedReference:string = schema.prefixes.has( prefix ) ?
			schema.prefixes.get( prefix ) : schema.properties.has( prefix ) ?
				schema.properties.get( prefix ).uri
				: null;
		if( definedReference !== null && definedReference !== prefix ) {
			return Util.resolveURI( definedReference + localName, schema, { vocab: true } );
		}

		if( localName ) return uri;

		if( relativeTo.vocab && schema.vocab !== null ) return schema.vocab + uri;
		if( relativeTo.base ) return RDF.URI.Util.resolve( schema.base, uri );

		return uri;
	}

	static resolveProperty( schema:DigestedObjectSchema, definition:DigestedPropertyDefinition, inSame?:boolean ):DigestedPropertyDefinition {
		const uri:string = definition.uri;
		const type:string = definition.literalType;

		const resolvedURI:string = Util.resolveURI( uri, schema, { vocab: true } );
		const resolvedType:string = Util.resolveURI( type, schema, { vocab: true, base: true } );

		if( resolvedURI !== uri || resolvedType !== type ) {
			definition = inSame ? definition : Utils.O.clone( definition );
			definition.uri = resolvedURI;
			definition.literalType = resolvedType;
		}

		return definition;
	}
}

export default Class;

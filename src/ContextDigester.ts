/// <reference path="./../typings/tsd.d.ts" />

import * as Errors from "./Errors";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Context {
	"@base"?:string;
	"@index"?:Object;
	"@language"?:string;
	"@reverse"?:Object;
	"@vocab"?:string;
	[ name:string ]:(string | ContextDefinition);
}

export interface ContextDefinition {
	"@id"?:string;
	"@type"?:string;
	"@language"?:string;
	"@container"?:string;
}

export enum ContainerType {
	SET,
	LIST,
	LANGUAGE
}

export class DigestedContext {
	base:string;
	prefixes:Map<string, URI>;
	properties:Map<string, DigestedDefinition>;
	prefixedURIs:Map<string, URI[]>;

	constructor() {
		this.base = "";
		this.prefixes = new Map<string, URI>();
		this.properties = new Map<string, DigestedDefinition>();
		this.prefixedURIs = new Map<string, URI[]>();
	}
}

export class DigestedDefinition {
	uri:URI = null;
	literal:boolean = null;
	literalType:URI = null;
	language:string = null;
	containerType:ContainerType = null;
}

export class URI {
	stringValue:string;

	constructor( stringValue:string ) {
		this.stringValue = stringValue;
	}

	toString():string {
		return this.stringValue;
	}
}

export class Class {
	static digestContext( contexts:Context[] ):DigestedContext;
	static digestContext( context:Context ):DigestedContext;
	static digestContext( contextOrContexts:any ):DigestedContext {
		if( ! Utils.isArray( contextOrContexts ) ) return Class.digestSingleContext( contextOrContexts );

		let digestedContexts:DigestedContext[] = [];
		for( let context of <Context[]> contextOrContexts ) {
			digestedContexts.push( Class.digestSingleContext( context ) );
		}

		return Class.combineDigestedContexts( digestedContexts );
	}

	private static digestSingleContext( context:Context ):DigestedContext {
		let digestedContext:DigestedContext = new DigestedContext();

		for( let propertyName in context ) {
			if( ! context.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;
			if( propertyName === "@vocab" ) continue;

			let propertyValue:( string | ContextDefinition ) = context[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot be equal to another URI." );

				let uri:URI = new URI( <string> propertyValue );
				if( RDF.URI.Util.isPrefixed( uri.stringValue ) ) uri = Class.resolvePrefixedURI( uri, digestedContext );
				digestedContext.prefixes.set( propertyName, uri );
			} else if( !! propertyValue && Utils.isObject( propertyValue ) ) {
				let contextDefinition:ContextDefinition = <ContextDefinition> propertyValue;
				let digestedDefinition:DigestedDefinition = new DigestedDefinition();

				if( "@id" in contextDefinition ) {
					if( RDF.URI.Util.isPrefixed( propertyName ) ) throw new Errors.IllegalArgumentError( "A prefixed property cannot have assigned another URI." );

					if( ! Utils.isString( contextDefinition[ "@id" ] ) ) throw new Errors.IllegalArgumentError( "@id needs to point to a string" );
					digestedDefinition.uri = Class.resolvePrefixedURI( new URI( contextDefinition[ "@id" ] ), digestedContext );
				} else if( RDF.URI.Util.isPrefixed( propertyName ) ) {
					digestedDefinition.uri = Class.resolvePrefixedURI( new URI( propertyName ), digestedContext );
				} else {
					// TODO: Handle @vocab or @base case
					throw new Errors.IllegalArgumentError( "Every property definition needs to have a uri defined." );
				}

				if( "@type" in contextDefinition ) {
					if( ! Utils.isString( contextDefinition[ "@type" ] ) ) throw new Errors.IllegalArgumentError( "@type needs to point to a string" );

					if( contextDefinition[ "@type" ] === "@id" ) {
						digestedDefinition.literal = false;
					} else {
						digestedDefinition.literal = true;
						digestedDefinition.literalType = Class.resolvePrefixedURI( new URI( contextDefinition[ "@type" ] ), digestedContext );
					}
				}

				if( "@language" in contextDefinition ) {
					if( ! Utils.isString( contextDefinition[ "@language" ] ) ) throw new Errors.IllegalArgumentError( "@language needs to point to a string" );
					digestedDefinition.language = contextDefinition[ "@language" ];
				}

				if( "@container" in contextDefinition ) {
					switch( contextDefinition[ "@container" ] ) {
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

				digestedContext.properties.set( propertyName, digestedDefinition );
			} else {
				throw new Errors.IllegalArgumentError( "Context Properties can only have string values or object values." );
			}
		}

		Class.resolvePrefixedURIs( digestedContext );

		return digestedContext;
	}

	private static resolvePrefixedURIs( digestedContext:DigestedContext ):DigestedContext {
		digestedContext.prefixes.forEach( ( prefixValue:URI, prefixName:string ) => {
			if( ! digestedContext.prefixedURIs.has( prefixName ) ) return;

			let prefixedURIs:URI[] = digestedContext.prefixedURIs.get( prefixName );
			for( let prefixedURI of prefixedURIs ) {
				Class.resolvePrefixedURI( prefixedURI, digestedContext );
			}

			digestedContext.prefixedURIs.delete( prefixName );
		} );

		return digestedContext;
	}

	private static resolvePrefixedURI( uri:URI, digestedContext:DigestedContext ):URI {
		let uriParts:string[] = uri.stringValue.split( ":" );
		let prefix:string = uriParts[ 0 ];
		let slug:string = uriParts[ 1 ];

		if( digestedContext.prefixes.has( prefix ) ) {
			uri.stringValue = digestedContext.prefixes.get( prefix ) + slug;
		} else {
			if( ! digestedContext.prefixedURIs.has( prefix ) ) digestedContext.prefixedURIs.set( prefix, [] );
			digestedContext.prefixedURIs.get( prefix ).push( uri );
		}

		return uri;
	}

	private static combineDigestedContexts( digestedContexts:DigestedContext[] ):DigestedContext {
		if( digestedContexts.length === 0 ) throw new Errors.IllegalArgumentError( "At least one digestedContext needs to be specified." );

		let combinedContext:DigestedContext = digestedContexts.shift();

		for( let digestedContext of digestedContexts ) {
			Utils.M.extend( combinedContext.prefixes, digestedContext.prefixes );
			Utils.M.extend( combinedContext.prefixedURIs, digestedContext.prefixedURIs );
			Utils.M.extend( combinedContext.properties, digestedContext.properties );
		}

		Class.resolvePrefixedURIs( combinedContext );

		return combinedContext;
	}
}

export default Class;

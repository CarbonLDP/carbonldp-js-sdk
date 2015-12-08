/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import * as Errors from "./Errors";
import * as NS from "./NS";
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
	/*
	static decorate<T extends RDF.Resource.Class>( resource:T[], context:Context[] ):T[];
	static decorate<T extends RDF.Resource.Class>( resource:T[], context:Context ):T[];
	static decorate<T extends RDF.Resource.Class>( resource:T, contexts:Context[] ):T;
	static decorate<T extends RDF.Resource.Class>( resource:T, context:Context ):T;
	static decorate<T extends RDF.Resource.Class>( resourceOrResources:any, contextOrContexts:any ):any {
		let digestedContext:DigestedContext = Class.digestContext( contextOrContexts );

		if( ! Utils.isArray( resourceOrResources ) ) return Class.decorateSingle( resourceOrResources, digestedContext );
		for( let resource of <T[]>resourceOrResources ) {
			Class.decorateSingle( resource, digestedContext );
		}

		return resourceOrResources;
	}
	*/

	static compact( expandedObject:any, context:Context[] ):any;
	static compact( expandedObject:any, context:Context ):any;
	static compact( expandedObject:any, contextOrContexts:any ):any {
		let digestedContext:DigestedContext = Class.digestContext( contextOrContexts );

		if( ! Utils.isArray( expandedObject ) ) return Class.compactSingle( expandedObject, digestedContext );
		for( let resource of expandedObject ) {
			Class.compactSingle( resource, digestedContext );
		}

		return expandedObject;
	}

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

	private static compactSingle( expandedObject:any, digestedContext:DigestedContext ):any {
		let compactedObject:any = {};
		let propertyURINameMap:Map<string, string> = Class.getPropertyURINameMap( digestedContext );

		Utils.forEachOwnProperty( expandedObject, ( propertyURI:string, value:any ):void => {
			if( propertyURINameMap.has( propertyURI ) ) {
				let propertyName:string = propertyURINameMap.get( propertyURI );
				Class.assignProperty( compactedObject, expandedObject, propertyName, digestedContext );
			} else {
				// TODO: Do your best
			}
		});

		return compactedObject;
	}

	private static assignProperty( compactedObject:any, expandedObject:any, propertyName:string, digestedContext:DigestedContext ):void {
		let propertyDefinition:DigestedDefinition = digestedContext.properties.get( propertyName );
		compactedObject[ propertyName ] = Class.getPropertyValue( expandedObject, propertyDefinition );
	}

	private static getPropertyValue( expandedObject:any, propertyDefinition:DigestedDefinition ):any {
		let propertyURI:string = propertyDefinition.uri.toString();

		switch( propertyDefinition.containerType ) {
			case null:
				// Property is not a list
				if( propertyDefinition.literal ) {
					return Class.getPropertyLiteral( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return Class.getPropertyPointer( expandedObject, propertyURI );
				} else {
					return Class.getProperty( expandedObject, propertyURI );
				}
				break;
			case ContainerType.LIST:
				if( propertyDefinition.literal ) {
					return Class.getPropertyLiteralList( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return Class.getPropertyPointerList( expandedObject, propertyURI );
				} else {
					return Class.getPropertyList( expandedObject, propertyURI );
				}
				break;
			case ContainerType.SET:
				if( propertyDefinition.literal ) {
					return Class.getPropertyLiterals( expandedObject, propertyURI, propertyDefinition.literalType.toString() );
				} else if( propertyDefinition.literal === false ) {
					return Class.getPropertyPointers( expandedObject, propertyURI );
				} else {
					return Class.getProperties( expandedObject, propertyURI );
				}
				break;
			case ContainerType.LANGUAGE:
				return Class.getPropertyLanguageMap( expandedObject, propertyURI );
			default:
				throw new Errors.IllegalArgumentError( "The containerType specified is not supported." );
		}
	}

	private static getProperty( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyValue:any = propertyValues[ 0 ];

		return Class.parseValue( propertyValue );
	}

	private static getPropertyPointer( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! RDF.Node.Factory.is( propertyValue ) ) continue;

			// TODO: Create pointer
			return null;
		}

		return null;
	}

	private static getPropertyLiteral( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			return RDF.Literal.Factory.parse( propertyValue );
		}

		return null;
	}

	private static getPropertyList( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = Class.getList( propertyValues );
		if( ! propertyList ) return null;

		let listValues:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			listValues.push( Class.parseValue( listValue ) );
		}

		return listValues;
	}

	private static getPropertyPointerList( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = Class.getList( propertyValues );
		if( ! propertyList ) return null;

		let listPointers:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! RDF.Node.Factory.is( listValue ) ) continue;

			// TODO: Create pointer
		}

		return listPointers;
	}

	private static getPropertyLiteralList( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyList:RDF.List.Class = Class.getList( propertyValues );
		if( ! propertyList ) return null;

		let listLiterals:Array<any> = [];
		for( let listValue of propertyList[ "@list" ] ) {
			if( ! RDF.Literal.Factory.is( listValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( <any> listValue, literalType ) ) continue;

			listLiterals.push( RDF.Literal.Factory.parse( <any> listValue ) );
		}

		return listLiterals;
	}

	private static getProperties( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let properties:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			properties.push( Class.parseValue( propertyValue ) );
		}

		return properties;
	}

	private static getPropertyPointers( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;
		if( ! propertyValues.length ) return null;

		let propertyPointers:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Node.Factory.is( propertyValue ) ) continue;

			// TODO: Create pointer
		}

		return propertyPointers;
	}

	private static getPropertyLiterals( expandedObject:any, propertyURI:string, literalType:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLiterals:Array<any> = [];
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, literalType ) ) continue;

			propertyLiterals.push( RDF.Literal.Factory.parse( propertyValue ) );
		}

		return propertyLiterals;
	}

	private static getPropertyLanguageMap( expandedObject:any, propertyURI:string ):any {
		let propertyValues:Array<any> = expandedObject[ propertyURI ];
		if( ! propertyValues ) return null;

		let propertyLanguageMap:any = {};
		for( let propertyValue of propertyValues ) {
			if( ! RDF.Literal.Factory.is( propertyValue ) ) continue;
			if( ! RDF.Literal.Factory.hasType( propertyValue, NS.XSD.DataType.string ) ) continue;

			let languageTag:string = propertyValue[ "@language" ];
			if( ! languageTag ) continue;

			propertyLanguageMap[ languageTag ] = RDF.Literal.Factory.parse( propertyValue );
		}

		return propertyLanguageMap;
	}

	private static getList( propertyValues:Array<any> ):RDF.List.Class {
		for( let propertyValue of propertyValues ) {
			if( ! RDF.List.Factory.is( propertyValue ) ) continue;

			return propertyValue;
		}
		return null;
	}

	private static parseValue( propertyValue:RDF.Value.Class ):any {
		if( RDF.Literal.Factory.is( propertyValue ) ) {
			return RDF.Literal.Factory.parse( <any> propertyValue );
		} else if( RDF.Node.Factory.is( propertyValue ) ) {
			// TODO: Create pointer
		} else if( RDF.List.Factory.is( propertyValue ) ) {
			let parsedValue:Array<any> = [];
			let listValues:Array<any> = propertyValue[ "@list" ];
			for( let listValue of listValues ) {
				parsedValue.push( Class.parseValue( listValue ) );
			}
			return parsedValue;
		} else {
			// TODO: What else could it be?
		}
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

	private static getPropertyURINameMap( digestedContext:DigestedContext ):Map<string, string> {
		let map:Map<string, string> = new Map<string, string>();
		digestedContext.properties.forEach( ( definition:DigestedDefinition, propertyName:string ):void => {
			map.set( definition.uri.toString(), propertyName );
		});
		return map;
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

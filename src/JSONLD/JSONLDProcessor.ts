import { InvalidJSONLDSyntaxError } from "../Errors/InvalidJSONLDSyntaxError";
import { NotImplementedError } from "../Errors/NotImplementedError";

import { Header } from "../HTTP/Header";
import { JSONParser } from "../HTTP/JSONParser";
import { RequestOptions, RequestService, RequestUtils } from "../HTTP/Request";
import { Response } from "../HTTP/Response";

import { ContainerType } from "../ObjectSchema/ContainerType";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";
import { PointerType } from "../ObjectSchema/PointerType";

import { RDFList } from "../RDF/List";
import { URI } from "../RDF/URI";

import * as Utils from "./../Utils";


const MAX_CONTEXT_URLS:number = 10;
const LINK_HEADER_REL:string = "http://www.w3.org/ns/json-ld#context";

/**
 * Service that has methods to process JSON-LD objects.
 */
export class JSONLDProcessor {

	/**
	 * Expands a compact JSON-LD object.
	 * This expansion understands local or remotes `@context` entities.
	 * @param input The JSON-LD object to expand.
	 */
	static expand( input:object ):Promise<object[]> {
		// Find and resolve context URLs
		return JSONLDProcessor.__retrieveContexts( input, <{ [ index:string ]:boolean }> Object.create( null ), "" ).then( () => {
			// Expand the document
			let expanded:any = JSONLDProcessor.__process( new DigestedObjectSchema(), input );

			// Optimize @graph
			if( Utils.isObject( expanded ) && "@graph" in expanded && Object.keys( expanded ).length === 1 ) {
				expanded = expanded[ "@graph" ];
			} else if( expanded === null ) {
				expanded = [];
			}

			// Normalize to an array
			if( ! Utils.isArray( expanded ) ) expanded = [ expanded ];

			return expanded;
		} );
	}

	private static __getTargetFromLinkHeader( header:Header ):string {
		let rLinkHeader:RegExp = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
		for( let value of header.values ) {
			let match:string[] = value.toString().match( rLinkHeader );
			if( ! match ) continue;

			let target:string = match[ 1 ];
			let params:string = match[ 2 ];
			let rParams:RegExp = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;

			let result:{ [ key:string ]:string } = {};
			while( true ) {
				match = rParams.exec( params );
				if( ! match ) break;

				result[ match[ 1 ] ] = (match[ 2 ] === undefined) ? match[ 3 ] : match[ 2 ];
			}
			if( result[ "rel" ] === LINK_HEADER_REL ) return target;
		}
		return null;
	}

	private static __findContextURLs( input:Object, contexts:{ [ index:string ]:Object }, base:string, replace:boolean = false ):boolean {
		let previousContexts:number = Object.keys( contexts ).length;

		if( Utils.isArray( input ) ) {
			for( let element of (<Array<Object>> input) ) {
				JSONLDProcessor.__findContextURLs( element, contexts, base );
			}
		} else if( Utils.isPlainObject( input ) ) {
			for( let key in input ) {
				if( "@context" !== key ) {
					JSONLDProcessor.__findContextURLs( input[ key ], contexts, base );
					continue;
				}

				let urlOrArrayOrContext:string | Array<string | Object> | Object = input[ key ];
				if( Utils.isArray( urlOrArrayOrContext ) ) {
					let contextArray:Array<string | Object> = <Array<string | Object>> urlOrArrayOrContext;
					for( let index:number = 0, length:number = contextArray.length; index < length; ++ index ) {
						let urlOrContext:string | Object = contextArray[ index ];
						if( ! Utils.isString( urlOrContext ) ) continue;

						let url:string = <string> urlOrContext;
						url = URI.resolve( base, url );
						if( replace ) {
							if( Utils.isArray( contexts[ url ] ) ) {
								Array.prototype.splice.apply( contextArray, [ index, 1 ].concat( <any> contexts[ url ] ) );
								index += (<Array<any>> contexts[ url ]).length - 1;
								length = contextArray.length;
							} else {
								contextArray[ index ] = contexts[ url ];
							}
						} else if( ! (url in contexts) ) {
							contexts[ url ] = true;
						}
					}
				} else if( Utils.isString( urlOrArrayOrContext ) ) {
					let url:string = <string> urlOrArrayOrContext;
					url = URI.resolve( base, url );
					if( replace ) {
						input[ key ] = contexts[ url ];
					} else if( ! (url in contexts) ) {
						contexts[ url ] = null;
					}
				}
			}
		}

		return previousContexts < Object.keys( contexts ).length;
	}

	private static __retrieveContexts( input:Object, contextsRequested:{ [ index:string ]:boolean }, base:string ):Promise<void> {
		if( Object.keys( contextsRequested ).length > MAX_CONTEXT_URLS ) return Promise.reject<void>( new InvalidJSONLDSyntaxError( "Maximum number of @context URLs exceeded." ) );

		let contextToResolved:{ [ index:string ]:Object } = Object.create( null );
		if( ! JSONLDProcessor.__findContextURLs( input, contextToResolved, base ) ) return Promise.resolve();

		function resolved( url:string, promise:Promise<[ any, Response ]> ):Promise<void> {
			return promise.then( ( [ object, response ]:[ any, Response ] ) => {
				let _contextsRequested:{ [ index:string ]:boolean } = Utils.ObjectUtils.clone<{ [ index:string ]:boolean }>( contextsRequested );
				_contextsRequested[ url ] = true;

				let contextWrapper:Object = { "@context": {} };

				let header:Header = response.getHeader( "Content-Type" );
				if( ! Utils.StringUtils.contains( header.toString(), "application/ld+json" ) ) {
					header = response.getHeader( "Link" );
					let link:string;
					if( ! ! header ) link = JSONLDProcessor.__getTargetFromLinkHeader( header );
					if( ! ! link ) contextWrapper[ "@context" ] = link;
				} else {
					contextWrapper[ "@context" ] = ("@context" in object) ? object[ "@context" ] : {};
				}
				contextToResolved[ url ] = contextWrapper[ "@context" ];

				return JSONLDProcessor.__retrieveContexts( contextWrapper, _contextsRequested, url );
			} );
		}

		let promises:Promise<void>[] = [];
		for( let url in contextToResolved ) {
			if( url in contextsRequested ) return Promise.reject<void>( new InvalidJSONLDSyntaxError( "Cyclical @context URLs detected." ) );

			let requestOptions:RequestOptions = { sendCredentialsOnCORS: false };
			RequestUtils.setAcceptHeader( "application/ld+json, application/json", requestOptions );

			let promise:Promise<[ any, Response ]> = RequestService
				.get( url, requestOptions, new JSONParser() )
				.catch( ( response:Response ) =>
					Promise.reject( new InvalidJSONLDSyntaxError( `Unable to resolve context from "${ url }". Status code: ${ response.status }` ) )
				);
			promises.push( resolved( url, promise ) );
		}

		return Promise.all<void>( promises ).then( () => {
			JSONLDProcessor.__findContextURLs( input, contextToResolved, base, true );
		} );
	}

	private static __isKeyword( value:string ):boolean {
		if( ! Utils.isString( value ) ) return false;

		switch( value ) {
			case "@base":
			case "@context":
			case "@container":
			case "@default":
			case "@embed":
			case "@explicit":
			case "@graph":
			case "@id":
			case "@index":
			case "@language":
			case "@list":
			case "@omitDefault":
			case "@preserve":
			case "@requireAll":
			case "@reverse":
			case "@set":
			case "@type":
			case "@value":
			case "@vocab":
				return true;

			default:
				return false;
		}
	}

	private static __isValidType( value:any ):boolean {
		if( Utils.isString( value ) ) return true;

		if( ! Utils.isArray( value ) ) return false;

		for( let element of (<Array<any>> value) ) {
			if( ! Utils.isString( element ) ) return false;
		}

		return true;
	}

	private static __expandURI( schema:DigestedObjectSchema, uri:string, relativeTo?:{ vocab?:boolean, base?:boolean } ):string {
		if( JSONLDProcessor.__isKeyword( uri ) ) return uri;
		return schema.resolveURI( uri, relativeTo );
	}

	private static __expandLanguageMap( languageMap:any ):any {
		let expandedLanguage:Array<Object> = [];

		let keys:string[] = Object.keys( languageMap ).sort();
		for( let key of keys ) {
			let values:Array<any> = languageMap[ key ];
			if( ! Utils.isArray( values ) ) values = [ values ];

			for( let item of values ) {
				if( item === null ) continue;
				if( ! Utils.isString( item ) ) throw new InvalidJSONLDSyntaxError( "Language map values must be strings." );

				expandedLanguage.push( {
					"@value": item,
					"@language": key.toLowerCase(),
				} );
			}
		}
		return expandedLanguage;
	}

	private static __getContainer( context:DigestedObjectSchema, property:string ):ContainerType {
		if( context.properties.has( property ) ) return context.properties.get( property ).containerType;
		return void 0;
	}

	private static __expandValue( context:DigestedObjectSchema, value:any, propertyName:string ):any {
		if( Utils.isNull( value ) || ! Utils.isDefined( value ) ) return null;

		if( propertyName === "@id" ) {
			return JSONLDProcessor.__expandURI( context, value, { base: true } );
		} else if( propertyName === "@type" ) {
			return JSONLDProcessor.__expandURI( context, value, { vocab: true, base: true } );
		}

		let definition:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
		if( context.properties.has( propertyName ) ) definition = context.properties.get( propertyName );

		if( definition.literal === false || (propertyName === "@graph" && Utils.isString( value )) ) {
			let options:{ base:boolean, vocab?:boolean } = { base: true };
			if( definition.pointerType === PointerType.VOCAB ) options.vocab = true;

			return { "@id": JSONLDProcessor.__expandURI( context, value, options ) };
		}

		if( JSONLDProcessor.__isKeyword( propertyName ) ) return value;

		let expandedValue:Object = {};
		if( definition.literalType ) {
			expandedValue[ "@type" ] = context.resolveURI( definition.literalType, { vocab: true, base: true } );
		} else if( Utils.isString( value ) ) {
			let language:string = Utils.isDefined( definition.language ) ? definition.language : context.language;
			if( language !== null ) expandedValue[ "@language" ] = language;
		}

		// Normalize to string unknowns types
		if( [ "boolean", "number", "string" ].indexOf( typeof value ) === - 1 ) value = value.toString();
		expandedValue[ "@value" ] = value;

		return expandedValue;
	}

	private static __process( context:DigestedObjectSchema, element:Object, activeProperty?:string, insideList?:boolean ):Object {
		if( Utils.isNull( element ) || ! Utils.isDefined( element ) ) return null;

		// Expand an element according to the context
		if( ! Utils.isArray( element ) && ! Utils.isObject( element ) ) {
			if( ! insideList && (activeProperty === null || activeProperty === "@graph") ) return null;
			return JSONLDProcessor.__expandValue( context, element, activeProperty );
		}

		// Recursively expand the array
		if( Utils.isArray( element ) ) {
			let container:ContainerType = JSONLDProcessor.__getContainer( context, activeProperty );
			insideList = insideList || container === ContainerType.LIST;

			const expanded:object[] = [];
			for( let item of element as any[] ) {
				let expandedItem:any = JSONLDProcessor.__process( context, item, activeProperty );
				if( expandedItem === null ) continue;

				if( insideList && (Utils.isArray( expandedItem ) || RDFList.is( expandedItem )) ) throw new InvalidJSONLDSyntaxError( "Lists of lists are not permitted." );

				if( ! Utils.isArray( expandedItem ) ) expandedItem = [ expandedItem ];
				expanded.push( ...expandedItem );
			}
			return expanded;
		}

		// Expand current context
		if( "@context" in element ) {
			context = ObjectSchemaDigester
				.combineDigestedObjectSchemas( [
					context,
					ObjectSchemaDigester.digestSchema( element[ "@context" ] ),
				] );
		}

		// Recursively expand the object
		let expandedElement:Object = {};
		let keys:string[] = Object.keys( element );
		for( let key of keys ) {
			if( key === "@context" ) continue;

			let uri:string = JSONLDProcessor.__expandURI( context, key, { vocab: true } );
			if( ! uri || ! (URI.isAbsolute( uri ) || URI.isBNodeID( uri ) || JSONLDProcessor.__isKeyword( uri )) ) continue;

			let value:any = element[ key ];

			// Validate value
			if( JSONLDProcessor.__isKeyword( uri ) ) {
				if( uri === "@id" && ! Utils.isString( value ) ) throw new InvalidJSONLDSyntaxError( `"@id" value must a string.` );
				if( uri === "@type" && ! JSONLDProcessor.__isValidType( value ) ) throw new InvalidJSONLDSyntaxError( `"@type" value must a string, an array of strings.` );
				if( uri === "@graph" && ! (Utils.isObject( value ) || Utils.isArray( value )) ) throw new InvalidJSONLDSyntaxError( `"@graph" value must not be an object or an array.` );
				if( uri === "@value" && (Utils.isObject( value ) || Utils.isArray( value )) ) throw new InvalidJSONLDSyntaxError( `"@value" value must not be an object or an array.` );
				if( uri === "@language" ) {
					if( value === null ) continue;
					if( ! Utils.isString( value ) ) throw new InvalidJSONLDSyntaxError( `"@language" value must be a string.` );
					value = (<string> value).toLowerCase();
				}

				if( uri === "@index" && ! Utils.isString( value ) ) throw new InvalidJSONLDSyntaxError( `"@index" value must be a string.` );
				if( uri === "@reverse" && ! Utils.isObject( value ) ) throw new InvalidJSONLDSyntaxError( `"@reverse" value must be an object.` );
				// TODO: Not supported
				if( uri === "@index" || uri === "@reverse" ) throw new NotImplementedError( `The SDK does not support "@index" and "@reverse" tags.` );
			}

			let expandedValue:any;
			let container:ContainerType = JSONLDProcessor.__getContainer( context, key );
			if( container === ContainerType.LANGUAGE && Utils.isObject( value ) ) {
				expandedValue = JSONLDProcessor.__expandLanguageMap( value );
			} else {
				let nextActiveProperty:string = key;

				let isList:boolean = uri === "@list";
				if( isList || uri === "@set" ) {
					nextActiveProperty = activeProperty;
					if( isList && activeProperty === "@graph" ) nextActiveProperty = null;
				}

				expandedValue = JSONLDProcessor.__process( context, value, nextActiveProperty, isList );
			}

			// Drop null values if is not a "@value" property
			if( expandedValue === null && uri !== "@value" ) continue;

			if( uri !== "@list" && ! RDFList.is( expandedValue ) && container === ContainerType.LIST ) {
				if( ! Utils.isArray( expandedValue ) ) expandedValue = [ expandedValue ];
				expandedValue = { "@list": expandedValue };
			}

			let useArray:boolean = [ "@type", "@id", "@value", "@language" ].indexOf( uri ) === - 1;
			JSONLDProcessor.__addValue( expandedElement, uri, expandedValue, { propertyIsArray: useArray } );
		}

		if( "@value" in expandedElement ) {
			if( expandedElement[ "@value" ] === null ) expandedElement = null;
		} else if( "@type" in expandedElement ) {
			if( ! Utils.isArray( expandedElement[ "@type" ] ) ) expandedElement[ "@type" ] = [ expandedElement[ "@type" ] ];
		} else if( "@set" in expandedElement ) {
			expandedElement = expandedElement[ "@set" ];
		}

		return expandedElement;
	}

	private static __addValue( element:Object, propertyName:string, value:any, options:{ propertyIsArray:boolean } ):void {
		if( Utils.isArray( value ) ) {
			let values:Array<any> = value;
			if( values.length === 0 && options.propertyIsArray && ! Utils.hasProperty( element, propertyName ) ) element[ propertyName ] = [];
			for( let item of values ) {
				JSONLDProcessor.__addValue( element, propertyName, item, options );
			}

		} else if( propertyName in element ) {
			if( ! JSONLDProcessor.__hasValue( element, propertyName, value ) ) {
				let items:Array<any> = element[ propertyName ];
				if( ! Utils.isArray( items ) ) items = element[ propertyName ] = [ items ];
				items.push( value );
			}
		} else {
			element[ propertyName ] = options.propertyIsArray ? [ value ] : value;
		}
	}

	private static __hasProperty( element:Object, propertyName:string ):boolean {
		if( propertyName in element ) {
			let item:any = element[ propertyName ];
			return ! Utils.isArray( item ) || (<Array<any>> item).length > 0;
		}
		return false;
	}

	private static __compareValues( value1:any, value2:any ):boolean {
		if( value1 === value2 ) return true;

		if( Utils.isObject( value1 ) && Utils.isObject( value2 ) ) {

			if( "@value" in value1
				&& value1[ "@value" ] === value2[ "@value" ]
				&& value1[ "@type" ] === value2[ "@type" ]
				&& value1[ "@language" ] === value2[ "@language" ]
				&& value1[ "@index" ] === value2[ "@index" ] )
				return true;

			if( "@id" in value1 )
				return value1[ "@id" ] === value2[ "@id" ];

		}

		return false;
	}

	private static __hasValue( element:Object, propertyName:string, value:any ):boolean {
		if( JSONLDProcessor.__hasProperty( element, propertyName ) ) {
			let item:any = element[ propertyName ];
			let isList:boolean = RDFList.is( item );

			if( isList || Utils.isArray( item ) ) {
				let items:any[] = isList ? item[ "@list" ] : item;

				for( let entry of items ) {
					if( JSONLDProcessor.__compareValues( entry, value ) ) return true;
				}
			} else if( ! Utils.isArray( value ) ) {
				return JSONLDProcessor.__compareValues( item, value );
			}
		}

		return false;
	}

}

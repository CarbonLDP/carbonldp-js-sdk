import Error from "../Errors/InvalidJSONLDSyntaxError";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

const MAX_CONTEXT_URLS:number = 10;
const LINK_HEADER_REL:string = "http://www.w3.org/ns/json-ld#context";

export class Class {

	static expand( input:object ):Promise<object[]> {
		// Find and resolve context URLs
		return this.retrieveContexts( input, <{ [ index:string ]:boolean }> Object.create( null ), "" ).then( () => {
			// Expand the document
			let expanded:any = Class.process( new ObjectSchema.DigestedObjectSchema(), input );

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

	private static getTargetFromLinkHeader( header:HTTP.Header.Class ):string {
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

				result[ match[ 1 ] ] = ( match[ 2 ] === undefined ) ? match[ 3 ] : match[ 2 ];
			}
			if( result[ "rel" ] === LINK_HEADER_REL ) return target;
		}
		return null;
	}

	private static findContextURLs( input:Object, contexts:{ [ index:string ]:Object }, base:string, replace:boolean = false ):boolean {
		let previousContexts:number = Object.keys( contexts ).length;

		if( Utils.isArray( input ) ) {
			for( let element of (<Array<Object>> input) ) {
				Class.findContextURLs( element, contexts, base );
			}
		} else if( Utils.isPlainObject( input ) ) {
			for( let key in input ) {
				if( "@context" !== key ) {
					Class.findContextURLs( input[ key ], contexts, base );
					continue;
				}

				let urlOrArrayOrContext:string | Array<string | Object> | Object = input[ key ];
				if( Utils.isArray( urlOrArrayOrContext ) ) {
					let contextArray:Array<string | Object> = <Array<string | Object>> urlOrArrayOrContext;
					for( let index:number = 0, length:number = contextArray.length; index < length; ++ index ) {
						let urlOrContext:string | Object = contextArray[ index ];
						if( ! Utils.isString( urlOrContext ) ) continue;

						let url:string = <string> urlOrContext;
						url = RDF.URI.Util.resolve( base, url );
						if( replace ) {
							if( Utils.isArray( contexts[ url ] ) ) {
								Array.prototype.splice.apply( contextArray, [ index, 1 ].concat( <any> contexts[ url ] ) );
								index += (<Array<any>> contexts[ url ]).length - 1;
								length = contextArray.length;
							} else {
								contextArray[ index ] = contexts[ url ];
							}
						} else if( ! ( url in contexts ) ) {
							contexts[ url ] = true;
						}
					}
				} else if( Utils.isString( urlOrArrayOrContext ) ) {
					let url:string = <string> urlOrArrayOrContext;
					url = RDF.URI.Util.resolve( base, url );
					if( replace ) {
						input[ key ] = contexts[ url ];
					} else if( ! ( url in contexts ) ) {
						contexts[ url ] = null;
					}
				}
			}
		}

		return previousContexts < Object.keys( contexts ).length;
	}

	private static retrieveContexts( input:Object, contextsRequested:{ [ index:string ]:boolean }, base:string ):Promise<void> {
		if( Object.keys( contextsRequested ).length > MAX_CONTEXT_URLS ) return Promise.reject<void>( new Error( "Maximum number of @context URLs exceeded." ) );

		let contextToResolved:{ [ index:string ]:Object } = Object.create( null );
		if( ! Class.findContextURLs( input, contextToResolved, base ) ) return Promise.resolve();

		function resolved( url:string, promise:Promise<[ any, HTTP.Response.Class ]> ):Promise<void> {
			return promise.then( ( [ object, response ]:[ any, HTTP.Response.Class ] ) => {
				let _contextsRequested:{ [ index:string ]:boolean } = Utils.O.clone<{ [ index:string ]:boolean }>( contextsRequested );
				_contextsRequested[ url ] = true;

				let contextWrapper:Object = { "@context": {} };

				let header:HTTP.Header.Class = response.getHeader( "Content-Type" );
				if( ! Utils.S.contains( header.toString(), "application/ld+json" ) ) {
					header = response.getHeader( "Link" );
					let link:string;
					if( ! ! header ) link = Class.getTargetFromLinkHeader( header );
					if( ! ! link ) contextWrapper[ "@context" ] = link;
				} else {
					contextWrapper[ "@context" ] = ( "@context" in object ) ? object[ "@context" ] : {};
				}
				contextToResolved[ url ] = contextWrapper[ "@context" ];

				return Class.retrieveContexts( contextWrapper, _contextsRequested, url );
			} );
		}

		let promises:Promise<void>[] = [];
		for( let url in contextToResolved ) {
			if( url in contextsRequested ) return Promise.reject<void>( new Error( "Cyclical @context URLs detected." ) );

			let requestOptions:HTTP.Request.Options = { sendCredentialsOnCORS: false };
			HTTP.Request.Util.setAcceptHeader( "application/ld+json, application/json", requestOptions );

			let promise:Promise<[ any, HTTP.Response.Class ]> = HTTP.Request.Service
				.get( url, requestOptions, new HTTP.JSONParser.Class() )
				.catch( ( response:HTTP.Response.Class ) =>
					Promise.reject( new Error( `Unable to resolve context from "${ url }". Status code: ${ response.status }` ) )
				);
			promises.push( resolved( url, promise ) );
		}

		return Promise.all<void>( promises ).then( () => {
			Class.findContextURLs( input, contextToResolved, base, true );
		} );
	}

	private static isKeyword( value:string ):boolean {
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

	private static isValidType( value:any ):boolean {
		if( Utils.isString( value ) ) return true;

		if( ! Utils.isArray( value ) ) return false;

		for( let element of (<Array<any>> value ) ) {
			if( ! Utils.isString( element ) ) return false;
		}

		return true;
	}

	private static expandURI( schema:ObjectSchema.DigestedObjectSchema, uri:string, relativeTo?:{ vocab?:boolean, base?:boolean } ):string {
		if( Class.isKeyword( uri ) ) return uri;
		return ObjectSchema.Util.resolveURI( uri, schema, relativeTo );
	}

	private static expandLanguageMap( languageMap:any ):any {
		let expandedLanguage:Array<Object> = [];

		let keys:string[] = Object.keys( languageMap ).sort();
		for( let key of keys ) {
			let values:Array<any> = languageMap[ key ];
			if( ! Utils.isArray( values ) ) values = [ values ];

			for( let item of values ) {
				if( item === null ) continue;
				if( ! Utils.isString( item ) ) throw new Error( "Language map values must be strings." );

				expandedLanguage.push( {
					"@value": item,
					"@language": key.toLowerCase(),
				} );
			}
		}
		return expandedLanguage;
	}

	private static getContainer( context:ObjectSchema.DigestedObjectSchema, property:string ):ObjectSchema.ContainerType {
		if( context.properties.has( property ) ) return context.properties.get( property ).containerType;
		return void 0;
	}

	private static expandValue( context:ObjectSchema.DigestedObjectSchema, value:any, propertyName:string ):any {
		if( Utils.isNull( value ) || ! Utils.isDefined( value ) ) return null;

		if( propertyName === "@id" ) {
			return Class.expandURI( context, value, { base: true } );
		} else if( propertyName === "@type" ) {
			return Class.expandURI( context, value, { vocab: true, base: true } );
		}

		let definition:ObjectSchema.DigestedPropertyDefinition = new ObjectSchema.DigestedPropertyDefinition();
		if( context.properties.has( propertyName ) ) definition = context.properties.get( propertyName );

		if( definition.literal === false || ( propertyName === "@graph" && Utils.isString( value ) ) ) {
			let options:{ base:boolean, vocab?:boolean } = { base: true };
			if( definition.pointerType === ObjectSchema.PointerType.VOCAB ) options.vocab = true;

			return { "@id": Class.expandURI( context, value, options ) };
		}

		if( Class.isKeyword( propertyName ) ) return value;

		let expandedValue:Object = {};
		if( definition.literalType ) {
			expandedValue[ "@type" ] = ObjectSchema.Util.resolveURI( definition.literalType, context, { vocab: true, base: true } );
		} else if( Utils.isString( value ) ) {
			let language:string = Utils.isDefined( definition.language ) ? definition.language : context.language;
			if( language !== null ) expandedValue[ "@language" ] = language;
		}

		// Normalize to string unknowns types
		if( [ "boolean", "number", "string" ].indexOf( typeof value ) === - 1 ) value = value.toString();
		expandedValue[ "@value" ] = value;

		return expandedValue;
	}

	private static process( context:ObjectSchema.DigestedObjectSchema, element:Object, activeProperty?:string, insideList?:boolean ):Object {
		if( Utils.isNull( element ) || ! Utils.isDefined( element ) ) return null;

		// Expand an element according to the context
		if( ! Utils.isArray( element ) && ! Utils.isObject( element ) ) {
			if( ! insideList && ( activeProperty === null || activeProperty === "@graph" ) ) return null;
			return Class.expandValue( context, element, activeProperty );
		}

		// Recursively expand the array
		if( Utils.isArray( element ) ) {
			let container:ObjectSchema.ContainerType = Class.getContainer( context, activeProperty );
			insideList = insideList || container === ObjectSchema.ContainerType.LIST;

			const expanded:object[] = [];
			for( let item of element as any[] ) {
				let expandedItem:any = Class.process( context, item, activeProperty );
				if( expandedItem === null ) continue;

				if( insideList && ( Utils.isArray( expandedItem ) || RDF.List.Factory.is( expandedItem ) ) ) throw new Error( "Lists of lists are not permitted." );

				if( ! Utils.isArray( expandedItem ) ) expandedItem = [ expandedItem ];
				expanded.push( ...expandedItem );
			}
			return expanded;
		}

		// Expand current context
		if( "@context" in element ) {
			context = ObjectSchema.Digester
				.combineDigestedObjectSchemas( [
					context,
					ObjectSchema.Digester.digestSchema( element[ "@context" ] ),
				] );
		}

		// Recursively expand the object
		let expandedElement:Object = {};
		let keys:string[] = Object.keys( element );
		for( let key of keys ) {
			if( key === "@context" ) continue;

			let uri:string = Class.expandURI( context, key, { vocab: true } );
			if( ! uri || ! ( RDF.URI.Util.isAbsolute( uri ) || RDF.URI.Util.isBNodeID( uri ) || Class.isKeyword( uri ) ) ) continue;

			let value:any = element[ key ];

			// Validate value
			if( Class.isKeyword( uri ) ) {
				if( uri === "@id" && ! Utils.isString( value ) ) throw new Error( `"@id" value must a string.` );
				if( uri === "@type" && ! Class.isValidType( value ) ) throw new Error( `"@type" value must a string, an array of strings.` );
				if( uri === "@graph" && ! ( Utils.isObject( value ) || Utils.isArray( value ) ) ) throw new Error( `"@graph" value must not be an object or an array.` );
				if( uri === "@value" && ( Utils.isObject( value ) || Utils.isArray( value ) ) ) throw new Error( `"@value" value must not be an object or an array.` );
				if( uri === "@language" ) {
					if( value === null ) continue;
					if( ! Utils.isString( value ) ) throw new Error( `"@language" value must be a string.` );
					value = (<string> value).toLowerCase();
				}

				if( uri === "@index" && ! Utils.isString( value ) ) throw new Error( `"@index" value must be a string.` );
				if( uri === "@reverse" && ! Utils.isObject( value ) ) throw new Error( `"@reverse" value must be an object.` );
				// TODO: Not supported
				if( uri === "@index" || uri === "@reverse" ) throw new Errors.NotImplementedError( `The SDK does not support "@index" and "@reverse" tags.` );
			}

			let expandedValue:any;
			let container:ObjectSchema.ContainerType = Class.getContainer( context, key );
			if( container === ObjectSchema.ContainerType.LANGUAGE && Utils.isObject( value ) ) {
				expandedValue = Class.expandLanguageMap( value );
			} else {
				let nextActiveProperty:string = key;

				let isList:boolean = uri === "@list";
				if( isList || uri === "@set" ) {
					nextActiveProperty = activeProperty;
					if( isList && activeProperty === "@graph" ) nextActiveProperty = null;
				}

				expandedValue = Class.process( context, value, nextActiveProperty, isList );
			}

			// Drop null values if is not a "@value" property
			if( expandedValue === null && uri !== "@value" ) continue;

			if( uri !== "@list" && ! RDF.List.Factory.is( expandedValue ) && container === ObjectSchema.ContainerType.LIST ) {
				if( ! Utils.isArray( expandedValue ) ) expandedValue = [ expandedValue ];
				expandedValue = { "@list": expandedValue };
			}

			let useArray:boolean = [ "@type", "@id", "@value", "@language" ].indexOf( uri ) === - 1;
			Class.addValue( expandedElement, uri, expandedValue, { propertyIsArray: useArray } );
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

	private static addValue( element:Object, propertyName:string, value:any, options:{ propertyIsArray:boolean } ):void {
		if( Utils.isArray( value ) ) {
			let values:Array<any> = value;
			if( values.length === 0 && options.propertyIsArray && ! Utils.hasProperty( element, propertyName ) ) element[ propertyName ] = [];
			for( let item of values ) {
				Class.addValue( element, propertyName, item, options );
			}

		} else if( propertyName in element ) {
			if( ! Class.hasValue( element, propertyName, value ) ) {
				let items:Array<any> = element[ propertyName ];
				if( ! Utils.isArray( items ) ) items = element[ propertyName ] = [ items ];
				items.push( value );
			}
		} else {
			element[ propertyName ] = options.propertyIsArray ? [ value ] : value;
		}
	}

	private static hasProperty( element:Object, propertyName:string ):boolean {
		if( propertyName in element ) {
			let item:any = element[ propertyName ];
			return ! Utils.isArray( item ) || (<Array<any>> item).length > 0;
		}
		return false;
	}

	private static compareValues( value1:any, value2:any ):boolean {
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

	private static hasValue( element:Object, propertyName:string, value:any ):boolean {
		if( Class.hasProperty( element, propertyName ) ) {
			let item:any = element[ propertyName ];
			let isList:boolean = RDF.List.Factory.is( item );

			if( isList || Utils.isArray( item ) ) {
				let items:any[] = isList ? item[ "@list" ] : item;

				for( let entry of items ) {
					if( Class.compareValues( entry, value ) ) return true;
				}
			} else if( ! Utils.isArray( value ) ) {
				return Class.compareValues( item, value );
			}
		}

		return false;
	}

}

export class Util {

}

export default Class;

import Error from "../Errors/InvalidJSONLDSyntaxError";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

const MAX_CTX_URLS:number = 10;
const LINK_HEADER_REL:string = "http://www.w3.org/ns/json-ld#context";

export class Class {
	static expand( input:Object ):Promise<Array<Object>> {
		// Find and resolve context URLs
		return _retrieveContexts( input, <{[ index:string ]:boolean}> Object.create( null ), "" ).then( () => {
			// Expand the document
			let expanded:any = _process( new ObjectSchema.DigestedObjectSchema(), input );

			// Optimize @graph
			if( Utils.isObject( expanded ) && "@graph" in expanded && Object.keys( expanded ).length === 1 ) {
				expanded = expanded[ "@graph" ];
			} else if ( expanded === null ) {
				expanded = [];
			}

			// Normalize to an array
			if( ! Utils.isArray( expanded ) ) expanded = [ expanded ];

			return expanded;
		} );
	}
}

function _getTargetFromLinkHeader( header:HTTP.Header.Class ):string {
	let rLinkHeader:RegExp = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
	for( let value of header.values ) {
		let match:string[] = value.toString().match( rLinkHeader );
		if( ! match ) continue;

		let target:string = match[ 1 ];
		let params:string = match[ 2 ];
		let rParams:RegExp = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;

		let result:{[ key:string ]:string} = {};
		while( true ) {
			match = rParams.exec( params );
			if( ! match ) break;

			result[ match[ 1 ] ] = ( match[ 2 ] === undefined ) ? match[ 3 ] : match[ 2 ];
		}
		if( result[ "rel" ] === LINK_HEADER_REL ) return target;
	}
	return null;
}

function _findContextURLs( input:Object, contexts:{[ index:string ]:Object}, base:string, replace:boolean = false ):boolean {
	let previousContexts:number = Object.keys( contexts ).length;

	if( Utils.isArray( input ) ) {
		for( let element of (<Array<Object>> input) ) {
			_findContextURLs( element, contexts, base );
		}
	} else if ( Utils.isPlainObject( input ) ) {
		for( let key in input ) {
			if( "@context" !== key ) {
				_findContextURLs( input[ key ], contexts, base );
				continue;
			}

			let urlOrArrayOrContext:string | Array<string | Object> | Object = input[ key ];
			if( Utils.isArray( urlOrArrayOrContext ) ) {
				let contextArray:Array<string | Object> = <Array<string | Object>> urlOrArrayOrContext;
				for( let index:number = 0, length:number = contextArray.length; index < length; ++index ) {
					let urlOrContext:string | Object = contextArray[ index ];
					if( ! Utils.isString( urlOrContext ) ) continue;

					let url:string = <string> urlOrContext;
					url = RDF.URI.Util.resolve( base, url );
					if ( replace ) {
						if ( Utils.isArray( contexts[ url ] ) ) {
							Array.prototype.splice.apply( contextArray, [ index, 1 ].concat( <any> contexts[ url ] ) );
							index += (<Array<any>> contexts[ url ]).length - 1;
							length = contextArray.length;
						} else {
							contextArray[ index ] = contexts[ url ];
						}
					} else if ( ! ( url in contexts ) ) {
						contexts[ url ] =  true;
					}
				}
			} else if ( Utils.isString( urlOrArrayOrContext ) ) {
				let url:string = <string> urlOrArrayOrContext;
				url = RDF.URI.Util.resolve( base, url );
				if ( replace ) {
					input[ key ] = contexts[ url ];
				} else if ( ! ( url in contexts ) ) {
					contexts[ url ] =  null;
				}
			}
		}
	}

	return previousContexts < Object.keys( contexts ).length;
}

function _retrieveContexts( input:Object, contextsRequested:{[ index:string ]:boolean}, base:string ):Promise<void> {
	if( Object.keys( contextsRequested ).length > MAX_CTX_URLS ) return Promise.reject<void>( new Error( "Maximum number of @context URLs exceeded." ) );

	let contextToResolved:{[ index:string ]:Object} = Object.create( null );
	if( ! _findContextURLs( input, contextToResolved, base ) ) return Promise.resolve();

	function resolved( url:string, promise:Promise<[ any, HTTP.Response.Class ]> ):Promise<void> {
		return promise.then( ( [ object, response ]:[ any, HTTP.Response.Class ] ) => {
			let _contextsRequested:{[ index:string ]:boolean} = Utils.O.clone<{[ index:string ]:boolean}>( contextsRequested );
			_contextsRequested[ url ] = true;

			let contextWrapper:Object = { "@context": {} };

			let header:HTTP.Header.Class = response.getHeader( "Content-Type" );
			if( ! Utils.S.contains( header.toString(),  "application/ld+json" ) ) {
				header = response.getHeader( "Link" );
				let link:string;
				if( ! ! header ) link = _getTargetFromLinkHeader( header );
				if( ! ! link ) contextWrapper[ "@context" ] = link;
			} else {
				contextWrapper[ "@context" ]  = ( "@context" in object ) ? object[ "@context" ] : {};
			}
			contextToResolved[ url ] = contextWrapper[ "@context" ];

			return _retrieveContexts( contextWrapper, _contextsRequested, url );
		} );
	}

	let promises:Promise<void>[] = [];
	for( let url in contextToResolved ) {
		if( url in contextsRequested ) return Promise.reject<void>( new Error( "Cyclical @context URLs detected." ) );

		let requestOptions:HTTP.Request.Options = { sendCredentialsOnCORS: false };
		HTTP.Request.Util.setAcceptHeader( "application/ld+json, application/json", requestOptions );

		let promise:Promise<[ any, HTTP.Response.Class ]> = HTTP.Request.Service.get( url, requestOptions, new HTTP.JSONParser.Class() );
		promises.push( resolved( url, promise ) );
	}

	return Promise.all<void>( promises ).then( () => {
		_findContextURLs( input, contextToResolved, base, true );
	} );
}

function _isKeyword( value:string ):boolean {
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

function _isValidType( value:any ):boolean {
	if ( Utils.isString( value ) ) return true;

	if( ! Utils.isArray( value ) ) return false;

	for( let element of (<Array<any>> value ) ) {
		if( ! Utils.isString( element ) ) return false;
	}

	return true;
}

function _expandURI( schema:ObjectSchema.DigestedObjectSchema, value:string, relativeTo:{ vocab?:boolean, base?:boolean } = {} ):string {
	if( value === null || _isKeyword( value ) || RDF.URI.Util.isAbsolute( value ) ) return value;

	if( schema.properties.has( value ) ) return schema.properties.get( value ).uri.stringValue;
	if( RDF.URI.Util.isPrefixed( value ) ) return ObjectSchema.Digester.resolvePrefixedURI( value, schema );
	if( schema.prefixes.has( value ) ) return schema.prefixes.get( value ).stringValue;

	if( relativeTo.vocab ) {
		if( schema.vocab === null ) return null;
		return schema.vocab + value;
	}
	if( relativeTo.base ) RDF.URI.Util.resolve( schema.base, value, { untilSlash: true } );

	return value;
}

function _expandLanguageMap( languageMap:any ):any {
	let expandedLanguage:Array<Object> = [];

	let keys:string[] = Object.keys(languageMap).sort();
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

function _getContainer( context:ObjectSchema.DigestedObjectSchema, property:string ):ObjectSchema.ContainerType {
	if( context.properties.has( property ) ) return context.properties.get( property ).containerType;
	return undefined;
}

function _expandValue( context:ObjectSchema.DigestedObjectSchema, value:any, propertyName:string ):any {
	if( Utils.isNull( value ) || ! Utils.isDefined( value ) ) return null;

	if( propertyName === "@id" ) {
		return _expandURI( context, value, { base: true } );
	} else if( propertyName === "@type" ) {
		return _expandURI( context, value, { vocab: true, base: true } );
	}

	let definition:ObjectSchema.DigestedPropertyDefinition = new ObjectSchema.DigestedPropertyDefinition();
	if( context.properties.has( propertyName ) ) definition = context.properties.get( propertyName );

	if( definition.literal === false || ( propertyName === "@graph" && Utils.isString( value ) ) ) {
		let options:{base:boolean, vocab?:boolean} = { base: true };
		if ( definition.pointerType === ObjectSchema.PointerType.VOCAB ) options.vocab = true;

		return { "@id": _expandURI( context, value, options ) };
	}

	if( _isKeyword( propertyName ) ) return value;

	let expandedValue:Object = {};
	if( ! ! definition.literalType ) {
		expandedValue[ "@type" ] = definition.literalType.stringValue;
	} else if( Utils.isString( value ) ) {
		if( ! ! definition.language ) expandedValue[ "@laguage" ] = definition.language;
	}

	// Normalize to string unknowns types
	if( [ "boolean", "number", "string" ].indexOf( typeof value ) === -1 ) value = value.toString();
	expandedValue[ "@value" ] = value;

	return expandedValue;
}

function _process( context:ObjectSchema.DigestedObjectSchema, element:Object, activeProperty?:string, insideList?:boolean ):Object {
	if( Utils.isNull( element ) || ! Utils.isDefined( element ) ) return null;

	// Expand an element according to the context
	if( ! Utils.isArray( element ) && ! Utils.isObject( element ) ) {
		if( ! insideList && ( activeProperty === null || activeProperty === "@graph" ) ) return null;
		return _expandValue( context, element, activeProperty );
	}

	// Recursively expand the array
	if( Utils.isArray( element ) ) {
		let container:ObjectSchema.ContainerType = _getContainer( context, activeProperty );
		insideList = insideList || container === ObjectSchema.ContainerType.LIST;

		let expandedElement:Array<Object> = [];
		for( let item of (<Array<any>> element) ) {
			let expandedItem:any = _process( context, item, activeProperty );
			if( expandedItem === null ) continue;

			if( insideList && ( Utils.isArray( expandedItem )  || RDF.List.Factory.is( expandedItem ) ) ) throw new Error( "Lists of lists are not permitted." );

			if( ! Utils.isArray( expandedItem ) ) expandedItem = [ expandedItem ];
			Array.prototype.push.apply( expandedElement, expandedItem );
		}
		return expandedElement;
	}

	// Expand current context
	if( "@context" in element ) {
		context = ObjectSchema.Digester.combineDigestedObjectSchemas( [
			ObjectSchema.Digester.digestSchema( element[ "@context" ] ),
			context,
		] );
	}

	// Recursively expand the object
	let expandedElement:Object = {};
	let keys:string[] = Object.keys( element );
	for( let key of keys ) {
		if( key === "@context" ) continue;

		let uri:string = _expandURI( context, key, { vocab: true } );
		if( ! uri || ! ( RDF.URI.Util.isAbsolute( uri ) || RDF.URI.Util.isBNodeID( uri ) || _isKeyword( uri ) ) ) continue;

		let value:any = element[ key ];

		// Validate value
		if( _isKeyword( uri ) ) {
			if( uri === "@id" && ! Utils.isString( value ) ) throw new Error( `"@id" value must a string.` );
			if( uri === "@type" && ! _isValidType( value ) ) throw new Error( `"@type" value must a string, an array of strings.` );
			if( uri === "@graph" && ! ( Utils.isObject( value ) || Utils.isArray( value ) ) ) throw new Error( `"@graph" value must not be an object or an array.` );
			if( uri === "@value" && ( Utils.isObject( value ) || Utils.isArray( value ) ) ) throw new Error( `"@value" value must not be an object or an array.` );
			if( uri === "@language" ) {
				if( value ) continue;
				if( ! Utils.isString( value ) ) throw new Error( `"@language" value must be a string.` );
				value = (<string> value).toLowerCase();
			}

			if( uri === "@index" && ! Utils.isString( value ) ) throw new Error( `"@index" value must be a string.` );
			if( uri === "@reverse" && ! Utils.isObject( value ) ) throw new Error( `"@reverse" value must be an object.` );
			// TODO: Not supported
			if( uri === "@index" || uri === "@reverse" ) throw new Errors.NotImplementedError( `The SDK does not support "@index" and "@reverse" tags.` );
		}

		let expandedValue:any;
		let container:ObjectSchema.ContainerType = _getContainer( context, key );
		if( container === ObjectSchema.ContainerType.LANGUAGE  && Utils.isObject( value ) ) {
			expandedValue = _expandLanguageMap( value );
		} else {
			let nextActiveProperty:string = key;

			let isList:boolean = container === ObjectSchema.ContainerType.LIST;
			if( isList || container === ObjectSchema.ContainerType.SET ) nextActiveProperty = ( isList && activeProperty === "@graph" ) ? null : activeProperty;

			expandedValue = _process( context, value, nextActiveProperty );
		}

		// Drop null values if is not a "@value" property
		if( expandedValue === null && uri !== "@value" ) continue;

		if( uri !== "@list" && ! RDF.List.Factory.is( expandedValue ) && container === ObjectSchema.ContainerType.LIST ) {
			if( ! Utils.isArray( expandedValue ) ) expandedValue = [ expandedValue ];
			expandedValue = { "@list": expandedValue };
		}

		let useArray:boolean = [ "@type", "@id", "@value", "@language" ].indexOf( uri ) === -1;
		_addValue( expandedElement, uri, expandedValue, { propertyIsArray: useArray } );
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

function _addValue( element:Object, propertyName:string, value:any, options:{ propertyIsArray:boolean } ):void {
	if( Utils.isArray( value ) ) {
		let values:Array<any> = value;
		if( values.length === 0 && options.propertyIsArray && ! Utils.hasProperty( element, propertyName ) ) element[ propertyName ] = [];
		for( let item of values ) {
			_addValue( element, propertyName, item, options );
		}

	} else if( propertyName in element ) {
		if ( ! _hasValue( element, propertyName, value ) ) {
			let items:Array<any> = element[ propertyName ];
			if( ! Utils.isArray( items ) ) items = element[ propertyName ] = [ items ];
			items.push( value );
		}
	} else {
		element[ propertyName ] = options.propertyIsArray ? [ value ] : value;
	}
}

function _hasProperty( element:Object, propertyName:string ):boolean {
	if ( propertyName in element ) {
		let item:any = element[ propertyName ];
		return ! Utils.isArray( item ) || (<Array<any>> item).length > 0;
	}
	return false;
}

function _compareValues( value1:any, value2:any ):boolean {
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

function _hasValue( element:Object, propertyName:string, value:any ):boolean {
	if( _hasProperty( element, propertyName) ) {
		let item:any = element[ propertyName ];
		let isList:boolean = RDF.List.Factory.is( value );

		if( isList || Utils.isArray( item ) ) {
			let items:any[] = item;
			if( isList ) items = items[ "@list" ];

			for( let entry of items ) {
				if( _compareValues( entry, value ) ) return true;
			}
		} else if( ! Utils.isArray( value ) ) {
			return _compareValues( item, value );
		}
	}

	return false;
}

export default Class;

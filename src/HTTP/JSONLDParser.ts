import * as jsonld from "jsonld";

import JSONParser from "./JSONParser";
import * as HTTP from "./../HTTP";
import Parser from "./Parser";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

const MAX_CTX_URLS:number = 10;
const LINK_HEADER_REL:string = "http://www.w3.org/ns/json-ld#context";


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
	if( Object.keys( contextsRequested ).length > MAX_CTX_URLS ) throw new Error( "Maximum number of @context URLs exceeded." );

	let contextToResolved:{[ index:string ]:Object} = Object.create( null );
	if( ! _findContextURLs( input, contextToResolved, base ) ) return;

	function resolved( url:string, promise:Promise<[ any, HTTP.Response.Class ]> ):Promise<any> {
		let _contextsRequested:{[ index:string ]:boolean} = Utils.O.clone<{[ index:string ]:boolean}>( contextsRequested );
		_contextsRequested[ url ] = true;

		return promise.then( ( [ object, response ]:[ any, HTTP.Response.Class ] ) => {
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
		if( url in contextsRequested ) throw new Error( "Cyclical @context URLs detected." );

		let requestOptions:HTTP.Request.Options = {};
		HTTP.Request.Util.setAcceptHeader( "application/ld+json, application/json", requestOptions );

		let promise:Promise<[ any, HTTP.Response.Class ]> = HTTP.Request.Service.get( url, requestOptions, new JSONParser() );
		promises.push( resolved( url, promise ) );
	}

	return Promise.all<void>( promises ).then( () => {
		_findContextURLs( input, contextToResolved, base, true );
	} );
}

function _proress( input:Object, context:Object ):Object {
	return input;
}

export function expand( input:Object ):Promise<Object> {
	// Find and resolve context URLs
	return _retrieveContexts( input, <{[ index:string ]:boolean}> Object.create( null ), "" ).then( () => {
		return _proress( input, {} );
	} );
}

export class Class implements Parser<any> {
	parse( input:string ):Promise<any> {
		let jsonParser:JSONParser = new JSONParser();
		return jsonParser.parse( input ).then( ( parsedObject:Object ) => {
			return this.expandJSON( parsedObject );
		} );
	}

	private expandJSON( parsedObject:Object, options?:jsonld.ExpandOptions ):Promise<Object> {
		return new Promise( ( resolve:( result:Object ) => void, reject:( error:any ) => void ):void => {
			jsonld.expand( parsedObject, options, ( error:any, expanded:Object ):void => {
				if( error ) {
					// TODO: Handle jsonld.expand error
					reject( error );
				}

				parsedObject = expanded;

				resolve( expanded );
			} );
		} );
	}
}

export default Class;

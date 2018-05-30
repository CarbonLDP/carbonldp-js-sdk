import HTTP from "http";
import HTTPS from "https";
import URL from "url";

import { AbstractContext } from "../AbstractContext";
import { IllegalArgumentError } from "../Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import { RegistryService } from "../Registry";
import * as Utils from "./../Utils";
import { BadResponseError } from "./Errors";
import { Header } from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import { Parser } from "./Parser";
import { Response } from "./Response";

export interface RequestOptions {
	headers?:Map<string, Header>;
	sendCredentialsOnCORS?:boolean;
	timeout?:number;
	request?:XMLHttpRequest;
}

export interface GETOptions extends RequestOptions {
	ensureLatest?:boolean;
}

export interface RetrievalPreferences {
	include?:string[];
	omit?:string[];
}

interface ResponseCallback {
	( response:Response ):void;
}

function forEachHeaders( headers:Map<string, Header>, setHeader:( name:string, value:string ) => any ):void {
	let namesIterator:Iterator<string> = headers.keys();
	let next:IteratorResult<string> = namesIterator.next();
	while( ! next.done ) {
		let name:string = next.value;
		let value:Header = headers.get( name );
		setHeader( name, value.toString() );
		next = namesIterator.next();
	}
}

function onResolve( resolve:ResponseCallback, reject:ResponseCallback, response:Response ):void {
	if( response.status >= 200 && response.status <= 299 ) {
		resolve( response );
	} else {
		reject( response );
	}
}

function sendWithBrowser( method:string, url:string, body:string | Blob, options:RequestOptions ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResponseCallback, reject:ResponseCallback ):void => {
		let request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
		request.open( method, url, true );

		if( options.headers ) forEachHeaders( options.headers, ( name:string, value:string ) => request.setRequestHeader( name, value ) );
		request.withCredentials = options.sendCredentialsOnCORS;
		if( options.timeout ) request.timeout = options.timeout;

		request.onload = request.onerror = () => {
			let response:Response = new Response( request );
			onResolve( resolve, reject, response );
		};

		if( body ) {
			request.send( body );
		} else {
			request.send();
		}
	} );
}

function sendWithNode( method:string, url:string, body:string | Buffer, options:RequestOptions ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResponseCallback, reject:ResponseCallback ):void => {
		function returnResponse( request:HTTP.ClientRequest, res:HTTP.IncomingMessage ):void {
			let rawData:Buffer[] = [];

			res.on( "data", ( chunk:string | Buffer ):void => {
				if( typeof chunk === "string" ) chunk = Buffer.from( <any>chunk, "utf-8" );
				rawData.push( chunk );
			} ).on( "end", () => {
				let data:string = Buffer.concat( rawData ).toString( "utf8" );
				let response:Response = new Response( request, data, res );

				onResolve( resolve, reject, response );
			} );
		}

		let numberOfRedirects:number = 0;

		function sendRequestWithRedirect( _url:string ):void {
			let parsedURL:URL.Url = URL.parse( _url );
			let Adapter:any = parsedURL.protocol === "http:" ? HTTP : HTTPS;

			let requestOptions:HTTP.RequestOptions = {
				protocol: parsedURL.protocol,
				hostname: parsedURL.hostname,
				port: parsedURL.port,
				path: parsedURL.path,
				method: method,
				headers: {},
			};
			if( options.headers ) forEachHeaders( options.headers, ( name:string, value:string ) => requestOptions.headers[ name ] = value );

			let request:HTTP.ClientRequest = Adapter.request( requestOptions );
			if( options.timeout ) request.setTimeout( options.timeout );
			request.on( "response", ( res:HTTP.IncomingMessage ) => {
				if( res.statusCode >= 300 && res.statusCode <= 399 && "location" in res.headers ) {
					if( ++ numberOfRedirects < 10 ) return sendRequestWithRedirect( URL.resolve( _url, res.headers.location ) );
				}

				returnResponse( request, res );
			} );

			request.on( "error", ( error ) => {
				let response:Response = new Response( request, error.message );
				onResolve( resolve, reject, response );
			} );
			request.end( body );
		}

		sendRequestWithRedirect( url );

	} );
}

function sendRequest( method:string, url:string, body:string | Blob | Buffer, options:RequestOptions ):Promise<Response> {
	return typeof XMLHttpRequest !== "undefined" ?
		sendWithBrowser( method, url, <string | Blob> body, options ) :
		sendWithNode( method, url, <string | Buffer> body, options );
}

function isBody( data:string | Blob | Buffer ):boolean {
	return Utils.isString( data )
		|| typeof Blob !== "undefined" && data instanceof Blob
		|| typeof Buffer !== "undefined" && data instanceof Buffer;
}

export class RequestService {
	private static defaultOptions:RequestOptions = {
		sendCredentialsOnCORS: true,
	};

	static send( method:(HTTPMethod | string), url:string, options?:RequestOptions ):Promise<Response>;
	static send( method:(HTTPMethod | string), url:string, body:string | Blob | Buffer, options?:RequestOptions ):Promise<Response>;
	static send( method:(HTTPMethod | string), url:string, body:string | Blob | Buffer, options?:RequestOptions ):Promise<Response>;
	static send<T>( method:(HTTPMethod | string), url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:(HTTPMethod | string), url:string, body:string | Blob | Buffer, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:any, url:string, bodyOrOptions:any = RequestService.defaultOptions, optionsOrParser:any = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		let body:string | Blob | Buffer = null;
		let options:RequestOptions = Utils.hasProperty( optionsOrParser, "parse" ) ? bodyOrOptions : optionsOrParser;
		parser = Utils.hasProperty( optionsOrParser, "parse" ) ? optionsOrParser : parser;

		if( isBody( bodyOrOptions ) ) {
			body = bodyOrOptions;
		} else {
			options = bodyOrOptions ? bodyOrOptions : options;
		}

		options = Object.assign( {}, RequestService.defaultOptions, options );

		if( Utils.isNumber( method ) ) method = HTTPMethod[ method ];

		const requestPromise:Promise<Response> = sendRequest( method, url, body, options )
			.then( response => {
				if( method === "GET" && options.headers ) return this._handleGETResponse( url, options, response );
				else return response;
			} )
		;

		if( parser === null ) return requestPromise;

		return requestPromise.then( ( response:Response ) => {
			return parser.parse( response.data ).then( ( parsedBody:T ) => {
				return [ parsedBody, response ];
			} );
		} );
	}

	static options( url:string, options:RequestOptions = RequestService.defaultOptions ):Promise<Response> {
		return RequestService.send( HTTPMethod.OPTIONS, url, options );
	}

	static head( url:string, options:RequestOptions = RequestService.defaultOptions ):Promise<Response> {
		return RequestService.send( HTTPMethod.HEAD, url, options );
	}

	static get( url:string, options?:RequestOptions ):Promise<Response>;
	static get<T>( url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static get<T>( url:string, options:RequestOptions = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		return RequestService.send( HTTPMethod.GET, url, null, options, parser );
	}

	static post( url:string, body:Buffer, options?:RequestOptions ):Promise<Response>;
	static post<T>( url:string, body:Buffer, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post( url:string, body:Blob, options?:RequestOptions ):Promise<Response>;
	static post<T>( url:string, body:Blob, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	static post<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		return RequestService.send( HTTPMethod.POST, url, bodyOrOptions, options, parser );
	}

	static put( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	static put<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static put<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		return RequestService.send( HTTPMethod.PUT, url, bodyOrOptions, options, parser );
	}

	static patch( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	static patch<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static patch<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		return RequestService.send( HTTPMethod.PATCH, url, bodyOrOptions, options, parser );
	}

	static delete( url:string, options?:RequestOptions ):Promise<Response>;
	static delete( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	static delete<T>( url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, optionsOrParser:any = RequestService.defaultOptions, parser:Parser<T> = null ):any {
		return RequestService.send( HTTPMethod.DELETE, url, bodyOrOptions, optionsOrParser, parser );
	}

	/**
	 * GET requests can be affected by previously cached resources that were originally requested with a different Accept header. This method identifies that
	 * and retries the request with headers that force browsers to ignore cache.
	 */
	private static _handleGETResponse( url:string, requestOptions:RequestOptions, response:Response ):Promise<Response> {
		return Promise.resolve()
			.then( () => {
				if( this._contentTypeIsAccepted( requestOptions, response ) ) return response;

				this._setNoCacheHeaders( requestOptions );

				if( ! this._isChromiumAgent() ) this._setFalseETag( requestOptions );

				return sendRequest( "GET", url, null, requestOptions )
					.then( noCachedResponse => {
						if( ! this._contentTypeIsAccepted( requestOptions, response ) ) {
							throw new BadResponseError( "The server responded with an unacceptable Content-Type", response );
						}

						return noCachedResponse;
					} );
			} );
	}

	private static _contentTypeIsAccepted( requestOptions:RequestOptions, response:Response ):boolean {
		const accepts:string[] = requestOptions.headers.has( "accept" ) ?
			requestOptions.headers.get( "accept" ).values :
			[]
		;

		const contentType:Header = response.headers.has( "content-type" ) ?
			response.headers.get( "content-type" ) :
			null
		;
		return ! contentType || accepts.some( contentType.hasValue, contentType );
	}

	private static _setNoCacheHeaders( requestOptions:RequestOptions ):void {
		requestOptions.headers
			.set( "pragma", new Header( "no-cache" ) )
			.set( "cache-control", new Header( "no-cache, max-age=0" ) )
		;
	}

	private static _isChromiumAgent():boolean {
		return typeof window !== "undefined" && ! window[ "chrome" ];
	}

	private static _setFalseETag( requestOptions:RequestOptions ):void {
		requestOptions.headers.set( "if-none-match", new Header() );
	}
}

export class RequestUtils {

	static getHeader( headerName:string, requestOptions:RequestOptions, initialize:boolean = false ):Header {
		headerName = headerName.toLowerCase();

		if( initialize ) {
			let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();
			if( ! headers.has( headerName ) )
				headers.set( headerName, new Header() );
		}

		if( ! requestOptions.headers ) return undefined;
		return requestOptions.headers.get( headerName );
	}

	static setAcceptHeader( accept:string, requestOptions:RequestOptions ):RequestOptions {
		let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();
		headers.set( "accept", new Header( accept ) );
		return requestOptions;
	}

	static setContentTypeHeader( contentType:string, requestOptions:RequestOptions ):RequestOptions {
		let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();
		headers.set( "content-type", new Header( contentType ) );
		return requestOptions;
	}

	static setIfMatchHeader( eTag:string, requestOptions:RequestOptions ):RequestOptions {
		if( ! eTag ) return;

		let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();
		headers.set( "if-match", new Header( eTag ) );
		return requestOptions;
	}

	static setIfNoneMatchHeader( eTag:string, requestOptions:RequestOptions ):RequestOptions {
		if( ! eTag ) return;

		let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();
		headers.set( "if-none-match", new Header( eTag ) );
		return requestOptions;
	}

	static setPreferredInteractionModel( interactionModelURI:string, requestOptions:RequestOptions ):RequestOptions {
		let prefer:Header = RequestUtils.getHeader( "prefer", requestOptions, true );
		prefer.values.push( interactionModelURI + "; rel=interaction-model" );

		return requestOptions;
	}

	static setPreferredRetrieval( retrievalType:"representation" | "minimal", requestOptions:RequestOptions ):RequestOptions {
		const prefer:Header = RequestUtils.getHeader( "prefer", requestOptions, true );

		prefer.values.push( `return=${ retrievalType }` );
		return requestOptions;
	}

	static setRetrievalPreferences( preferences:RetrievalPreferences, requestOptions:RequestOptions ):RequestOptions {
		let prefer:Header = RequestUtils.getHeader( "prefer", requestOptions, true );

		let keys:string[] = [ "include", "omit" ];
		for( let key of keys ) {
			if( key in preferences && preferences[ key ].length > 0 ) {
				prefer.values.push( `${ key }="${ preferences[ key ].join( " " ) }"` );
			}
		}

		return requestOptions;
	}

	static setSlug( slug:string, requestOptions:RequestOptions ):RequestOptions {
		let slugHeader:Header = RequestUtils.getHeader( "slug", requestOptions, true );
		slugHeader.values.push( slug );

		return requestOptions;
	}


	static isOptions( object:Object ):object is RequestOptions {
		return Utils.hasPropertyDefined( object, "headers" )
			|| Utils.hasPropertyDefined( object, "sendCredentialsOnCORS" )
			|| Utils.hasPropertyDefined( object, "timeout" )
			|| Utils.hasPropertyDefined( object, "request" );
	}

	static cloneOptions( options:RequestOptions ):RequestOptions {
		const clone:RequestOptions = {
			...options,
			headers: new Map(),
		};

		if( options.headers ) options.headers
			.forEach( ( value, key ) => clone.headers.set( key, new Header( value.values.slice() ) ) );

		return clone;
	}


	static getRequestURLFor( this:void, registry:RegistryService<Pointer, AbstractContext<Pointer, any> | undefined>, resource:Pointer, uri?:string ):string {
		if( uri && registry._context ) {
			const schema:DigestedObjectSchema = registry.getGeneralSchema();
			uri = ObjectSchemaUtils.resolveURI( uri, schema );
		}

		const url:string = uri ? URI.resolve( resource.id, uri ) : resource.id;

		const localIRI:string = registry._getLocalID( url );
		if( registry._context ) return URI.resolve( registry._context.baseURI, localIRI );

		if( URI.isRelative( url ) ) throw new IllegalArgumentError( `"${ url }" cannot be used as URL for the request.` );
		return url;
	}

}

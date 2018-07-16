import HTTP from "http";
import HTTPS from "https";
import URL from "url";

import { hasProperty, hasPropertyDefined, isNumber, isString } from "../Utils";

import { HTTPError } from "./Errors/HTTPError";
import { statusCodeMap } from "./Errors/index";
import { BadResponseError } from "./Errors/ServerErrors/BadResponseError";
import { UnknownError } from "./Errors/UnknownError";

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

type ResolveCallback = ( response:Response ) => void;
type RejectCallback = ( error:HTTPError ) => void;

function __onResolve( resolve:ResolveCallback, reject:RejectCallback, response:Response ):void {
	if( response.status >= 200 && response.status <= 299 ) {
		resolve( response );
	} else {
		if( ! statusCodeMap.has( response.status ) )
			return reject( new UnknownError( response.data, response ) );

		reject( new (statusCodeMap.get( response.status ))( response.data, response ) );
	}
}

function __sendWithBrowser( method:string, url:string, body:string | Blob, options:RequestOptions ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResolveCallback, reject:RejectCallback ):void => {
		let request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
		request.open( method, url, true );

		if( options.headers ) options.headers
			.forEach( ( header:Header, name:string ) => request.setRequestHeader( name, header.toString() ) );

		request.withCredentials = options.sendCredentialsOnCORS;
		if( options.timeout ) request.timeout = options.timeout;

		request.onload = request.onerror = () => {
			let response:Response = new Response( request );
			__onResolve( resolve, reject, response );
		};

		if( body ) {
			request.send( body );
		} else {
			request.send();
		}
	} );
}

function __sendWithNode( method:string, url:string, body:string | Buffer, options:RequestOptions ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResolveCallback, reject:RejectCallback ):void => {
		function returnResponse( request:HTTP.ClientRequest, res:HTTP.IncomingMessage ):void {
			let rawData:Buffer[] = [];

			res.on( "data", ( chunk:string | Buffer ):void => {
				if( typeof chunk === "string" ) chunk = Buffer.from( <any>chunk, "utf-8" );
				rawData.push( chunk );
			} ).on( "end", () => {
				let data:string = Buffer.concat( rawData ).toString( "utf8" );
				let response:Response = new Response( request, data, res );

				__onResolve( resolve, reject, response );
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

			if( options.headers ) options.headers
				.forEach( ( header:Header, name:string ) => requestOptions.headers[ name ] = header.toString() );

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
				__onResolve( resolve, reject, response );
			} );
			request.end( body );
		}

		sendRequestWithRedirect( url );

	} );
}

function __sendRequest( method:string, url:string, body:string | Blob | Buffer, options:RequestOptions ):Promise<Response> {
	return typeof XMLHttpRequest !== "undefined" ?
		__sendWithBrowser( method, url, <string | Blob> body, options ) :
		__sendWithNode( method, url, <string | Buffer> body, options );
}

function __isBody( data:string | Blob | Buffer ):boolean {
	return isString( data )
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
		let options:RequestOptions = hasProperty( optionsOrParser, "parse" ) ? bodyOrOptions : optionsOrParser;
		parser = hasProperty( optionsOrParser, "parse" ) ? optionsOrParser : parser;

		if( __isBody( bodyOrOptions ) ) {
			body = bodyOrOptions;
		} else {
			options = bodyOrOptions ? bodyOrOptions : options;
		}

		options = Object.assign( {}, RequestService.defaultOptions, options );

		if( isNumber( method ) ) method = HTTPMethod[ method ];

		const requestPromise:Promise<Response> = __sendRequest( method, url, body, options )
			.then( response => {
				if( method === "GET" && options.headers ) return this.__handleGETResponse( url, options, response );
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
	private static __handleGETResponse( url:string, requestOptions:RequestOptions, response:Response ):Promise<Response> {
		return Promise.resolve()
			.then( () => {
				if( this.__contentTypeIsAccepted( requestOptions, response ) ) return response;

				this.__setNoCacheHeaders( requestOptions );

				if( ! this.__isChromiumAgent() ) this.__setFalseETag( requestOptions );

				return __sendRequest( "GET", url, null, requestOptions )
					.then( noCachedResponse => {
						if( ! this.__contentTypeIsAccepted( requestOptions, response ) ) {
							throw new BadResponseError( "The server responded with an unacceptable Content-Type", response );
						}

						return noCachedResponse;
					} );
			} );
	}

	private static __contentTypeIsAccepted( requestOptions:RequestOptions, response:Response ):boolean {
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

	private static __setNoCacheHeaders( requestOptions:RequestOptions ):void {
		requestOptions.headers
			.set( "pragma", new Header( "no-cache" ) )
			.set( "cache-control", new Header( "no-cache, max-age=0" ) )
		;
	}

	private static __isChromiumAgent():boolean {
		return typeof window !== "undefined" && ! ! window[ "chrome" ];
	}

	private static __setFalseETag( requestOptions:RequestOptions ):void {
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
		return hasPropertyDefined( object, "headers" )
			|| hasPropertyDefined( object, "sendCredentialsOnCORS" )
			|| hasPropertyDefined( object, "timeout" )
			|| hasPropertyDefined( object, "request" );
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

}

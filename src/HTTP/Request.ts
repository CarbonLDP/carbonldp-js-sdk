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


/**
 * Customizable options that can change the behaviour of a request.
 */
export interface RequestOptions {
	/**
	 * Map that contains the headers to include in the request.
	 */
	headers?:Map<string, Header>;
	/**
	 * Flag that enables Cross-Origin Resource Sharing (CORS).
	 */
	sendCredentialsOnCORS?:boolean;
	/**
	 * Timeout of the request.
	 */
	timeout?:number;
	/**
	 * Specific XMLHttpRequest to be used for the request.
	 */
	request?:XMLHttpRequest;
}

/**
 * Customizable options for a `GET` request.
 */
export interface GETOptions extends RequestOptions {
	/**
	 * Flag that ignores the cache of the SDK and ensures to make a request.
	 */
	ensureLatest?:boolean;
}

/**
 * Object used by {@link RequestUtils.setRetrievalPreferences()}
 * which specifies the behaviour of a request when using an `ldp:Container` interaction model.
 */
export interface RetrievalPreferences {
	/**
	 * Prefer URIs that indicates some specific information should be returned in the request's response.
	 */
	include?:string[];
	/**
	 * Prefer URIs that indicates some specific information should NOT be included in the request's response.
	 */
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

		reject( new (statusCodeMap.get( response.status )!)( response.data, response ) );
	}
}

function __sendWithBrowser( method:string, url:string, body:string | Blob, options:RequestOptions ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResolveCallback, reject:RejectCallback ):void => {
		let request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
		request.open( method, url, true );

		if( options.headers ) options.headers
			.forEach( ( header:Header, name:string ) => request.setRequestHeader( name, header.toString() ) );

		request.withCredentials = ! ! options.sendCredentialsOnCORS;
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
				.forEach( ( header:Header, name:string ) => requestOptions.headers![ name ] = header.toString() );

			let request:HTTP.ClientRequest = Adapter.request( requestOptions );
			if( options.timeout ) request.setTimeout( options.timeout );
			request.on( "response", ( res:HTTP.IncomingMessage ) => {
				if( res.statusCode! >= 300 && res.statusCode! <= 399 && "location" in res.headers ) {
					if( ++ numberOfRedirects < 10 ) return sendRequestWithRedirect( URL.resolve( _url, res.headers!.location! ) );
				}

				returnResponse( request, res );
			} );

			request.on( "error", ( error ) => {
				let response:Response = new Response( request, error.message );
				__onResolve( resolve, reject, response );
			} );

			if( body ) {
				// Force to send body in `DELETE` (`RemoveMemberAction`)
				if( method === "DELETE" ) request.useChunkedEncodingByDefault = true;
				request.write( body );
			}

			request.end();
		}

		sendRequestWithRedirect( url );

	} );
}

function __sendRequest( method:string, url:string, body:string | Blob | Buffer | undefined, options:RequestOptions ):Promise<Response> {
	return typeof XMLHttpRequest !== "undefined" ?
		__sendWithBrowser( method, url, <string | Blob>body, options ) :
		__sendWithNode( method, url, <string | Buffer>body, options );
}

function __isBody( data:string | Blob | Buffer ):boolean {
	return isString( data )
		|| typeof Blob !== "undefined" && data instanceof Blob
		|| typeof Buffer !== "undefined" && data instanceof Buffer;
}

/**
 * Service with static methods to send HTTP request.
 */
export class RequestService {
	private static defaultOptions:RequestOptions = {
		sendCredentialsOnCORS: true,
	};

	/**
	 * Generic send method, to be used by the others methods in the class.
	 * @param method The method of the request to be sent.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 */
	static send( method:(HTTPMethod | string), url:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Generic send method, to be used by the others methods in the class.
	 * @param method The method of the request to be sent.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 */
	static send( method:(HTTPMethod | string), url:string, body:string | Blob | Buffer, options?:RequestOptions ):Promise<Response>;
	/**
	 * Generic send method, to be used by the others methods in the class.
	 * @param method The method of the request to be sent.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static send<T>( method:(HTTPMethod | string), url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	/**
	 * Generic send method, to be used by the others methods in the class.
	 * @param method The method of the request to be sent.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static send<T>( method:(HTTPMethod | string), url:string, body?:string | Blob | Buffer, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:any, url:string, bodyOrOptions?:any, optionsOrParser?:any, parser?:Parser<T> ):any {
		let body:string | Blob | Buffer | undefined = undefined;
		let options:RequestOptions = hasProperty( optionsOrParser, "parse" ) ? bodyOrOptions : optionsOrParser;
		parser = hasProperty( optionsOrParser, "parse" ) ? optionsOrParser : parser;

		if( ! bodyOrOptions || __isBody( bodyOrOptions ) ) {
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

		if( ! parser ) return requestPromise;

		return requestPromise.then( ( response:Response ) => {
			return parser!.parse( response.data ).then( ( parsedBody:T ) => {
				return [ parsedBody, response ];
			} );
		} );
	}

	/**
	 * Sends an `OPTIONS` request.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 */
	static options( url:string, options:RequestOptions = RequestService.defaultOptions ):Promise<Response> {
		return RequestService.send( HTTPMethod.OPTIONS, url, options );
	}

	/**
	 * Sends an `HEAD` request.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 */
	static head( url:string, options:RequestOptions = RequestService.defaultOptions ):Promise<Response> {
		return RequestService.send( HTTPMethod.HEAD, url, options );
	}

	/**
	 * Sends an `GET` request.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 */
	static get( url:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `GET` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static get<T>( url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static get<T>( url:string, options:RequestOptions = RequestService.defaultOptions, parser?:Parser<T> ):any {
		return RequestService.send( HTTPMethod.GET, url, undefined, options, parser );
	}

	/**
	 * Sends an `POST` request.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 */
	static post( url:string, body:string | Blob | Buffer, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `POST` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static post<T>( url:string, body:string | Blob | Buffer, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser?:Parser<T> ):any {
		return RequestService.send( HTTPMethod.POST, url, bodyOrOptions, options, parser );
	}

	/**
	 * Sends an `PUT` request.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 */
	static put( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `PUT` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static put<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static put<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser?:Parser<T> ):any {
		return RequestService.send( HTTPMethod.PUT, url, bodyOrOptions, options, parser );
	}

	/**
	 * Sends an `PATCH` request.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 */
	static patch( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `PATCH` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static patch<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static patch<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, options:RequestOptions = RequestService.defaultOptions, parser?:Parser<T> ):any {
		return RequestService.send( HTTPMethod.PATCH, url, bodyOrOptions, options, parser );
	}

	/**
	 * Sends an `DELETE` request.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 */
	static delete( url:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `DELETE` request.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 */
	static delete( url:string, body:string, options?:RequestOptions ):Promise<Response>;
	/**
	 * Sends an `DELETE` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static delete<T>( url:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	/**
	 * Sends an `DELETE` request and parses its response data.
	 * @param url URL of the request to be sent.
	 * @param body Body to be sent int he request.
	 * @param options Customizable options for the request.
	 * @param parser Parser to be used in the response body of the request.
	 */
	static delete<T>( url:string, body:string, options?:RequestOptions, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, bodyOrOptions:any = RequestService.defaultOptions, optionsOrParser:any = RequestService.defaultOptions, parser?:Parser<T> ):any {
		return RequestService.send( HTTPMethod.DELETE, url, bodyOrOptions, optionsOrParser, parser );
	}

	/**
	 * GET requests can be affected by previously cached resources that were originally requested with a different Accept header.
	 * This method identifies that and retries the request with headers that force browsers to ignore cache.
	 */
	private static __handleGETResponse( url:string, requestOptions:RequestOptions, response:Response ):Promise<Response> {
		return Promise.resolve()
			.then( () => {
				if( this.__contentTypeIsAccepted( requestOptions, response ) ) return response;

				this.__setNoCacheHeaders( requestOptions );

				if( ! this.__isChromiumAgent() ) this.__setFalseETag( requestOptions );

				return __sendRequest( "GET", url, undefined, requestOptions )
					.then( noCachedResponse => {
						if( ! this.__contentTypeIsAccepted( requestOptions, response ) ) {
							throw new BadResponseError( "The server responded with an unacceptable Content-Type", response );
						}

						return noCachedResponse;
					} );
			} );
	}

	private static __contentTypeIsAccepted( requestOptions:RequestOptions, response:Response ):boolean {
		if( ! requestOptions.headers ) return true;

		const accepts:string[] = requestOptions.headers.has( "accept" ) ?
			requestOptions.headers.get( "accept" )!.values :
			[]
		;

		const contentType:Header | undefined = response.headers.has( "content-type" ) ?
			response.headers.get( "content-type" ) :
			undefined
		;

		return ! contentType || accepts.some( contentType.hasValue, contentType );
	}

	private static __setNoCacheHeaders( requestOptions:RequestOptions ):void {
		requestOptions.headers!
			.set( "pragma", new Header( "no-cache" ) )
			.set( "cache-control", new Header( "no-cache, max-age=0" ) )
		;
	}

	private static __isChromiumAgent():boolean {
		return typeof window !== "undefined" && ! ! window[ "chrome" ];
	}

	private static __setFalseETag( requestOptions:RequestOptions ):void {
		requestOptions.headers!.set( "if-none-match", new Header() );
	}
}

/**
 * Service with static utils methods for elements related to requests.
 */
export class RequestUtils {

	/**
	 * Returns the header object inside an options object.
	 * Returns `undefined` if the header doesn't exists.
	 * If `initialize` flag is provided with true, an empty header will be created if not exits.
	 * @param headerName The name of the header to return/create.
	 * @param requestOptions The options where to look/create the header.
	 * @param initialize Flag to create the header of not exists.
	 */
	static getHeader( headerName:string, requestOptions:RequestOptions, initialize?:true ):Header | undefined {
		if( ! requestOptions.headers ) {
			if( ! initialize ) return undefined;

			requestOptions.headers = new Map();
		}

		headerName = headerName.toLowerCase();
		let header:Header | undefined = requestOptions.headers!.get( headerName );

		if( ! header ) {
			if( ! initialize ) return undefined;

			header = new Header();
			requestOptions.headers!.set( headerName, header );
		}

		return header;
	}


	/**
	 * Sets an `accept` header in the options object request.
	 * @param accept The `accept` header value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setAcceptHeader( accept:string, requestOptions:RequestOptions ):RequestOptions {
		RequestUtils.__addHeaderValue( "accept", accept, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets a `content-type` header in the options object request.
	 * @param contentType The `content-type` header value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setContentTypeHeader( contentType:string, requestOptions:RequestOptions ):RequestOptions {
		RequestUtils.__addHeaderValue( "content-type", contentType, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets an `if-match` header in the options object request.
	 * @param eTag The `if-match` header value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setIfMatchHeader( eTag:string, requestOptions:RequestOptions ):RequestOptions {
		if( ! eTag ) return requestOptions;

		RequestUtils.__addHeaderValue( "if-match", eTag, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets an `if-none` header in the options object request.
	 * @param eTag The `if-none` header value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setIfNoneMatchHeader( eTag:string, requestOptions:RequestOptions ):RequestOptions {
		if( ! eTag ) return requestOptions;

		RequestUtils.__addHeaderValue( "if-none-match", eTag, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets a `prefer` header with `rel=interaction-model` in the options object request.
	 * @param interactionModelURI The `interaction-model` value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setPreferredInteractionModel( interactionModelURI:string, requestOptions:RequestOptions ):RequestOptions {
		const headerValue:string = `${ interactionModelURI }; rel=interaction-model`;
		RequestUtils.__addHeaderValue( "prefer", headerValue, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets a `prefer` header with `return` in the options object request.
	 * @param retrievalType The `return` value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setPreferredRetrieval( retrievalType:"representation" | "minimal", requestOptions:RequestOptions ):RequestOptions {
		const headerValue:string = `return=${ retrievalType }`;
		RequestUtils.__addHeaderValue( "prefer", headerValue, requestOptions );

		return requestOptions;
	}

	/**
	 * Sets a `prefer` header with `include/omit` preferences in the options object request.
	 * @param preferences The preferences to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setRetrievalPreferences( preferences:RetrievalPreferences, requestOptions:RequestOptions ):RequestOptions {
		const prefer:Header = RequestUtils.getHeader( "prefer", requestOptions, true )!;

		const keys:string[] = [ "include", "omit" ];
		for( const key of keys ) {
			if( ! (key in preferences) ) continue;
			if( preferences[ key ].length <= 0 ) continue;

			const strPreferences:string = preferences[ key ].join( " " );
			prefer.values.push( `${ key }="${ strPreferences }"` );
		}

		return requestOptions;
	}

	/**
	 * Sets an `slug` header in the options object request.
	 * @param slug The `slug` header value to be set.
	 * @param requestOptions The options where to set the header.
	 */
	static setSlug( slug:string, requestOptions:RequestOptions ):RequestOptions {
		RequestUtils.__addHeaderValue( "slug", slug, requestOptions );

		return requestOptions;
	}


	/**
	 * Checks if the value provided can be considered a {@link RequestOptions}.
	 * @param value The value to be checked.
	 */
	static isOptions( value:any ):value is RequestOptions {
		return hasPropertyDefined( value, "headers" )
			|| hasPropertyDefined( value, "sendCredentialsOnCORS" )
			|| hasPropertyDefined( value, "timeout" )
			|| hasPropertyDefined( value, "request" );
	}

	/**
	 * Clones the options into a new object including coping the headers map into a different map.
	 * @param options The options to be clones.
	 */
	static cloneOptions( options:RequestOptions ):RequestOptions {
		const clone:RequestOptions = {
			...options,
			headers: new Map(),
		};

		if( options.headers ) options.headers
			.forEach( ( value, key ) => clone.headers!.set( key, new Header( value.values.slice() ) ) );

		return clone;
	}


	private static __addHeaderValue( headerName:string, headerValue:string, requestOptions:RequestOptions ):void {
		const header:Header = RequestUtils.getHeader( headerName, requestOptions, true )!;
		header.addValue( headerValue );
	}

}

import * as Header from "./Header";
import Method from "./Method";
import Parser from "./Parser";
import Response from "./Response";
import * as Utils from "./../Utils";

import HTTP, {
	ClientRequest,
	IncomingMessage,
	RequestOptions,
} from "http";
import HTTPS from "https";
import URL from "url";

export interface Options {
	headers?:Map<string, Header.Class>;
	sendCredentialsOnCORS?:boolean;
	timeout?:number;
	request?:XMLHttpRequest;
}

export interface GETOptions extends Options {
	ensureLatest?:boolean;
}

export interface RetrievalPreferences {
	include?:string[];
	omit?:string[];
}

interface ResponseCallback {
	( response:Response ):void;
}

function forEachHeaders( headers:Map<string, Header.Class>, setHeader:( name:string, value:string ) => any ):void {
	let namesIterator:Iterator<string> = headers.keys();
	let next:IteratorResult<string> = namesIterator.next();
	while( ! next.done ) {
		let name:string = next.value;
		let value:Header.Class = headers.get( name );
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

function sendWithBrowser( method:string, url:string, body:string | Blob, options:Options ):Promise<Response> {
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

function sendWithNode( method:string, url:string, body:string | Buffer, options:Options ):Promise<Response> {
	return new Promise<Response>( ( resolve:ResponseCallback, reject:ResponseCallback ):void => {
		function returnResponse( request:ClientRequest, res:IncomingMessage ):void {
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

		function sendRequest( _url:string ):void {
			let parsedURL:URL.Url = URL.parse( _url );
			let Adapter:any = parsedURL.protocol === "http:" ? HTTP : HTTPS;

			let requestOptions:RequestOptions = {
				protocol: parsedURL.protocol,
				hostname: parsedURL.hostname,
				port: parsedURL.port,
				path: parsedURL.path,
				method: method,
				headers: {},
			};
			if( options.headers ) forEachHeaders( options.headers, ( name:string, value:string ) => requestOptions.headers[ name ] = value );

			let request:ClientRequest = Adapter.request( requestOptions );
			if( options.timeout ) request.setTimeout( options.timeout );
			request.on( "response", ( res:IncomingMessage ) => {
				if( res.statusCode >= 300 && res.statusCode <= 399 && "location" in res.headers ) {
					if( ++ numberOfRedirects < 10 ) return sendRequest( URL.resolve( _url, res.headers.location ) );
				}

				returnResponse( request, res );
			} );

			request.on( "error", ( error ) => {
				let response:Response = new Response( request, error.message );
				onResolve( resolve, reject, response );
			} );
			request.end( body );
		}

		sendRequest( url );

	} );
}

function isBody( data:string | Blob | Buffer ):boolean {
	return Utils.isString( data )
		|| typeof Blob !== "undefined" && data instanceof Blob
		|| typeof Buffer !== "undefined" && data instanceof Buffer;
}

export class Service {

	private static defaultOptions:Options = {
		sendCredentialsOnCORS: true,
	};

	static send( method:(Method | string), url:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string | Blob | Buffer, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string | Blob | Buffer, options?:Options ):Promise<Response>;
	static send<T>( method:(Method | string), url:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:(Method | string), url:string, body:string | Blob | Buffer, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:any, url:string, bodyOrOptions:any = Service.defaultOptions, optionsOrParser:any = Service.defaultOptions, parser:Parser<T> = null ):any {
		let body:string | Blob | Buffer = null;
		let options:Options = Utils.hasProperty( optionsOrParser, "parse" ) ? bodyOrOptions : optionsOrParser;
		parser = Utils.hasProperty( optionsOrParser, "parse" ) ? optionsOrParser : parser;

		if( isBody( bodyOrOptions ) ) {
			body = bodyOrOptions;
		} else {
			options = bodyOrOptions ? bodyOrOptions : options;
		}

		options = Utils.extend( {}, Service.defaultOptions, options );

		if( Utils.isNumber( method ) ) method = Method[ method ];

		let requestPromise:Promise<Response>;
		if( typeof XMLHttpRequest !== "undefined" ) {
			requestPromise = sendWithBrowser( method, url, <string | Blob> body, options );
		} else {
			requestPromise = sendWithNode( method, url, <string | Buffer> body, options );
		}

		if( parser === null ) return requestPromise;

		return requestPromise.then( ( response:Response ) => {
			return parser.parse( response.data ).then( ( parsedBody:T ) => {
				return [ parsedBody, response ];
			} );
		} );
	}

	static options( url:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.OPTIONS, url, options );
	}

	static head( url:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.HEAD, url, options );
	}

	static get( url:string, options?:Options ):Promise<Response>;
	static get<T>( url:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static get<T>( url:string, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.GET, url, null, options, parser );
	}

	static post( url:string, body:Buffer, options?:Options ):Promise<Response>;
	static post<T>( url:string, body:Buffer, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post( url:string, body:Blob, options?:Options ):Promise<Response>;
	static post<T>( url:string, body:Blob, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post( url:string, body:string, options?:Options ):Promise<Response>;
	static post<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static post<T>( url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.POST, url, bodyOrOptions, options, parser );
	}

	static put( url:string, body:string, options?:Options ):Promise<Response>;
	static put<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static put<T>( url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.PUT, url, bodyOrOptions, options, parser );
	}

	static patch( url:string, body:string, options?:Options ):Promise<Response>;
	static patch<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static patch<T>( url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.PATCH, url, bodyOrOptions, options, parser );
	}

	static delete( url:string, options?:Options ):Promise<Response>;
	static delete( url:string, body:string, options?:Options ):Promise<Response>;
	static delete<T>( url:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, bodyOrOptions:any = Service.defaultOptions, optionsOrParser:any = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.DELETE, url, bodyOrOptions, optionsOrParser, parser );
	}
}

export class Util {

	static getHeader( headerName:string, requestOptions:Options, initialize:boolean = false ):Header.Class {
		headerName = headerName.toLowerCase();

		if( initialize ) {
			let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
			if( ! headers.has( headerName ) )
				headers.set( headerName, new Header.Class() );
		}

		if( ! requestOptions.headers ) return undefined;
		return requestOptions.headers.get( headerName );
	}

	static setAcceptHeader( accept:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "accept", new Header.Class( accept ) );
		return requestOptions;
	}

	static setContentTypeHeader( contentType:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "content-type", new Header.Class( contentType ) );
		return requestOptions;
	}

	static setIfMatchHeader( eTag:string, requestOptions:Options ):Options {
		if( ! eTag ) return;

		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "if-match", new Header.Class( eTag ) );
		return requestOptions;
	}

	static setIfNoneMatchHeader( eTag:string, requestOptions:Options ):Options {
		if( ! eTag ) return;

		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "if-none-match", new Header.Class( eTag ) );
		return requestOptions;
	}

	static setPreferredInteractionModel( interactionModelURI:string, requestOptions:Options ):Options {
		let prefer:Header.Class = Util.getHeader( "prefer", requestOptions, true );
		prefer.values.push( new Header.Value( interactionModelURI + "; rel=interaction-model" ) );

		return requestOptions;
	}

	static setPreferredRetrieval( retrievalType:"representation" | "minimal", requestOptions:Options ):Options {
		const prefer:Header.Class = Util.getHeader( "prefer", requestOptions, true );

		prefer.values.push( new Header.Value( `return=${ retrievalType }` ) );
		return requestOptions;
	}

	static setRetrievalPreferences( preferences:RetrievalPreferences, requestOptions:Options, returnRepresentation:boolean = true ):Options {
		let prefer:Header.Class = Util.getHeader( "prefer", requestOptions, true );
		let representation:string = returnRepresentation ? "return=representation; " : "";

		let keys:string[] = [ "include", "omit" ];
		for( let key of keys ) {
			if( key in preferences && preferences[ key ].length > 0 ) {
				prefer.values.push( new Header.Value( `${ representation }${ key }="${ preferences[ key ].join( " " ) }"` ) );
			}
		}

		return requestOptions;
	}

	static setSlug( slug:string, requestOptions:Options ):Options {
		let slugHeader:Header.Class = Util.getHeader( "slug", requestOptions, true );
		slugHeader.values.push( new Header.Value( slug ) );

		return requestOptions;
	}

	static isOptions( object:Object ):object is Options {
		return Utils.hasPropertyDefined( object, "headers" )
			|| Utils.hasPropertyDefined( object, "sendCredentialsOnCORS" )
			|| Utils.hasPropertyDefined( object, "timeout" )
			|| Utils.hasPropertyDefined( object, "request" );
	}

	static cloneOptions( options:Options ):Options {
		const clone:Options = {
			...options,
			headers: new Map(),
		};

		if( options.headers ) options.headers
			.forEach( ( value, key ) => clone.headers.set( key, new Header.Class( value.values.slice() ) ) );

		return clone;
	}

}

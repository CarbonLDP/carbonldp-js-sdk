import * as Errors from "./Errors";
import * as Header from "./Header";
import Method from "./Method";
import Parser from "./Parser";
import Response from "./Response";
import * as Utils from "./../Utils";

import {RequestOptions, ClientRequest, IncomingMessage} from "http";
import {Url} from "url";

export interface Options {
	headers?: Map<string, Header.Class>;
	sendCredentialsOnCORS?:boolean;
	timeout?:number;
	request?:XMLHttpRequest;
}

export interface ContainerRetrievalPreferences {
	include?:string[];
	omit?:string[];
}

interface Reject {
	( error:Errors.Error ): void;
}
interface Resolve {
	( response:Response ): void;
}

function forEachHeaders( headers:Map<string, Header.Class>, setHeader:( name:string, value:string ) => any ):void {
	let namesIterator:Iterator<string> = headers.keys();
	let next:IteratorResult<string> = namesIterator.next();
	while ( ! next.done ) {
		let name:string = next.value;
		let value:Header.Class = headers.get( name );
		setHeader( name, value.toString() );
		next = namesIterator.next();
	}
}

function onResolve( resolve:Resolve, reject:Reject, response:Response ):void {
	if ( response.status >= 200 && response.status <= 299 ) {
		resolve( response );

	} else if ( response.status >= 400 && response.status < 600 && Errors.statusCodeMap.has( response.status ) ) {
		let error:typeof Errors.Error = Errors.statusCodeMap.get( response.status );
		// TODO: Set error message
		reject( new error( "", response ) );

	} else {
		reject( new Errors.UnknownError( response.data, response ) );

	}
}

function sendWithBrowser( method:string, url:string, body:string | Blob, options:Options ):Promise<Response> {
	return new Promise<Response>( ( resolve:Resolve, reject:Reject ):void => {
		let request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
		request.open( method, url, true );

		if ( options.headers ) forEachHeaders( options.headers, ( name:string, value:string ) => request.setRequestHeader( name, value ) );
		request.withCredentials = options.sendCredentialsOnCORS;
		if ( options.timeout ) request.timeout = options.timeout;

		request.onload = request.onerror = () => {
			let response:Response = new Response( request );
			onResolve( resolve, reject, response );
		};

		if ( body ) {
			request.send( body );
		} else {
			request.send();
		}
	});
}

function sendWithNode( method:string, url:string, body:string | Buffer, options:Options ):Promise<Response>  {
	return new Promise<Response>( ( resolve:Resolve, reject:Reject ):void => {
		let URL:any = require( "url" );
		let parsedURL:Url = URL.parse( url );
		let HTTP:any = parsedURL.protocol === "http:" ? require( "http" ) : require( "https" );

		let requestOptions:RequestOptions & { withCredentials: boolean } = {
			protocol: parsedURL.protocol,
			hostname: parsedURL.hostname,
			path: parsedURL.path,
			method: method,
			headers: {},
			withCredentials: options.sendCredentialsOnCORS,
		};
		if ( options.headers ) forEachHeaders( options.headers, ( name:string, value:string ) => requestOptions.headers[ name ] = value );

		let request:ClientRequest = HTTP.request( requestOptions, ( res:IncomingMessage ) => {
			let data:string = "";

			res.setEncoding( "utf8" );
			res.on( "data", ( chunk ) => {
				data = chunk;
			});

			res.on( "end", () => {
				let response:Response = new Response( request, data, res );
				onResolve( resolve, reject, response );
			});
		});
		if ( options.timeout ) request.setTimeout( options.timeout );

		request.on( "error", ( error ) => {
			let response:Response = new Response( request, error.message );
			onResolve( resolve, reject, response );
		});

		request.end( body );
	});
}

function isBody( data:string ): boolean;
function isBody( data:Blob ): boolean;
function isBody( data:Buffer ): boolean;
function isBody( data:string | Blob | Buffer ): boolean {
	return Utils.isString( data )
		|| typeof Blob !== "undefined" && data instanceof Blob
		|| typeof Buffer !== "undefined" && data instanceof Buffer;
}

export class Service {

	private static defaultOptions:Options = {
		sendCredentialsOnCORS: true,
	};

	static send( method:(Method | string), url:string, body:Blob, options?:Options ):Promise<Response>;
	static send<T>( method:(Method | string), url:string, body:Blob, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send( method:(Method | string), url:string, body:Buffer, options?:Options ):Promise<Response>;
	static send<T>( method:(Method | string), url:string, body:Buffer, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;

	static send( method:(Method | string), url:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string, options?:Options ):Promise<Response>;
	static send<T>( method:(Method | string), url:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:(Method | string), url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:any, url:string, bodyOrOptions:any = Service.defaultOptions, optionsOrParser:any = Service.defaultOptions, parser:Parser<T> = null ):any {
		let body:string | Blob | Buffer = null;
		let options:Options = Utils.hasProperty( optionsOrParser, "parse" ) ? bodyOrOptions : optionsOrParser;
		parser = Utils.hasProperty( optionsOrParser, "parse" ) ? optionsOrParser : parser;

		if ( isBody( bodyOrOptions ) ) {
			body = bodyOrOptions;
		} else {
			options = bodyOrOptions ? bodyOrOptions : options;
		}

		options = Utils.extend( options || {}, Service.defaultOptions );

		if ( Utils.isNumber( method ) ) method = Method[ method ];

		let requestPromise:Promise<Response>;
		if ( typeof XMLHttpRequest !== "undefined" ) {
			requestPromise = sendWithBrowser( method, url, <string | Blob> body, options );
		} else {
			requestPromise = sendWithNode( method, url, <string | Buffer> body, options );
		}

		if( parser === null ) return requestPromise;

		return requestPromise.then( ( response:Response ) => {
			return parser.parse( response.data ).then( ( parsedBody:T ) => {
				return [ parsedBody, response ];
			});
		});
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
	static post<T>( url:string, body:Buffer, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ] >;
	static post( url:string, body:Blob, options?:Options ):Promise<Response>;
	static post<T>( url:string, body:Blob, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ] >;
	static post( url:string, body:string, options?:Options ):Promise<Response>;
	static post<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ] >;
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
			if ( ! headers.has( headerName ) )
				headers.set( headerName, new Header.Class() );
		}

		if( ! requestOptions.headers  ) return undefined;
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

	static setIfMatchHeader( etag:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "if-match", new Header.Class( etag ) );
		return requestOptions;
	}

	static setPreferredInteractionModel( interactionModelURI:string, requestOptions:Options ):Options {
		let prefer:Header.Class = Util.getHeader( "prefer", requestOptions, true );
		prefer.values.push( new Header.Value( interactionModelURI + "; rel=interaction-model" ) );

		return requestOptions;
	}

	static setContainerRetrievalPreferences( preferences:ContainerRetrievalPreferences, requestOptions:Options, returnRepresentation:boolean = true ):Options {
		let prefer:Header.Class = Util.getHeader( "prefer", requestOptions, true );
		let representation:string = returnRepresentation ? "return=representation; " : "";

		let keys:string[] = [ "include", "omit" ];
		for ( let key of keys ) {
			if ( key in preferences && preferences[ key ].length > 0 ) {
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
}

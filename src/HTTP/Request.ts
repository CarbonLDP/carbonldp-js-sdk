/// <reference path="./../../typings/typings.d.ts" />

import * as Errors from "./Errors";
import * as Header from "./Header";
import Method from "./Method";
import Parser from "./Parser";
import Response from "./Response";

import * as Utils from "./../Utils";

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

function setHeaders( request:XMLHttpRequest, headers:Map<string, Header.Class> ):void {
	let namesIterator:Iterator<string> = headers.keys();
	let next:IteratorResult<string> = namesIterator.next();
	while ( ! next.done ) {
		let name:string = next.value;
		let value:Header.Class = headers.get( name );
		request.setRequestHeader( name, value.toString() );

		next = namesIterator.next();
	}
}

function onLoad( resolve:( result:any ) => void, reject:( value:Response ) => void, request:XMLHttpRequest ):() => void {
	return () => {
		let response:Response = new Response( request );
		if ( request.status >= 200 && request.status <= 299 ) {


			resolve( response );
		} else {
			rejectRequest( reject, request );
		}
	};
}

function onError( reject:( error:any ) => void, request:XMLHttpRequest ):() => void {
	return () => {
		rejectRequest( reject, request );
	};
}

function rejectRequest( reject:( error:any ) => void, request:XMLHttpRequest ):void {
	let response:Response = new Response( request );

	if ( response.status >= 400 && response.status < 600 ) {
		if ( Errors.statusCodeMap.has( response.status ) ) {
			let error:typeof Errors.Error = Errors.statusCodeMap.get( response.status );
			// TODO: Set error message
			reject( new error( "", response ) );
		}
	}

	reject( new Errors.UnknownError( "", response ) );
}

export class Service {

	private static defaultOptions:Options = {
		sendCredentialsOnCORS: true,
	};

	static send( method:(Method | string), url:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string, options?:Options ):Promise<Response>;
	static send<T>( method:(Method | string), url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static send<T>( method:any, url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		let body:string = bodyOrOptions && Utils.isString( bodyOrOptions ) ? bodyOrOptions : null;

		options = ! bodyOrOptions || Utils.isString( bodyOrOptions ) ? options : bodyOrOptions;
		options = options ? options : {};
		options = Utils.extend( options, Service.defaultOptions );

		if ( Utils.isNumber( method ) ) method = Method[ method ];

		let requestPromise:Promise<Response> = new Promise<Response>( ( resolve:( result:Response ) => void, reject:( error:any ) => void ):void => {
			let request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
			request.open( method, url, true );

			if ( options.headers ) setHeaders( request, options.headers );
			request.withCredentials = options.sendCredentialsOnCORS;
			if ( options.timeout ) request.timeout = options.timeout;

			request.onload = onLoad( resolve, reject, request );
			request.onerror = onError( reject, request );

			if ( body ) {
				request.send( body );
			} else {
				request.send();
			}
		});

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

	static delete( url:string, body:string, options?:Options ):Promise<Response>;
	static delete<T>( url:string, body:string, options?:Options, parser?:Parser<T> ):Promise<[ T, Response ]>;
	static delete<T>( url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions, parser:Parser<T> = null ):any {
		return Service.send( Method.DELETE, url, bodyOrOptions, options, parser );
	}
}

export class Util {
	static getHeader( headerName:string, requestOptions:Options, initialize:boolean = false ):Header.Class {
		if( initialize ) {
			let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
			headers.set( headerName, new Header.Class() );
		}

		if( ! requestOptions.headers  ) return undefined;
		return requestOptions.headers.get( headerName );
	}

	static setAcceptHeader( accept:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "Accept", new Header.Class( accept ) );
		return requestOptions;
	}

	static setContentTypeHeader( contentType:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "Content-Type", new Header.Class( contentType ) );
		return requestOptions;
	}

	static setIfMatchHeader( etag:string, requestOptions:Options ):Options {
		let headers:Map<string, Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header.Class>();
		headers.set( "If-Match", new Header.Class( etag ) );
		return requestOptions;
	}

	static setPreferredInteractionModel( interactionModelURI:string, requestOptions:Options ):Options {
		let prefer:Header.Class = Util.getHeader( "Prefer", requestOptions, true );
		prefer.values.push( new Header.Value( interactionModelURI + "; rel=interaction-model" ) );

		return requestOptions;
	}

	static setContainerRetrievalPreferences( preferences:ContainerRetrievalPreferences, requestOptions:Options ):Options {
		let prefer:Header.Class = Util.getHeader( "Prefer", requestOptions, true );

		let headerPieces:string[] = [ "return=representation;" ];
		if( "include" in preferences && preferences.include.length > 0 ) headerPieces.push( 'include="' + preferences.include.join( " " ) + '"' );
		if( "omit" in preferences && preferences.omit.length > 0 ) headerPieces.push( 'omit="' + preferences.omit.join( " " ) + '"' );

		if( headerPieces.length === 1 ) return requestOptions;

		prefer.values.push( new Header.Value( headerPieces.join( " " ) ) );

		return requestOptions;
	}

	static setSlug( slug:string, requestOptions:Options ):Options {
		let slugHeader:Header.Class = Util.getHeader( "Slug", requestOptions, true );
		slugHeader.values.push( new Header.Value( slug ) );

		return requestOptions;
	}
}

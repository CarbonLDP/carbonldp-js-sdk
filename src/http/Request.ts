/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import Method from './Method';
import Response from './Response';
import * as Header from './Header';

import * as Exceptions from './Exceptions';

import * as Utils from './../Utils';

interface Options {
	headers?: Map<string, Header.Class>;
	sendCredentialsOnCORS?:boolean;
	timeout?:number;
	request?: XMLHttpRequest;
}

function setHeaders( request:XMLHttpRequest, headers:Map<string, Header.Class> ):void {
	var namesIterator:Iterator<string> = headers.keys();
	var next = namesIterator.next();
	while ( ! next.done ) {
		var name:string = next.value;
		var value:Header.Class = headers.get( name );
		request.setRequestHeader( name, value.toString() );

		next = namesIterator.next();
	}
}

function onLoad( resolve:( value:Response | Thenable<Response> ) => void, reject:( value:Response ) => void, request:XMLHttpRequest ):()=>void {
	return () => {
		var response:Response = new Response( request );
		if ( request.status >= 200 && request.status <= 299 ) resolve( response );
		else rejectRequest( reject, request );
	};
}

function onError( reject:( error:any ) => void, request:XMLHttpRequest ):()=>void {
	return () => {
		rejectRequest( reject, request );
	};
}

function rejectRequest( reject:( error:any ) => void, request:XMLHttpRequest ):void {
	var response:Response = new Response( request );

	if ( response.status >= 400 && response.status < 600 ) {
		if ( Exceptions.statusCodeMap.has( response.status ) ) {
			var e = Exceptions.statusCodeMap.get( response.status );
			// TODO: Set error message
			reject( new e( "", response ) );
		}
	}

	reject( new Exceptions.UnknownException( "", response ) );
}

class Service {

	private static defaultOptions:Options = {
		sendCredentialsOnCORS: true
	};

	static send( method:(Method | string), url:string, options?:Options ):Promise<Response>;
	static send( method:(Method | string), url:string, body:string, options?:Options ):Promise<Response>;
	static send( method:any, url:string, bodyOrOptions:any = Service.defaultOptions, options:Options = Service.defaultOptions ):Promise<Response> {
		var body:string = Utils.isString( bodyOrOptions ) ? bodyOrOptions : null;
		options = Utils.isString( bodyOrOptions ) ? options : bodyOrOptions;
		if ( Utils.isNumber( method ) ) method = Method[ method ];


		return new Promise<Response>(
			function ( resolve, reject ) {
				var request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
				request.open( method, url, true );

				if ( options.headers ) setHeaders( request, options.headers );
				request.withCredentials = options.sendCredentialsOnCORS;
				if ( options.timeout ) request.timeout = options.timeout;

				request.onload = onLoad( resolve, reject, request );
				request.onerror = onError( reject, request );

				if ( body ) request.send( body );
				else request.send();
			}
		);
	}

	static options( url:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.OPTIONS, url, options );
	}

	static head( url:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.HEAD, url, options );
	}

	static get( url:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.GET, url, options );
	}

	static post( url:string, body:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.POST, url, body, options );
	}

	static put( url:string, body:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.PUT, url, body, options );
	}

	static patch( url:string, body:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.PATCH, url, body, options );
	}

	static delete( url:string, body:string, options:Options = Service.defaultOptions ):Promise<Response> {
		return Service.send( Method.DELETE, url, body, options );
	}
}

//@formatter:off
export {
	Options,
	Service
};
//@formatter:on
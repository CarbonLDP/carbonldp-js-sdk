/// <reference path="../typings/es6/es6.d.ts" />
/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as HTTP from './HTTP';
import * as Utils from './Utils';

enum Method {
	OPTIONS,
	HEAD,
	GET,
	POST,
	PUT,
	PATCH,
	DELETE
}

var defaultRequestOptions:RequestOptions = {
	sendCredentialsOnCORS: true
};

function sendRequest( method:Method, url:string, options:RequestOptions ):Promise<HTTP.Response>;
function sendRequest( method:Method, url:string, body:string, options?:RequestOptions ):Promise<HTTP.Response>;
function sendRequest( method:Method, url:string, bodyOrOptions:any = defaultRequestOptions, options:RequestOptions = defaultRequestOptions ):Promise<HTTP.Response> {
	var body:string = Utils.isString( bodyOrOptions ) ? bodyOrOptions : null;
	options = Utils.isString( bodyOrOptions ) ? options : bodyOrOptions;


	return new Promise<HTTP.Response>(
		function ( resolve, reject ) {
			var request:XMLHttpRequest = options.request ? options.request : new XMLHttpRequest();
			request.open( Method[ method ], url, true );

			if ( options.headers ) setHeaders( request, options.headers );
			if ( options.basic ) addBasicAuthHeader( request, options.basic );
			request.withCredentials = options.sendCredentialsOnCORS;
			if ( options.timeout ) request.timeout = options.timeout;

			request.onload = onLoad( resolve, reject, request );
			request.onerror = onError( reject, request );

			if ( body ) request.send( body );
			else request.send();
		}
	);
}

function setHeaders( request:XMLHttpRequest, headers:Map<string, HTTP.Header> ):void {
	var namesIterator:Iterator<string> = headers.keys();
	var next = namesIterator.next();
	while ( ! next.done ) {
		var name:string = next.value;
		var value:HTTP.Header = headers.get( name );
		request.setRequestHeader( name, value.toString() );
		
		next = namesIterator.next();
	}
}

function addBasicAuthHeader( request:XMLHttpRequest, credentials:Credentials ):void {
	var header:HTTP.Header = new HTTP.Header();
	var authorization = 'Basic ' + atob( credentials.username + ':' + credentials.password );
	header.values.push( new HTTP.HeaderValue( authorization ) );
	request.setRequestHeader( 'Authorization', header.toString() );
}

function onLoad( resolve:( value:HTTP.Response | Thenable<HTTP.Response> ) => void, reject:( value:HTTP.Response ) => void, request:XMLHttpRequest ):()=>void {
	return () => {
		var response:HTTP.Response = new HTTP.Response( request );
		if ( request.status >= 200 && request.status <= 299 ) resolve( response );
		else reject( response );
	};
}

function onError( reject:( value:HTTP.Response ) => void, request:XMLHttpRequest ):()=>void {
	return () => {
		var response:HTTP.Response = new HTTP.Response( request );
		reject( response );
	};
}

export interface Credentials {
	username:string;
	password:string;
}

export interface RequestOptions {
	headers?: Map<string, HTTP.Header>;
	basic?:Credentials;
	sendCredentialsOnCORS?:boolean;
	timeout?:number;
	request?: XMLHttpRequest;
}

export function options( url:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.OPTIONS, url, options );
}

export function head( url:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.HEAD, url, options );
}

export function get( url:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.GET, url, options );
}

// TODO: export function post( url:string, fields:Map<string, any>, options:RequestOptions = {} )
export function post( url:string, body:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.POST, url, body, options );
}

export function put( url:string, body:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.PUT, url, body, options );
}

export function patch( url:string, body:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.PATCH, url, body, options );
}

export function doDelete( url:string, body:string, options:RequestOptions = {} ):Promise<HTTP.Response> {
	return sendRequest( Method.DELETE, url, body, options );
}
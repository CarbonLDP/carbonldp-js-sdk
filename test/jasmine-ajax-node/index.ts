import events from "events";
import http from "http";
import https from "https";
import common from "nock/lib/common.js";
import Socket from "nock/lib/socket.js";
import timers from "timers";
import URL from "url";


class MockAgent {
	protocol:string | undefined;
	defaultPort:number;
	maxSockets:number;

	constructor( options:{ protocol?:string } ) {
		this.protocol = options.protocol;
		this.defaultPort = options.protocol === "https:" ? 443 : 80;
		this.maxSockets = Infinity;
	}

	addRequest():void {}
}


interface AjaxResponse {
	status?:number;
	statusText?:string;
	responseText?:string;
	response?:string;
	contentType?:string;
	responseHeaders?:{ [ key:string ]:string };
}


class RequestStub {
	url:string | RegExp;
	query:string | undefined;
	data:string | RegExp;
	method:string;

	status?:number;
	response?:string;
	contentType?:string;
	responseText?:string;
	responseHeaders?:{ [ p:string ]:string };

	constructor( url:string | RegExp, stubData:string | RegExp, method:string ) {
		if( url instanceof RegExp ) {
			this.url = url;
			this.query = void 0;
		} else {
			[ this.url, this.query ] = url.split( "?" );
			this.query = normalizeQuery( this.query );
		}

		this.data = stubData;
		this.method = method;
	}

	andReturn( options:JasmineAjaxRequestStubReturnOptions ):void {
		this.status = options.status || 200;

		this.contentType = options.contentType;
		this.response = options.response;
		this.responseText = options.responseText;
		this.responseHeaders = options.responseHeaders;
	}

	matches( fullUrl:string | RegExp, data?:string, method?:string ):boolean {
		fullUrl = fullUrl.toString();

		let urlMatches:boolean = false;
		if( this.url instanceof RegExp ) {
			urlMatches = this.url.test( fullUrl );
		} else {
			const [ url, query ]:string[] = fullUrl.split( "?" );
			urlMatches = this.url === url && this.query === normalizeQuery( query );
		}

		let dataMatches:boolean = false;
		if( this.data instanceof RegExp ) {
			if( data ) dataMatches = this.data.test( data );
		} else {
			dataMatches = ! this.data || this.data === normalizeQuery( data );
		}
		return urlMatches && dataMatches && (! this.method || this.method === method);
	}

}

class FakeClientRequest extends http.ClientRequest {
	connection:Socket;
	socket:Socket;
	aborted:number;

	url:string;
	method:string | undefined;
	params:any;
	requestHeaders:{ [ key:string ]:string };

	private ajax:MockAjax;
	private res:http.IncomingMessage;
	private callback:Function | undefined;

	private _ended:boolean | undefined;
	private requestBodyBuffers:Buffer[];
	private responseBodyBuffers:Buffer[];

	constructor( ajax:MockAjax, options:http.ClientRequestArgs | string | URL.URL, callback?:Function ) {
		const _options:http.ClientRequestArgs = typeof options === "object" ? options : URL.parse( options );
		const protocol:string = _options.protocol || _options.agent && _options.agent[ "protocol" ];

		super( {
			..._options,
			agent: new MockAgent( { protocol } ) as any,
		} );

		this.ajax = ajax;
		this.res = new http.IncomingMessage( new events.EventEmitter() as any );

		if( protocol === "https:" ) this.socket.authorized = true;
		this.res.socket = this.socket;
		this.aborted = 0;

		this.callback = callback;
		this.requestBodyBuffers = [];
		this.responseBodyBuffers = [];

		let url:string = "";
		if( protocol )
			url += `${protocol}//`;
		if( _options.hostname || _options.host )
			url += _options.hostname || _options.host;
		if( _options.path )
			url += _options.path;
		this.url = common.percentDecode( url );

		this.requestHeaders = this.getHeaders() as any;
		if( _options.headers && ! _options.headers.hasOwnProperty( "host" ) )
			delete this.requestHeaders[ "host" ];
	}


	abort():void {
		if( this.aborted ) return;
		this.aborted = 1;

		if( ! this._ended ) this.endFake();

		const err:NodeJS.ErrnoException = new Error();
		err.code = "aborted";
		this.res.emit( "close", err );

		this.socket.destroy();
		this.emit( "abort" );

		const connResetError:NodeJS.ErrnoException = new Error( "socket hang up" );
		connResetError.code = "ECONNRESET";
		this.emitError( connResetError );
	}

	end( buffer?:any, encoding?:any ):void {
		if( this.aborted ) this.emitError( new Error( "Request aborted" ) );
		if( this._ended ) return;

		this.write( buffer, encoding );
		this.endFake();

		this.emit( "finish" );
		this.emit( "end" );
	}

	flushHeaders():void {
		if( ! this.aborted && ! this._ended ) this.endFake();
		if( this.aborted ) this.emitError( new Error( "Request aborted" ) );
	}

	once( event:string, listener:( ...args:any[] ) => void ):this {
		return this.on( event, listener );
	}

	on( event:string, listener:( ...args:any[] ) => void ):this {
		if( event === "socket" ) {
			if( ! this.socket )
				this.socket = Socket( {} );

			// Emit a fake socket.
			listener.call( this, this.socket );
			this.socket.emit( "connect", this.socket );
			this.socket.emit( "secureConnect", this.socket );
		}

		events.EventEmitter.prototype.on.call( this, event, listener );
		return this;
	}

	write( buffer:any, encoding:any ):boolean {
		if( buffer && ! this.aborted ) {
			if( ! Buffer.isBuffer( buffer ) ) {
				buffer = Buffer.from( buffer, encoding );
			}
			this.requestBodyBuffers.push( buffer );
		}

		if( this.aborted ) this.emitError( new Error( "Request aborted" ) );

		timers.setImmediate( () => this.emit( "drain" ) );
		return false;
	}


	//  MockAjax related methods

	respondWith( response:AjaxResponse ):void {
		if( this._ended ) return;

		this.res.statusCode = response.status || 200;
		this.res.headers = response.responseHeaders ? { ...response.responseHeaders } : {};

		if( response.response || response.responseText ) {
			const responseData:string | Buffer = response.response! || response.responseText!;
			const responseBuffer:Buffer = Buffer.isBuffer( responseData ) ? responseData : Buffer.from( responseData );
			this.responseBodyBuffers.push( responseBuffer );
		}

		this.endFake();
	}

	private responseWithStub():void {
		if( this._ended ) return;

		const stub:RequestStub | undefined = this.ajax.stubs.findStub( this.url, this.params, this.method );
		if( stub ) this.respondWith( stub );
	}

	private endFake():void {
		if( this.params === void 0 && this.requestBodyBuffers.length ) {
			//  When request body is a binary buffer we internally use in its hexadecimal representation.
			const requestBodyBuffer:Buffer = common.mergeChunks( this.requestBodyBuffers );
			this.params = common.isBinaryBuffer( requestBodyBuffer ) ?
				requestBodyBuffer.toString( "hex" ) :
				requestBodyBuffer.toString( "utf8" )
			;
		}

		if( this.res.statusCode === null )
			return this.responseWithStub();

		this._ended = true;
		if( this.aborted ) return;

		process.nextTick( () => {
			if( this.aborted ) return;

			if( typeof this.callback === "function" ) {
				this.callback.call( void 0, this.res );
			}

			if( this.aborted ) {
				this.emitError( new Error( "Request aborted" ) );
			} else {
				this.emit( "response", this.res );
			}

			// Stream the response chunks one at a time.
			let emitChunk:() => void = () => {
				const chunk:Buffer | undefined = this.responseBodyBuffers.shift();
				if( chunk ) {
					this.res.push( chunk );
					timers.setImmediate( emitChunk );
				} else {
					this.res.push( null );
				}
			};
			timers.setImmediate( emitChunk );
		} );
	}

	private emitError( error:Error ):void {
		process.nextTick( () => this.emit( "error", error ) );
	}

}


class StubTracker {
	private stubs:RequestStub[];

	constructor() {
		this.stubs = [];
	}

	addStub( stub:RequestStub ):void {
		this.stubs.unshift( stub );
	}

	findStub( url:string, data?:string, method?:string ):RequestStub | undefined {
		return this
			.stubs
			.find( stub => stub.matches( url, data, method ) );
	}

	reset():void {
		this.stubs.length = 0;
	}

}

class RequestTracker {
	private requests:FakeClientRequest[];

	constructor() {
		this.requests = [];
	}

	track( request:FakeClientRequest ):void {
		this.requests.push( request );
	}

	first():FakeClientRequest | undefined {
		return this.at( 0 );
	}

	mostRecent():FakeClientRequest | undefined {
		return this.at( this.requests.length - 1 );
	}

	at( index:number ):FakeClientRequest | undefined {
		if( index >= this.requests.length ) return;
		return this.requests[ index ];
	}

	filter( urlToMatch:string | RegExp | (( request:FakeClientRequest ) => boolean) ):FakeClientRequest[] {
		const filter:( request:FakeClientRequest ) => boolean = urlToMatch instanceof Function ? urlToMatch :
			urlToMatch instanceof RegExp ?
				request => urlToMatch.test( request.url ) :
				request => urlToMatch === request.url;

		return this.requests.filter( filter );
	}

	count():number {
		return this.requests.length;
	}

	reset():void {
		this.requests.length = 0;
	}

}


class MockAjax {
	readonly stubs:StubTracker;
	readonly requests:RequestTracker;

	private requestOverride?:{ [ protocol:string ]:{ module:typeof http, request:typeof http.request } };

	constructor() {
		this.stubs = new StubTracker();
		this.requests = new RequestTracker();
	}

	install():void {
		if( this.requestOverride ) throw new Error( "Mock Jasmine Ajax is already installed." );
		this.requestOverride = {};

		[ "http", "https" ].forEach( protocol => {
			if( this.requestOverride![ protocol ] ) throw new Error( "Module's request already overridden for " + protocol + " protocol." );

			const module:typeof http = { http, https }[ protocol ];
			this.requestOverride![ protocol ] = { module, request: module.request };

			module.request = ( options, callback ):http.ClientRequest => {
				const request:FakeClientRequest = new FakeClientRequest( this, options, callback );
				this.requests.track( request );

				return request;
			};
		} );

	}

	uninstall():void {
		if( ! this.requestOverride ) throw new Error( "Mock Jasmine Ajax is not installed." );

		//  Restore any overridden requests.
		Object.keys( this.requestOverride )
			.map( protocol => this.requestOverride![ protocol ] )
			.forEach( override => {
				override.module.request = override.request;
			} )
		;

		this.requestOverride = void 0;
		this.stubs.reset();
		this.requests.reset();
	}

	stubRequest( url:string | RegExp, data:string | RegExp, method:string ):RequestStub {
		let stub:RequestStub = new RequestStub( url, data, method );
		this.stubs.addStub( stub );

		return stub;
	}

}


function normalizeQuery( query?:string ):string | undefined {
	if( ! query ) return;

	return query
		.split( "&" )
		.sort()
		.join( "&" )
		;
}


(jasmine as any).Ajax = new MockAjax();

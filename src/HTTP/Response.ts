import {
	ClientRequest,
	IncomingMessage,
} from "http";
import { BadResponseError } from "./Errors";
import { Header } from "./Header";

export class Response {
	readonly status:number;
	readonly data:string;
	readonly headers:Map<string, Header>;
	readonly request:XMLHttpRequest | ClientRequest;

	constructor( request:XMLHttpRequest );
	constructor( request:ClientRequest, data:string, response?:IncomingMessage );
	constructor( request:XMLHttpRequest | ClientRequest, data?:string, response?:IncomingMessage ) {
		this.request = request;
		if( typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest ) {
			this.status = request.status;
			this.data = request.responseText;
			this.headers = Header.parseHeaders( request.getAllResponseHeaders() );

		} else {
			this.data = data || "";
			this.headers = new Map<string, Header>();
			if( ! response ) return;

			this.status = response.statusCode;
			Object.keys( response.headers ).forEach( name => {
				this.headers.set( name.toLowerCase(), new Header( response.headers[ name ] ) );
			} );
		}
	}

	getHeader( name:string ):Header {
		name = name.toLowerCase();
		return this.headers.get( name ) || null;
	}

	getETag():string {
		const eTagHeader:Header = this.getHeader( "ETag" );

		// TODO: Warn multiple ETags
		if( ! eTagHeader || ! eTagHeader.values.length )
			throw new BadResponseError( "The response doesn't contain an ETag", this );

		return eTagHeader.values[ 0 ];
	}

}

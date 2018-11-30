import { ClientRequest, IncomingMessage } from "http";

import { BadResponseError } from "./Errors/ServerErrors/BadResponseError";
import { Header } from "./Header";


/**
 * Class that represents an HTTP response.
 */
export class Response {
	/**
	 * The status code of the request.
	 */
	readonly status:number;
	/**
	 * The RAW body of the request.
	 */
	readonly data:string;
	/**
	 * A map object containing the headers of the request's response.
	 */
	readonly headers:Map<string, Header>;
	/**
	 * The XMLHttpRequest or ClientRequest provided in the constructor.
	 */
	readonly request:XMLHttpRequest | ClientRequest;

	/**
	 * Creates an instance from a XMLHttpRequest.
	 * @param request The XMLHttpRequest used in the Browser request.
	 */
	constructor( request:XMLHttpRequest );
	/**
	 * Creates an instance from a ClientRequest, a data and an IncomingMessage.
	 * @param request The ClientRequest used in the Node.js request.
	 * @param data The full data received in the Node.js request.
	 * @param response The IncomingMessage of the Node.js request.
	 */
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

	/**
	 * Returns the Header object referred by the name specified.
	 * If no header exists `null` will be returned.
	 * @param name The name of the header to look for.
	 */
	getHeader( name:string ):Header | null {
		name = name.toLowerCase();
		return this.headers.get( name ) || null;
	}

	/**
	 * Returns the eTag header value.
	 * If no such header exists a {@link BadResponseError} will be thrown.
	 */
	getETag():string {
		const eTagHeader:Header = this.getHeader( "ETag" );

		// TODO: Warn multiple ETags
		if( ! eTagHeader || ! eTagHeader.values.length )
			throw new BadResponseError( "The response doesn't contain an ETag", this );

		return eTagHeader.values[ 0 ];
	}

}

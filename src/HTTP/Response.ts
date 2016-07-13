import * as Header from "./Header";
import {ClientRequest, IncomingMessage} from "http";
import {isString, isObject} from "../Utils";

export class Class {
	status:number;
	data:string | Blob | Buffer;
	headers:Map<string, Header.Class>;
	request:XMLHttpRequest | ClientRequest;

	constructor( request:XMLHttpRequest );
	constructor( request:ClientRequest, data:string, response?:IncomingMessage );
	constructor( request:XMLHttpRequest | ClientRequest, data?:string, response:IncomingMessage = <any>{} ) {
		if( typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest ) {
			let res:XMLHttpRequest = request;
			this.status = res.status;
			this.data = res.response || res.responseText;
			this.setHeaders( res.getAllResponseHeaders() );
		} else {
			this.status = response.statusCode;
			this.data = data || "";
			this.setHeaders( <Object> response.headers );
		}

		this.request = request;
	}

	public getHeader( name:string ):Header.Class {
		name = name.toLowerCase();
		return this.headers.get( name ) || null;
	}

	private setHeaders( headersString:string ):void;
	private setHeaders( headerObject:Object ):void;
	private setHeaders( headers:any ):void {
		if( isString( headers ) ) {
			this.headers = Header.Util.parseHeaders( headers );
		} else {
			this.headers = new Map<string, Header.Class>();
			if( isObject( headers ) ) {
				for( let name of Object.keys( headers ) ) {
					this.headers.set( name, new Header.Class( headers[ name ] ) );
				}
			}
		}
	}
}

export class Util {
	static getETag( response:Class ):string {
		if( ! response || ! response.headers ) return null;

		let etagHeader:Header.Class = response.getHeader( "ETag" );

		if( ! etagHeader ) return null;
		if( ! etagHeader.values.length ) return null;
		if( etagHeader.values.length > 1 ) console.warn( "The response contains more than one ETag. Response: %o", response );

		return etagHeader.values[ 0 ].toString();
	}
}

export default Class;

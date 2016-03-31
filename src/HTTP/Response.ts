import * as Header from "./Header";

export class Class {
	constructor( request:XMLHttpRequest ) {
		this.status = request.status;
		this.data = request.response || request.responseText;
		this.setHeaders( request );

		this.request = request;
	}

	status:number;
	data:string | Blob;
	headers:Map<string, Header.Class>;
	request:XMLHttpRequest;

	public getHeader( name:string ):Header.Class {
		name = name.toLowerCase();
		return this.headers.get( name ) || null;
	}

	private setHeaders( request:XMLHttpRequest ):void {
		let headersString:string = request.getAllResponseHeaders();
		if ( headersString ) {
			this.headers = Header.Util.parseHeaders( headersString );
		} else {
			this.headers = new Map<string, Header.Class>();
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

import * as Header from "./Header";

class Response {
	constructor( request:XMLHttpRequest ) {
		this.status = request.status;
		this.data = request.responseText;
		this.setHeaders( request );

		this.request = request;
	}

	status:number;
	data:string;
	headers:Map<string, Header.Class>;
	request:XMLHttpRequest;


	private setHeaders( request:XMLHttpRequest ):void {
		let headersString:string = request.getAllResponseHeaders();
		if ( headersString ) {
			this.headers = Header.Util.parseHeaders( headersString );
		} else {
			this.headers = new Map<string, Header.Class>();
		}
	}
}

export default Response;

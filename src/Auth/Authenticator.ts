import { IllegalStateError } from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";

export abstract class Class<T extends object, W extends object> {

	protected abstract credentials:W;

	isAuthenticated():boolean {
		return ! ! this.credentials;
	}

	abstract authenticate( authenticationToken:T ):Promise<W>;

	clearAuthentication():void {
		this.credentials = null;
	}

	addAuthentication( requestOptions:RequestOptions ):RequestOptions {
		if( ! this.isAuthenticated() ) throw new IllegalStateError( "The authenticator isn't authenticated." );

		const headers:Map<string, Header> = requestOptions.headers ?
			requestOptions.headers : requestOptions.headers = new Map<string, Header>();

		if( headers.has( "authorization" ) ) return requestOptions;

		const header:Header = new Header();
		headers.set( "authorization", header );

		header.values.push( this.getHeaderValue() );

		return requestOptions;
	}

	protected abstract getHeaderValue():string;
}

export default Class;

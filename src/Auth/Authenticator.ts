import { IllegalStateError } from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";

export abstract class Authenticator<T extends object, W extends object> {

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

		const strAuthHeader:string = this.getHeaderValue();
		headers.set( "authorization", new Header( [ strAuthHeader ] ) );

		return requestOptions;
	}

	protected abstract getHeaderValue():string;
}

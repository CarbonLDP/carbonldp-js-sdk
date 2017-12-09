import * as Errors from "../Errors";
import * as HTTP from "../HTTP";

export abstract class Class<T extends object, W extends object> {

	protected abstract credentials:W;

	isAuthenticated():boolean {
		return ! ! this.credentials;
	}

	abstract authenticate( authenticationToken:T ):Promise<W>;

	clearAuthentication():void {
		this.credentials = null;
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		if( ! this.isAuthenticated() ) throw new Errors.IllegalStateError( "The authenticator isn't authenticated." );

		const headers:Map<string, HTTP.Header.Class> = requestOptions.headers ?
			requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		if( headers.has( "authorization" ) ) return requestOptions;

		const header:HTTP.Header.Class = new HTTP.Header.Class();
		headers.set( "authorization", header );

		header.values.push( this.getHeaderValue() );

		return requestOptions;
	}

	protected abstract getHeaderValue():HTTP.Header.Value;
}

export default Class;

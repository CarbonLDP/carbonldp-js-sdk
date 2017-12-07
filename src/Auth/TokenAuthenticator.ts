import Context from "./../Context";
import * as Errors from "./../Errors";
import * as FreeResources from "./../FreeResources";
import * as HTTP from "./../HTTP";
import * as JSONLD from "./../JSONLD";
import * as LDP from "./../LDP";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
import * as RDF from "./../RDF";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";

export const TOKEN_CONTAINER:string = "auth-tokens/";

export class Class implements Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {

	private context:Context;
	private basicAuthenticator:BasicAuthenticator;
	private _credentials:TokenCredentials.Class;

	constructor( context:Context ) {
		if( context === null ) throw new Errors.IllegalArgumentError( "context cannot be null" );

		this.context = context;
		this.basicAuthenticator = new BasicAuthenticator();
	}

	isAuthenticated():boolean {
		return ! ! this._credentials && this._credentials.expirationTime > new Date();
	}

	authenticate( tokenOrCredentials:UsernameAndPasswordToken.Class | TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		if( tokenOrCredentials instanceof UsernameAndPasswordToken.Class ) return this.basicAuthenticator.authenticate( tokenOrCredentials ).then( () => {
			return this.createToken();
		} ).then( ( [ tokenCredentials ]:[ TokenCredentials.Class, HTTP.Response.Class ] ):TokenCredentials.Class => {
			this.basicAuthenticator.clearAuthentication();
			this._credentials = tokenCredentials;
			return tokenCredentials;
		} );

		const credentials:TokenCredentials.Class = <TokenCredentials.Class> tokenOrCredentials;
		if( Utils.isString( credentials.expirationTime ) ) tokenOrCredentials.expirationTime = new Date( credentials.expirationTime );
		if( credentials.expirationTime <= new Date() ) return Promise.reject( new Errors.IllegalArgumentError( "The token has already expired." ) );

		this._credentials = credentials;
		return Promise.resolve( credentials );
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addTokenAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this._credentials = null;
	}

	private createToken():Promise<[ TokenCredentials.Class, HTTP.Response.Class ]> {
		let requestOptions:HTTP.Request.Options = {};

		this.basicAuthenticator.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

		return Promise.resolve().then( () => {
			const tokensURI:string = this.context.resolveSystemURI( TOKEN_CONTAINER );
			return HTTP.Request.Service.post( tokensURI, null, requestOptions, new JSONLD.Parser.Class() );
		} ).then<[ TokenCredentials.Class, HTTP.Response.Class ]>( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );

			let freeResources:FreeResources.Class = this.context.documents._getFreeResources( freeNodes );
			let tokenResources:TokenCredentials.Class[] = <TokenCredentials.Class[]> freeResources.getResources().filter( resource => Resource.Util.hasType( resource, TokenCredentials.RDF_CLASS ) );

			if( tokenResources.length === 0 ) throw new HTTP.Errors.BadResponseError( "No '" + TokenCredentials.RDF_CLASS + "' was returned.", response );
			if( tokenResources.length > 1 ) throw new HTTP.Errors.BadResponseError( "Multiple '" + TokenCredentials.RDF_CLASS + "' were returned. ", response );
			let token:TokenCredentials.Class = tokenResources[ 0 ];

			let userDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult ).filter( rdfDocument => rdfDocument[ "@id" ] === token.user.id );
			userDocuments.forEach( document => this.context.documents._getPersistedDocument( document, response ) );

			const responseMetadata:LDP.ResponseMetadata.Class = <LDP.ResponseMetadata.Class> freeResources
				.getResources()
				.find( LDP.ResponseMetadata.Factory.is );

			if( responseMetadata ) responseMetadata
				.documentsMetadata
				.forEach( documentMetadata => {
					const document:PersistedDocument.Class = documentMetadata.relatedDocument as PersistedDocument.Class;
					document._etag = documentMetadata.eTag;
				} );

			return [ token, response ];
		}, response => this.context.documents._parseErrorResponse( response ) );
	}

	private addTokenAuthenticationHeader( headers:Map<string, HTTP.Header.Class> ):void {
		if( headers.has( "authorization" ) ) return;

		let header:HTTP.Header.Class = new HTTP.Header.Class();
		headers.set( "authorization", header );

		let authorization:string = "Token " + this._credentials.key;
		header.values.push( new HTTP.Header.Value( authorization ) );
	}
}

export default Class;

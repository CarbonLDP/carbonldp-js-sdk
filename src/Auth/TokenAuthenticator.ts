import * as Context from "../Context";
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

export class Class extends Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {

	protected context:Context.Class;
	protected credentials:TokenCredentials.Class;

	constructor( context:Context.Class ) {
		super();
		this.context = context;
	}

	isAuthenticated():boolean {
		return super.isAuthenticated() && this.credentials.expirationTime > new Date();
	}

	authenticate( tokenOrCredentials:UsernameAndPasswordToken.Class | TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		return this
			.getCredentials( tokenOrCredentials )
			.then( ( credentials:TokenCredentials.Class ) => {
				if( Utils.isString( credentials.expirationTime ) ) credentials.expirationTime = new Date( credentials.expirationTime );
				if( credentials.expirationTime <= new Date() ) throw new Errors.IllegalArgumentError( "The token has already expired." );

				return this.credentials = credentials;
			} );
	}

	protected getHeaderValue():HTTP.Header.Value {
		return new HTTP.Header.Value( "Token " + this.credentials.key );
	}

	private getCredentials( tokenOrCredentials:UsernameAndPasswordToken.Class | TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		if( TokenCredentials.Factory.hasClassProperties( tokenOrCredentials ) ) return Promise.resolve( tokenOrCredentials );

		const basicAuthenticator:BasicAuthenticator = new BasicAuthenticator();
		return basicAuthenticator
			.authenticate( tokenOrCredentials )
			.then( () => {
				const requestOptions:HTTP.Request.Options = {};
				basicAuthenticator.addAuthentication( requestOptions );
				HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
				HTTP.Request.Util.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

				const tokensURI:string = this.context.resolveSystemURI( TOKEN_CONTAINER );
				return HTTP.Request.Service.post( tokensURI, null, requestOptions, new JSONLD.Parser.Class() );
			} )
			.then( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
				const freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );

				const freeResources:FreeResources.Class = this.context.documents._getFreeResources( freeNodes );
				const tokenResources:TokenCredentials.Class[] = <TokenCredentials.Class[]> freeResources.getResources().filter( resource => Resource.Util.hasType( resource, TokenCredentials.RDF_CLASS ) );

				if( tokenResources.length === 0 ) throw new HTTP.Errors.BadResponseError( "No '" + TokenCredentials.RDF_CLASS + "' was returned.", response );
				if( tokenResources.length > 1 ) throw new HTTP.Errors.BadResponseError( "Multiple '" + TokenCredentials.RDF_CLASS + "' were returned. ", response );
				const token:TokenCredentials.Class = tokenResources[ 0 ];

				const userDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult ).filter( rdfDocument => rdfDocument[ "@id" ] === token.user.id );
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

				return token;
			} )
			.catch( error => this.context.documents._parseErrorResponse( error ) );
	}

}

export default Class;

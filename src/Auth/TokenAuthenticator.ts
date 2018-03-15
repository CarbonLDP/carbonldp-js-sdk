import { Context } from "../Context";
import * as Errors from "../Errors";
import { FreeResources } from "../FreeResources";
import { BadResponseError } from "../HTTP/Errors";
import {
	RequestOptions,
	RequestService,
	RequestUtils,
} from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { JSONLDParser } from "../JSONLD";
import { ResponseMetadata } from "../LDP/ResponseMetadata";
import { PersistedDocument } from "../PersistedDocument";
import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";
import { LDP } from "../Vocabularies/LDP";
import * as Utils from "./../Utils";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";

export const TOKEN_CONTAINER:string = "auth-tokens/";

export class Class extends Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {

	protected context:Context;
	protected credentials:TokenCredentials.Class;

	constructor( context:Context ) {
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

	protected getHeaderValue():string {
		return "Token " + this.credentials.key;
	}

	private getCredentials( tokenOrCredentials:UsernameAndPasswordToken.Class | TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		if( TokenCredentials.Factory.hasClassProperties( tokenOrCredentials ) ) return Promise.resolve( tokenOrCredentials );

		const basicAuthenticator:BasicAuthenticator = new BasicAuthenticator();
		return basicAuthenticator
			.authenticate( tokenOrCredentials )
			.then( () => {
				const requestOptions:RequestOptions = {};
				basicAuthenticator.addAuthentication( requestOptions );
				RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );
				RequestUtils.setPreferredInteractionModel( LDP.RDFSource, requestOptions );

				const tokensURI:string = this.context._resolvePath( "system.security" ) + TOKEN_CONTAINER;
				return RequestService.post( tokensURI, null, requestOptions, new JSONLDParser() );
			} )
			.then( ( [ expandedResult, response ]:[ any, Response ] ) => {
				const freeNodes:RDFNode[] = RDFNode.getFreeNodes( expandedResult );

				const freeResources:FreeResources = this.context.documents._getFreeResources( freeNodes );
				const tokenResources:TokenCredentials.Class[] = <TokenCredentials.Class[]> freeResources.getResources().filter( resource => resource.hasType( TokenCredentials.RDF_CLASS ) );

				if( tokenResources.length === 0 ) throw new BadResponseError( "No '" + TokenCredentials.RDF_CLASS + "' was returned.", response );
				if( tokenResources.length > 1 ) throw new BadResponseError( "Multiple '" + TokenCredentials.RDF_CLASS + "' were returned. ", response );
				const token:TokenCredentials.Class = tokenResources[ 0 ];

				const userDocuments:RDFDocument[] = RDFDocument.getDocuments( expandedResult ).filter( rdfDocument => rdfDocument[ "@id" ] === token.user.id );
				userDocuments.forEach( document => this.context.documents._getPersistedDocument( document, response ) );

				const responseMetadata:ResponseMetadata = <ResponseMetadata> freeResources
					.getResources()
					.find( ResponseMetadata.is );

				if( responseMetadata ) responseMetadata
					.documentsMetadata
					.forEach( documentMetadata => {
						const document:PersistedDocument = documentMetadata.relatedDocument as PersistedDocument;
						document._eTag = documentMetadata.eTag;
					} );

				return token;
			} )
			.catch( error => this.context.documents._parseErrorResponse( error ) );
	}

}

export default Class;

import { IllegalArgumentError } from "../Errors";
import { RequestUtils } from "../HTTP";
import { BadResponseError } from "../HTTP/Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { ResponseMetadata } from "../LDP";
import { RDFNode } from "../RDF";
import { FreeResources } from "../FreeResources";
import { promiseMethod } from "../Utils";
import { CS } from "../Vocabularies";
import { AbstractAuthenticator } from "./AbstractAuthenticator";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { BasicAuthenticator } from "./BasicAuthenticator";
import { BasicToken } from "./BasicToken";
import {
	TokenCredentials,
	TokenCredentialsBase,
} from "./TokenCredentials";


export class TokenAuthenticator extends AbstractAuthenticator<BasicToken, TokenCredentials> {

	protected _credentials:TokenCredentials;

	isAuthenticated():boolean {
		return super.isAuthenticated() && this._credentials.expires > new Date();
	}

	authenticate( tokenOrCredentials:BasicToken | TokenCredentialsBase ):Promise<TokenCredentials> {
		if( TokenCredentialsBase.is( tokenOrCredentials ) )
			return this._parseCredentialsBase( tokenOrCredentials );

		return this._getCredentials( tokenOrCredentials );
	}

	protected _getHeaderValue():string {
		return "Bearer " + this._credentials.token;
	}

	protected _parseCredentialsBase( credentialsBase:TokenCredentialsBase ):Promise<TokenCredentials> {
		return promiseMethod( () => {
			const credentials:TokenCredentials = TokenCredentials.createFrom( credentialsBase );

			if( credentials.expires <= new Date() ) throw new IllegalArgumentError( "The token has already expired." );

			return this._credentials = credentials;
		} );
	}

	protected _getCredentials( token:BasicToken ):Promise<TokenCredentials> {
		const basicAuthenticator:BasicAuthenticator = new BasicAuthenticator( this.context );
		return basicAuthenticator
			.authenticate( token )
			.then( () => {
				const requestOptions:RequestOptions = {};
				basicAuthenticator.addAuthentication( requestOptions );

				RequestUtils.setRetrievalPreferences( { include: [ CS.PreferAuthToken ] }, requestOptions );

				return this.getAuthenticatedUser( requestOptions );
			} )
			.then( () => {
				return this._credentials;
			} );
	}

	protected _parseRDFMetadata( rdfData:object[], response:Response, requestOptions:RequestOptions ):AuthenticatedUserInformationAccessor {
		const accessor:AuthenticatedUserInformationAccessor = super._parseRDFMetadata( rdfData, response );

		const authTokenPrefer:string = `include="${ CS.PreferAuthToken }"`;

		const prefer:Header = requestOptions.headers && requestOptions.headers.get( "prefer" );
		if( ! prefer || ! prefer.hasValue( authTokenPrefer ) ) return accessor;

		const preference:Header = response.getHeader( "preference-applied" );
		if( ! preference || ! preference.hasValue( authTokenPrefer ) )
			throw new BadResponseError( `Preference "${ authTokenPrefer }" was not applied.`, response );

		this._parseRDFCredentials( rdfData, response );

		return accessor;
	}

	protected _parseRDFCredentials( rdfData:object[], response:Response ):TokenCredentials {
		const freeNodes:RDFNode[] = RDFNode.getFreeNodes( rdfData );

		const freeResources:FreeResources = this.context.registry
			._parseFreeNodes( freeNodes );

		const responseMetadata:ResponseMetadata = freeResources.getPointers()
			.find( ResponseMetadata.is );
		if( ! responseMetadata ) throw new BadResponseError( `No "${ ResponseMetadata.TYPE }" was returned.`, response );

		const tokenCredentials:TokenCredentials = responseMetadata.authToken;
		if( ! tokenCredentials ) throw new BadResponseError( `No "${ TokenCredentials.TYPE }" was returned.`, response );

		return this._credentials = tokenCredentials;
	}

}

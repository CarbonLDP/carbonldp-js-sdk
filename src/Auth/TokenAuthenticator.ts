import * as Errors from "../Errors";
import { FreeResources } from "../FreeResources";
import { RequestUtils } from "../HTTP";
import { BadResponseError } from "../HTTP/Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { ResponseMetadata } from "../LDP";
import { RDFNode } from "../RDF/Node";
import { promiseMethod } from "../Utils";
import { CS } from "../Vocabularies";
import * as Utils from "./../Utils";
import { Authenticator } from "./Authenticator";
import { BasicAuthenticator } from "./BasicAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import { UserMetadata } from "./UserMetadata";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";


export class TokenAuthenticator extends Authenticator<UsernameAndPasswordToken, TokenCredentials.Class> {

	protected credentials:TokenCredentials.Class;

	isAuthenticated():boolean {
		return super.isAuthenticated() && this.credentials.expirationTime > new Date();
	}

	authenticate( tokenOrCredentials:UsernameAndPasswordToken | TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		if( TokenCredentials.Factory.hasClassProperties( tokenOrCredentials ) )
			return this._parseRawCredentials( tokenOrCredentials );

		return this._getCredentials( tokenOrCredentials );
	}

	protected _getHeaderValue():string {
		return "Token " + this.credentials.key;
	}

	protected _parseRawCredentials( credentials:TokenCredentials.Class ):Promise<TokenCredentials.Class> {
		return promiseMethod( () => {
			if( Utils.isString( credentials.expirationTime ) ) credentials.expirationTime = new Date( credentials.expirationTime );
			if( credentials.expirationTime <= new Date() ) throw new Errors.IllegalArgumentError( "The token has already expired." );

			return this.credentials = credentials;
		} );
	}

	protected _getCredentials( token:UsernameAndPasswordToken ):Promise<TokenCredentials.Class> {
		const basicAuthenticator:BasicAuthenticator = new BasicAuthenticator( this.context );
		return basicAuthenticator
			.authenticate( token )
			.then( () => {
				const requestOptions:RequestOptions = {};
				basicAuthenticator.addAuthentication( requestOptions );

				RequestUtils.setRetrievalPreferences( { include: [ CS.PreferAuthToken ] }, requestOptions, false );

				return this.getAuthenticatedUser( requestOptions );
			} )
			.then( () => {
				return this.credentials;
			} );
	}

	protected _parseRDFMetadata( rdfData:object[], response:Response ):UserMetadata {
		const preferenceHeader:Header = response.getHeader( "Preference-Applied" );
		if( preferenceHeader && preferenceHeader.hasValue( CS.PreferAuthToken ) )
			this._parseRDFCredentials( rdfData, response );

		return super._parseRDFMetadata( rdfData, response );
	}

	protected _parseRDFCredentials( rdfData:object[], response:Response ):TokenCredentials.Class {
		const freeNodes:RDFNode[] = RDFNode.getFreeNodes( rdfData );

		const freeResources:FreeResources = this.context.documents
			._getFreeResources( freeNodes );

		const responseMetadata:ResponseMetadata = freeResources
			.getResources()
			.find( ResponseMetadata.is );
		if( ! responseMetadata ) throw new BadResponseError( `No "${ ResponseMetadata.TYPE }" was returned.`, response );

		const tokenCredentials:TokenCredentials.Class = responseMetadata.authToken;
		if( ! tokenCredentials ) throw new BadResponseError( `No "${ TokenCredentials.RDF_CLASS }" was returned.`, response );

		return this.credentials = tokenCredentials;
	}

}

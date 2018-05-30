import { CarbonLDP } from "../CarbonLDP";
import { IllegalStateError } from "../Errors";
import {
	GETOptions,
	Header,
	RequestOptions,
	RequestService,
	RequestUtils,
	Response,
} from "../HTTP";
import { BadResponseError } from "../HTTP/Errors";
import {
	JSONLDCompacter,
	JSONLDParser
} from "../JSONLD";
import { RDFDocument } from "../RDF";
import { promiseMethod } from "../Utils";
import { LDP } from "../Vocabularies";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { Authenticator } from "./Authenticator";
import { User } from "./User";


export abstract class AbstractAuthenticator<T extends object, W extends object> implements Authenticator<W> {

	protected context:CarbonLDP;

	protected _authenticatedUser?:User;
	get authenticatedUser():User { return this._authenticatedUser; }

	protected abstract _credentials?:W;

	constructor( context:CarbonLDP ) {
		this.context = context;
	}

	isAuthenticated():boolean {
		return ! ! this._credentials;
	}

	abstract authenticate( authenticationToken:T ):Promise<W>;

	clearAuthentication():void {
		this._credentials = null;
		this._authenticatedUser = null;
	}

	addAuthentication( requestOptions:RequestOptions ):RequestOptions {
		if( requestOptions.headers && requestOptions.headers.has( "authorization" ) ) return requestOptions;

		if( ! this.isAuthenticated() ) throw new IllegalStateError( "The authenticator isn't authenticated." );
		if( ! requestOptions.headers ) requestOptions.headers = new Map<string, Header>();

		const strAuthHeader:string = this._getHeaderValue();
		requestOptions.headers.set( "authorization", new Header( [ strAuthHeader ] ) );

		return requestOptions;
	}

	getAuthenticatedUser( requestOptions:GETOptions = {} ):Promise<User> {
		if( this._authenticatedUser ) return Promise.resolve( this._authenticatedUser );

		return promiseMethod( () => {
			const metadataURI:string = this.context._resolvePath( "users.me" );

			const localOptions:GETOptions = RequestUtils.cloneOptions( requestOptions );
			this.addAuthentication( localOptions );
			RequestUtils.setAcceptHeader( "application/ld+json", localOptions );
			RequestUtils.setPreferredInteractionModel( LDP.RDFSource, localOptions );
			localOptions.ensureLatest = true;

			return RequestService
				.get( metadataURI, localOptions, new JSONLDParser() )
				.catch( this.context.registry._parseErrorFromResponse )
				;
		} ).then( ( [ rdfData, response ] ) => {
			const accessor:AuthenticatedUserInformationAccessor = this._parseRDFMetadata( rdfData, response, requestOptions );

			this._authenticatedUser = accessor
				.authenticatedUserMetadata
				.user;

			return User
				.decorate( this._authenticatedUser );
		} );
	}

	protected abstract _getHeaderValue():string;

	protected _parseRDFMetadata( rdfData:object[], response:Response, requestOptions?:GETOptions ):AuthenticatedUserInformationAccessor {
		const metadataURI:string = this.context._resolvePath( "users.me" );

		const metadataRDFs:RDFDocument[] = RDFDocument
			.getDocuments( rdfData )
			.filter( rdfDocument => rdfDocument[ "@id" ] === metadataURI );

		if( metadataRDFs.length !== 1 ) throw new BadResponseError( "No correct cs:UserMetadata was returned.", response );

		const document:AuthenticatedUserInformationAccessor = new JSONLDCompacter( this.context.registry )
			.compactDocument<AuthenticatedUserInformationAccessor>( metadataRDFs[ 0 ] );

		document._eTag = response.getETag();
		document._resolved = true;

		return document;
	}

}

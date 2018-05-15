import { CarbonLDP } from "../CarbonLDP";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP";
import * as Utils from "../Utils";
import { AbstractAuthenticator } from "./AbstractAuthenticator";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicAuthenticator } from "./BasicAuthenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
import { TokenAuthenticator } from "./TokenAuthenticator";
import {
	TokenCredentials,
	TokenCredentialsBase,
} from "./TokenCredentials";
import { User } from "./User";
import { UsersEndpoint } from "./UsersEndpoint";

export class AuthService implements Authenticator<TokenCredentials> {
	public readonly users:UsersEndpoint;

	protected readonly context:CarbonLDP;
	protected readonly authenticators:{ [P in AuthMethod]:AbstractAuthenticator<any, any> };
	protected authenticator:Authenticator<any>;

	protected _authenticatedUser?:User;
	public get authenticatedUser():User | null {
		if( this._authenticatedUser ) return this._authenticatedUser;
		return null;
	}

	constructor( context:CarbonLDP ) {
		this.context = context;

		const usersIRI:string = context._resolvePath( "users" );
		this.users = UsersEndpoint
			.decorate( context.registry.getPointer( usersIRI ) );

		this.authenticators = {
			[ AuthMethod.BASIC ]: new BasicAuthenticator( this.context ),
			[ AuthMethod.TOKEN ]: new TokenAuthenticator( this.context ),
		};
	}

	isAuthenticated():boolean {
		if( ! this.authenticator ) return false;
		return this.authenticator.isAuthenticated();
	}

	authenticate( username:string, password:string ):Promise<TokenCredentials> {
		return this.authenticateUsing( AuthMethod.TOKEN, username, password );
	}

	authenticateUsing( method:AuthMethod.BASIC, username:string, password:string ):Promise<BasicCredentials>;
	authenticateUsing( method:AuthMethod.TOKEN, username:string, password:string ):Promise<TokenCredentials>;
	authenticateUsing( method:AuthMethod.TOKEN, token:TokenCredentialsBase ):Promise<TokenCredentials>;
	authenticateUsing( method:AuthMethod, userOrCredentials:string | TokenCredentialsBase, password?:string ):Promise<BasicCredentials | TokenCredentials> {
		this.clearAuthentication();

		const authenticator:AbstractAuthenticator<any, any> = this.authenticators[ method ];
		if( ! authenticator ) return Promise.reject( new IllegalArgumentError( `Invalid authentication method "${method}".` ) );


		const authenticationToken:BasicToken | TokenCredentialsBase | null = this
			._getAuthenticationToken( userOrCredentials, password );
		if( ! authenticationToken )
			return Promise.reject( new IllegalArgumentError( "Invalid authentication token." ) );


		let credentials:BasicCredentials | TokenCredentials;
		return authenticator
			.authenticate( authenticationToken )
			.then( ( _credentials ) => {
				credentials = _credentials;

				return authenticator
					.getAuthenticatedUser();
			} ).then( ( persistedUser:User ) => {
				this._authenticatedUser = persistedUser;
				this.authenticator = authenticator;

				return credentials;
			} );
	}

	addAuthentication( requestOptions:RequestOptions ):RequestOptions {
		if( ! this.isAuthenticated() ) return;
		return this.authenticator.addAuthentication( requestOptions );
	}

	clearAuthentication():void {
		if( ! this.authenticator ) return;

		this.authenticator.clearAuthentication();
		this.authenticator = null;
		this._authenticatedUser = null;
	}


	private _getAuthenticationToken( userOrCredentials:string | TokenCredentialsBase, password?:string ):BasicToken | TokenCredentialsBase | null {
		if( Utils.isString( userOrCredentials ) )
			return new BasicToken( userOrCredentials, password );

		if( TokenCredentialsBase.is( userOrCredentials ) )
			return userOrCredentials;

		return null;
	}
}

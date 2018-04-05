import { Context } from "../Context";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP";
import * as Utils from "../Utils";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicAuthenticator } from "./BasicAuthenticator";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";
import * as Users from "./Users";

export class AuthService {
	public users:Users.Class;
	public roles:Roles.Class;

	protected _authenticatedUser:PersistedUser.Class;

	private readonly context:Context;
	private readonly authenticators:{ [P in AuthMethod]:Authenticator<object, object> };
	private authenticator:Authenticator<object, object>;

	public get authenticatedUser():PersistedUser.Class {
		if( this._authenticatedUser ) return this._authenticatedUser;
		if( this.context.parentContext ) return this.context.parentContext.auth.authenticatedUser;

		return null;
	}

	constructor( context:Context ) {
		this.roles = new Roles.Class( this.context );
		this.users = new Users.Class( this.context );

		this.context = context;

		this.authenticators = {
			[ AuthMethod.BASIC ]: new BasicAuthenticator( this.context ),
			[ AuthMethod.TOKEN ]: new TokenAuthenticator( this.context ),
		};
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			(this.authenticator && this.authenticator.isAuthenticated()) ||
			(askParent && ! ! this.context.parentContext && ! ! this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated())
		);
	}

	authenticate( username:string, password:string ):Promise<TokenCredentials.Class> {
		return this.authenticateUsing( AuthMethod.TOKEN, username, password );
	}

	authenticateUsing( method:AuthMethod.BASIC, username:string, password:string ):Promise<UsernameAndPasswordCredentials>;
	authenticateUsing( method:AuthMethod.TOKEN, username:string, password:string ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:AuthMethod.TOKEN, token:TokenCredentials.Class ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:AuthMethod, userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<UsernameAndPasswordCredentials | TokenCredentials.Class> {
		switch( method ) {
			case AuthMethod.BASIC:
				return this.authenticateWithBasic( userOrCredentials as string, password );
			case AuthMethod.TOKEN:
				return this.authenticateWithToken( userOrCredentials, password );
			default:
				return Promise.reject( new Errors.IllegalArgumentError( `No exists the authentication method '${method}'` ) );
		}
	}

	addAuthentication( requestOptions:RequestOptions ):void {
		if( this.isAuthenticated( false ) ) {
			this.authenticator.addAuthentication( requestOptions );
		} else if( ! ! this.context.parentContext && ! ! this.context.parentContext.auth ) {
			this.context.parentContext.auth.addAuthentication( requestOptions );
		} else {
			console.warn( "There is no authentication to add to the request." );
		}
	}

	clearAuthentication():void {
		if( ! this.authenticator ) return;

		this.authenticator.clearAuthentication();
		this.authenticator = null;
		this._authenticatedUser = null;
	}

	private authenticateWithBasic( username:string, password:string ):Promise<UsernameAndPasswordCredentials> {
		const authenticator:BasicAuthenticator = <BasicAuthenticator> this.authenticators[ AuthMethod.BASIC ];
		const authenticationToken:UsernameAndPasswordToken = new UsernameAndPasswordToken( username, password );

		this.clearAuthentication();

		let newCredentials:UsernameAndPasswordCredentials;
		return authenticator.authenticate( authenticationToken ).then( ( credentials:UsernameAndPasswordCredentials ) => {
			newCredentials = credentials;

			return this.getAuthenticatedUser( authenticator );
		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			this.authenticator = authenticator;

			return newCredentials;
		} );
	}

	private authenticateWithToken( userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<TokenCredentials.Class> {
		const authenticator:TokenAuthenticator = <TokenAuthenticator> this.authenticators[ AuthMethod.TOKEN ];
		const tokenOrCredentials:UsernameAndPasswordToken | TokenCredentials.Class | Error = Utils.isString( userOrCredentials ) ?
			new UsernameAndPasswordToken( userOrCredentials, password ) :
			TokenCredentials.Factory.hasClassProperties( userOrCredentials ) ?
				userOrCredentials :
				new Errors.IllegalArgumentError( "The token provided in not valid." );

		if( tokenOrCredentials instanceof Error ) return Promise.reject( tokenOrCredentials );
		this.clearAuthentication();

		let newCredentials:TokenCredentials.Class;
		return authenticator.authenticate( tokenOrCredentials ).then( ( credentials:TokenCredentials.Class ) => {
			newCredentials = credentials;

			if( PersistedUser.Factory.is( credentials.user ) ) return credentials.user;
			return this.getAuthenticatedUser( authenticator );
		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			this.authenticator = authenticator;

			newCredentials.user = persistedUser;
			return newCredentials;
		} );
	}

	private getAuthenticatedUser( authenticator:Authenticator<object, object> ):Promise<PersistedUser.Class> {
		const requestOptions:RequestOptions = {};
		authenticator.addAuthentication( requestOptions );

		// TODO: Missing implementation in platform (Remove, and enable tests)
		return Promise.resolve( null );

		return this.context.documents
			.get<PersistedUser.Class>( "users/me/", requestOptions )
			.then( ( [ persistedUser ]:[ PersistedUser.Class, Response ] ) => persistedUser );
	}

}

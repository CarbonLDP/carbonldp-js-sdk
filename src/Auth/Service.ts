import { Context } from "../Context";
import * as Errors from "../Errors";
import { RequestOptions } from "../HTTP";
import * as Utils from "../Utils";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicAuthenticator } from "./BasicAuthenticator";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";
import { TokenAuthenticator } from "./TokenAuthenticator";
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
		this.clearAuthentication();

		const authenticator:Authenticator<any, any> = this.authenticators[ method ];
		if( ! authenticator ) return Promise.reject( new Errors.IllegalArgumentError( `Invalid authentication method "${method}".` ) );

		let authenticationToken:UsernameAndPasswordToken | TokenCredentials.Class;
		if( Utils.isString( userOrCredentials ) )
			authenticationToken = new UsernameAndPasswordToken( userOrCredentials, password );
		else if( TokenCredentials.Factory.hasClassProperties( userOrCredentials ) ) {
			authenticationToken = userOrCredentials;
		} else {
			return Promise.reject( new Errors.IllegalArgumentError( "Invalid authentication token." ) );
		}

		let credentials:UsernameAndPasswordCredentials | TokenCredentials.Class;
		return authenticator
			.authenticate( authenticationToken )
			.then( ( _credentials ) => {
				credentials = _credentials;

				return authenticator
					.getAuthenticatedUser();
			} ).then( ( persistedUser:PersistedUser.Class ) => {
				this._authenticatedUser = persistedUser;
				this.authenticator = authenticator;

				return credentials;
			} );
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

}

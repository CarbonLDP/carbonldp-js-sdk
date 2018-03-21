import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as Auth from "./";

import { ACE } from "./ACE";
import { ACL } from "./ACL";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicAuthenticator } from "./BasicAuthenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
import { CredentialsSet } from "./CredentialsSet";
import { LDAPCredentials } from "./LDAPCredentials";
import { PersistedACE } from "./PersistedACE";
import { PersistedACL } from "./PersistedACL";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Roles from "./Roles";
import { AuthService } from "./Service";
import * as Ticket from "./Ticket";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import { User } from "./User";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import * as Users from "./Users";

describe( module( "carbonldp/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( Auth ).toBeDefined();
		expect( Utils.isObject( Auth ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"ACE",
		"CarbonLDP.Auth.ACE"
	), ():void => {
		expect( Auth.ACE ).toBeDefined();
		expect( Auth.ACE ).toBe( ACE );
	} );

	it( reexports(
		STATIC,
		"ACL",
		"CarbonLDP.Auth.ACL"
	), ():void => {
		expect( Auth.ACL ).toBeDefined();
		expect( Auth.ACL ).toBe( ACL );
	} );

	it( reexports(
		STATIC,
		"User",
		"carbonldp/Auth/User"
	), ():void => {
		expect( Auth.User ).toBeDefined();
		expect( Auth.User ).toBe( User );
	} );

	it( reexports(
		STATIC,
		"Users",
		"carbonldp/Auth/Users"
	), ():void => {
		expect( Auth.Users ).toBeDefined();
		expect( Auth.Users ).toBe( Users );
	} );

	it( reexports(
		STATIC,
		"Authenticator",
		"CarbonLDP.Auth.Authenticator"
	), ():void => {
		expect( Auth.Authenticator ).toBeDefined();
		expect( Auth.Authenticator ).toBe( Authenticator );
	} );

	it( reexports(
		STATIC,
		"AuthMethod",
		"CarbonLDP.Auth.AuthMethod"
	), ():void => {
		expect( Auth.AuthMethod ).toBeDefined();
		expect( Auth.AuthMethod ).toBe( AuthMethod );
	} );

	it( reexports(
		STATIC,
		"AuthService",
		"CarbonLDP.Auth.AuthService"
	), ():void => {
		expect( Auth.AuthService ).toBeDefined();
		expect( Auth.AuthService ).toBe( AuthService );
	} );

	it( reexports(
		STATIC,
		"BasicAuthenticator",
		"CarbonLDP.Auth.BasicAuthenticator"
	), ():void => {
		expect( Auth.BasicAuthenticator ).toBeDefined();
		expect( Auth.BasicAuthenticator ).toBe( BasicAuthenticator );
	} );

	it( reexports(
		STATIC,
		"BasicCredentials",
		"CarbonLDP.Auth.BasicCredentials"
	), ():void => {
		expect( Auth.BasicCredentials ).toBeDefined();
		expect( Auth.BasicCredentials ).toBe( BasicCredentials );
	} );

	it( reexports(
		STATIC,
		"BasicToken",
		"CarbonLDP.Auth.BasicToken"
	), ():void => {
		expect( Auth.BasicToken ).toBeDefined();
		expect( Auth.BasicToken ).toBe( BasicToken );
	} );

	it( reexports(
		STATIC,
		"CredentialsSet",
		"CarbonLDP.Auth.CredentialsSet"
	), ():void => {
		expect( Auth.CredentialsSet ).toBeDefined();
		expect( Auth.CredentialsSet ).toBe( CredentialsSet );
	} );

	it( reexports(
		STATIC,
		"LDAPCredentials",
		"CarbonLDP.Auth.LDAPCredentials"
	), ():void => {
		expect( Auth.LDAPCredentials ).toBeDefined();
		expect( Auth.LDAPCredentials ).toBe( LDAPCredentials );
	} );

	it( reexports(
		STATIC,
		"PersistedACE",
		"CarbonLDP.Auth.PersistedACE"
	), ():void => {
		const target:Auth.PersistedACE = {} as PersistedACE;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"PersistedACL",
		"CarbonLDP.Auth.PersistedACL"
	), ():void => {
		expect( Auth.PersistedACL ).toBeDefined();
		expect( Auth.PersistedACL ).toBe( PersistedACL );
	} );

	it( reexports(
		STATIC,
		"PersistedUser",
		"carbonldp/Auth/PersistedUser"
	), ():void => {
		expect( Auth.PersistedUser ).toBeDefined();
		expect( Auth.PersistedUser ).toBe( PersistedUser );
	} );

	it( reexports(
		STATIC,
		"PersistedRole",
		"carbonldp/Auth/PersistedRole"
	), ():void => {
		expect( Auth.PersistedRole ).toBeDefined();
		expect( Auth.PersistedRole ).toBe( PersistedRole );
	} );

	it( reexports(
		STATIC,
		"Role",
		"carbonldp/Auth/Role"
	), ():void => {
		expect( Auth.Role ).toBeDefined();
		expect( Auth.Role ).toBe( Role );
	} );

	it( reexports(
		STATIC,
		"Roles",
		"carbonldp/Auth/Roles"
	), ():void => {
		expect( Auth.Roles ).toBeDefined();
		expect( Auth.Roles ).toBe( Roles );
	} );

	it( reexports(
		STATIC,
		"Ticket",
		"carbonldp/Auth/Ticket"
	), ():void => {
		expect( Auth.Ticket ).toBeDefined();
		expect( Auth.Ticket ).toBe( Ticket );
	} );

	it( reexports(
		STATIC,
		"TokenCredentials",
		"carbonldp/Auth/TokenCredentials"
	), ():void => {
		expect( Auth.TokenCredentials ).toBeDefined();
		expect( Auth.TokenCredentials ).toBe( TokenCredentials );
	} );

	it( reexports(
		STATIC,
		"TokenAuthenticator",
		"carbonldp/Auth/TokenAuthenticator"
	), ():void => {
		expect( Auth.TokenAuthenticator ).toBeDefined();
		expect( Auth.TokenAuthenticator ).toBe( TokenAuthenticator );
	} );

	it( reexports(
		STATIC,
		"UsernameAndPasswordCredentials",
		"CarbonLDP.Auth.UsernameAndPasswordCredentials"
	), ():void => {
		expect( Auth.UsernameAndPasswordCredentials ).toBeDefined();
		expect( Auth.UsernameAndPasswordCredentials ).toBe( UsernameAndPasswordCredentials );
	} );

} )
;

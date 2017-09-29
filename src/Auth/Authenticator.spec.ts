import {
	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasMethod,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as Authenticator from "./Authenticator";
import DefaultExport from "./Authenticator";

describe( module( "Carbon/Auth/Authenticator" ), ():void => {

	it( isDefined(), ():void => {
		expect( Authenticator ).toBeDefined();
		expect( Utils.isObject( Authenticator ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.Authenticator.Class", [
			"T extends Carbon.Auth.AuthenticationToken.Class",
		],
		"Interface that represents the base of an authentication token."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isAuthenticated",
			"Returns if its authenticated by checking the stored credentials within.",
			{ type: "boolean", description: "Boolean that indicates if the authenticator is authenticated or not." }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"authenticate",
			[ "T extends Object", "W extends Object" ],
			"Performs an authentication and stores the credentials for future use.", [
				{ name: "authenticationToken", type: "T", description: "The token that will be used to perform the authentication." },
			],
			{ type: "W", description: "Promise that contains the authentication credentials if the request is successful." }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"clearAuthentication",
			"Removes the stored credentials of any."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"addAuthentication",
			"If the authenticator is authenticated, it adds an authentication header in the request options object provided.", [
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", description: "The request options object where to add the authentication header." },
			],
			{ type: "Carbon.HTTP.Request.Options", description: "The request options object provided after adding the authentication header." }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Authenticator.Class" ), ():void => {
		let defaultExport:DefaultExport<Object, Object> = <any> {};
		let module:Authenticator.Class<Object, Object>;

		module = defaultExport;
		expect( module ).toEqual( jasmine.any( Object ) );
	} );

} );

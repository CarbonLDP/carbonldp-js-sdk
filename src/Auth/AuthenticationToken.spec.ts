import {
	module,
	interfaze,

	isDefined,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as AuthenticationToken from "./AuthenticationToken";
import DefaultExport from "./AuthenticationToken";

describe( module( "Carbon/Auth/AuthenticationToken" ), ():void => {

	it( isDefined(), ():void => {
		expect( AuthenticationToken ).toBeDefined();
		expect( Utils.isObject( AuthenticationToken ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.AuthenticationToken.Class",
		"Interface that represents the base of an authentication token."
	), ():void => {
	} );

	it( hasDefaultExport( "Carbon.Auth.AuthenticationToken.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let authenticationToken:AuthenticationToken.Class;

		authenticationToken = defaultExport;
		expect( authenticationToken ).toEqual( jasmine.any( Object ) );
	} );

} );

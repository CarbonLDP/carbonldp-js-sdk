import {
	module,
	interfaze,

	isDefined,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as Credentials from "./Credentials";
import DefaultExport from "./Credentials";

describe( module( "Carbon/Auth/Credentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( Credentials ).toBeDefined();
		expect( Utils.isObject( Credentials ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.Credentials.Class",
		"Interface that represents the base of a credentials object."
	), ():void => {} );

	it( hasDefaultExport( "Carbon.Auth.Credentials.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let module:Credentials.Class;

		module = defaultExport;
		expect( module ).toEqual( jasmine.any( Object ) );
	} );

} );

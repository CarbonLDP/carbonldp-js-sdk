import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import Carbon from "../Carbon";
import * as Errors from "./../Errors";
import * as Utils from "./../Utils";

import * as PlatformAuth from "./Auth";
import DefaultExport from "./Auth";

describe( module( "Carbon/Platform/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( PlatformAuth ).toBeDefined();
		expect( Utils.isObject( PlatformAuth ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Platform.Auth.Class",
		"Implementation of `Carbon.Auth.Class` abstract class, that will manage the authentication and authorization specific of a Platform Context."
	), ():void => {
		let context:Carbon;

		beforeEach( ():void => {
			context = new Carbon();
		} );

		it( isDefined(), ():void => {
			expect( PlatformAuth.Class ).toBeDefined();
			expect( Utils.isFunction( PlatformAuth.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "context", type: "Carbon.Platform.Context"},
		] ), ():void => {
			let auth:PlatformAuth.Class = new PlatformAuth.Class( context );

			expect( auth ).toBeTruthy();
			expect( auth instanceof PlatformAuth.Class ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"roles",
			"Carbon.Platform.Roles.Class",
			"Instance of `Carbon.Platform.Roles.Class`, for managing the roles of the current context."
		), ():void => {
			let auth:PlatformAuth.Class = new PlatformAuth.Class( context );

			expect( () => auth.roles ).toThrowError( Errors.NotImplementedError );
		} );

	} );

	it( hasDefaultExport( "Carbon.Platform.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( PlatformAuth.Class );
	} );

} );

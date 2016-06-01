import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	enumeration,
	method,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasDefaultExport,
	reexports,
	hasEnumeral,
	hasSignature
} from "./../test/JasmineExtender";
import AbstractContext from "./../AbstractContext";
import AppContext from "./Context";
import * as Errors from "./../Errors";
import PersistedApp from "./../PersistedApp";
import * as Utils from "./../Utils"

import * as AppRole from "./Role";
import * as AppRoles from "./Roles";

import * as AppAuth from "./Auth";
import DefaultExport from "./Auth";

describe( module( "Carbon/App/Auth" ), ():void => {

	it( isDefined(), ():void => {
		expect( AppAuth ).toBeDefined();
		expect( Utils.isObject( AppAuth ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.App.Auth.Class",
		"Implementation of `Carbon.Auth.Class` abstract class, that will manage the authentication and authorization specific of a Application Context."
	), ():void => {
		let parentContext:AbstractContext;
		let context:AppContext;

		beforeEach( ():void => {
			let app:PersistedApp = <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/"
				}
			};
			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return uri;
				}
			}

			parentContext = new MockedContext();
			context = new AppContext( parentContext, app );
		});

		it( isDefined(), ():void => {
			expect( AppAuth.Class ).toBeDefined();
			expect( Utils.isFunction( AppAuth.Class ) ).toBe( true );
		});

		it( hasConstructor( [
			{ name: "appContext", type: "Carbon.App.Context" }
		] ), ():void => {
			let auth = new AppAuth.Class( context );

			expect( auth ).toBeTruthy();
			expect( auth instanceof AppAuth.Class ).toBe( true );
		});

		it( hasProperty(
			INSTANCE,
			"roles",
			"Carbon.App.Roles.Class",
			"Instance of `Carbon.App.Roles.Class`, for managing the roles of the current context."
		), ():void => {
			let auth = new AppAuth.Class( context );

			expect( auth.roles ).toBeDefined();
			expect( auth.roles instanceof AppRoles.Class ).toBe( true );
		});

	});

	it( hasDefaultExport( "Carbon.App.Auth.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AppAuth.Class );
	});

});
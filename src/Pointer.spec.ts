import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty,
	decoratedObject,
} from "./test/JasmineExtender";
import Documents from "./Documents";
import * as Utils from "./Utils";
import NotImplementedError from "./HTTP/Errors/server/NotImplementedError";

import * as Pointer from "./Pointer";

describe( module( "Carbon/Pointer" ), ():void => {

	it( isDefined(), ():void => {
		expect( Pointer ).toBeDefined();
		expect( Utils.isObject( Pointer ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Pointer.Factory",
		"Factory class for Pointer objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Pointer.Factory ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties and functions of a Pointer object", [
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( Pointer.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.hasClassProperties ) ).toBe( true );

			let pointer:any = undefined;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );

			pointer = {
				_id: null,
				_resolved: null,
				id: null,
				isResolved: ():void => {},
				resolve: ():void => {},
			};
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );

			delete pointer._id;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer._id = null;

			delete pointer._resolved;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer._resolved = null;

			delete pointer.id;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer.id = null;

			delete pointer.isResolved;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer.isResolved = ():void => {};

			delete pointer.resolve;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer.resolve = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the value provided is a Pinter object.", [
				{name: "value", type: "any"},
			],
			{type: "boolean"}
		), ():void => {
			expect( Pointer.Factory.is ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.is ) ).toBe( true );

			expect( Pointer.Factory.is( undefined ) ).toBe( false );
			expect( Pointer.Factory.is( null ) ).toBe( false );
			expect( Pointer.Factory.is( "a string" ) ).toBe( false );
			expect( Pointer.Factory.is( 100 ) ).toBe( false );
			expect( Pointer.Factory.is( {} ) ).toBe( false );

			let value:any = {};
			value[ "_id" ] = null;
			value[ "_resolved" ] = null;
			value[ "id" ] = null;
			value[ "isResolved" ] = ():void => {};
			value[ "resolve" ] = ():void => {};
			expect( Pointer.Factory.is( value ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a Pointer object with id if provided.", [
				{name: "id", type: "string", optional: true},
			],
			{type: "Carbon.Pointer.Class"}
		), ():void => {
			expect( Pointer.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.create ) ).toBe( true );

			let pointer:Pointer.Class;

			pointer = Pointer.Factory.create();
			expect( pointer ).toBeTruthy();
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "" );

			pointer = Pointer.Factory.create( "http://example.com/pointer/" );
			expect( pointer ).toBeTruthy();
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/pointer/" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Create a Pointer from the object provided with id if provided.", [
				{name: "object", type: "T"},
				{name: "id", type: "string", optional: true},
			],
			{type: "T & Carbon.Pointer.Class"}
		), ():void => {
			expect( Pointer.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.createFrom ) ).toBe( true );

			interface MyInterface {
				myProperty?:string;
			}
			let pointer:Pointer.Class & MyInterface;

			pointer = Pointer.Factory.createFrom<MyInterface>( {} );
			expect( pointer ).toBeTruthy();
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "" );
			expect( pointer.myProperty ).not.toBeDefined();

			pointer = Pointer.Factory.createFrom( {myProperty: "My Property"}, "http://example.com/pointer/" );
			expect( pointer ).toBeTruthy();
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.com/pointer/" );
			expect( pointer.myProperty ).toBe( "My Property" );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the elements of a Pointer object.", [
				{name: "object", type: "T"},
			],
			{type: "T & Carbon.Pointer.Class"}
		), ():void => {
			expect( Pointer.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.decorate ) ).toBe( true );

			interface MyResource {
				myProperty?:string;
			}
			let pointer:Pointer.Class & MyResource;

			pointer = Pointer.Factory.decorate<MyResource>( {} );
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );

			pointer = Pointer.Factory.decorate<MyResource>( {myProperty: "a property"} );
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( true );
			expect( pointer.myProperty ).toBeDefined();
			expect( pointer.myProperty ).toBe( "a property" );
			expect( pointer.isResolved() ).toBe( false );


			pointer._resolved = true;
			pointer = Pointer.Factory.decorate<MyResource>( pointer );
			expect( pointer.isResolved() ).toBe( true );
		} );

		describe( decoratedObject(
			"Object decorated by the Carbon.Pointer.Factory.decorate function.", [
				"Carbon.Pointer.Class",
			]
		), ():void => {
			let pointer:Pointer.Class;

			beforeEach( ():void => {
				pointer = Pointer.Factory.create( "http://example.com/pointer/" );
			} );

			it( hasProperty(
				INSTANCE,
				"_id",
				"string",
				"URI that identifies the pointer."
			), ():void => {
				expect( pointer._id ).toBeDefined();
				expect( Utils.isString( pointer._id ) ).toBe( true );

				expect( pointer._id ).toBe( "http://example.com/pointer/" );
			} );

			it( hasProperty(
				INSTANCE,
				"_resolved",
				"boolean",
				"Flag variable that indicate if the pointer has been resolved."
			), ():void => {
				expect( pointer._resolved ).toBeDefined();
				expect( Utils.isBoolean( pointer._resolved ) ).toBe( true );

				expect( pointer._resolved ).toBe( false );
			} );

			it( hasProperty(
				INSTANCE,
				"id",
				"string",
				"Accessor for the _id variable."
			), ():void => {
				expect( pointer.id ).toBeDefined();
				expect( Utils.isString( pointer.id ) ).toBe( true );

				expect( pointer.id ).toBe( pointer._id );

				pointer.id = "http://example.com/pointer/change/";
				expect( pointer._id ).toBe( "http://example.com/pointer/change/" );
			} );

			it( hasMethod(
				INSTANCE,
				"isResolved",
				"Returns true if the pointer has been resolved. It checks the `_resolved` property.",
				{type: "boolean"}
			), ():void => {
				expect( pointer.isResolved ).toBeDefined();
				expect( Utils.isFunction( pointer.isResolved ) ).toBe( true );

				expect( pointer.isResolved() ).toBe( false );

				pointer._resolved = true;
				expect( pointer.isResolved() ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"resolve",
				[ "T" ],
				"Resolve the pointer. This function throw an Error, it should be reimplemented for the respective type of pointer.",
				{type: "Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( pointer.resolve ).toBeDefined();
				expect( Utils.isFunction( pointer.resolve ) ).toBe( true );

				let promise:Promise<any> = pointer.resolve();
				expect( promise instanceof Promise ).toBe( true );

				promise.then( done.fail, ( error:NotImplementedError ):void => {
					expect( error.name ).toBe( "NotImplementedError" );
					done();
				} );
			} );

		} );

	} );

	describe( clazz( "Carbon.Pointer.Util", "Class with useful methods when working with `Carbon.Pointer.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( Pointer.Util ).toBeDefined();
			expect( Utils.isFunction( Pointer.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"areEqual",
			"Returns true if both pointers refers to the same resource.", [
				{name: "pointer1", type: "Carbon.Pointer.Class"},
				{name: "pointer2", type: "Carbon.Pointer.Class"},
			],
			{type: "boolean"}
		), ():void => {
			expect( Pointer.Util.areEqual ).toBeDefined();
			expect( Utils.isFunction( Pointer.Util.areEqual ) ).toBe( true );

			let pointer:Pointer.Class;
			let another:Pointer.Class;

			pointer = Pointer.Factory.create( "http://example.com/some/id" );
			another = Pointer.Factory.create( "http://example.com/some/id" );
			expect( pointer ).not.toBe( another );
			expect( Pointer.Util.areEqual( pointer, another ) ).toBe( true );

			another = Pointer.Factory.create( "http://example.com/another/id" );
			expect( pointer ).not.toBe( another );
			expect( Pointer.Util.areEqual( pointer, another ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"getIDs",
			"Returns an array of string with the IDs of every pointer in the array of pointers provided.", [
				{name: "pointers", type: "Carbon.Pointer.Class[]", description: "The array of pointers to obtains theirs IDs."},
			],
			{type: "string[]"}
		), ():void => {
			expect( Pointer.Util.getIDs ).toBeDefined();
			expect( Utils.isFunction( Pointer.Util.getIDs ) ).toBe( true );

			let pointers:Pointer.Class[];
			let ids:string[];

			pointers = [ Pointer.Factory.create( "http://example.com/some/id/" ), Pointer.Factory.create( "http://example.com/another/id/" ), Pointer.Factory.create( "http://example.com/random/id/1234567890/" ) ];
			ids = Pointer.Util.getIDs( pointers );
			expect( ids.length ).toBe( 3 );
			expect( ids ).toContain( "http://example.com/some/id/" );
			expect( ids ).toContain( "http://example.com/another/id/" );
			expect( ids ).toContain( "http://example.com/random/id/1234567890/" );
		} );

		it( hasMethod(
			STATIC,
			"resolveAll",
			"Resolve all the pointers of the array of pointers provided.", [
				{name: "pointers", type: "Carbon.Pointer.Class[]", description: "The array of pointers to be resolved"},
			],
			{type: "[ Carbon.Pointers.Class[], Carbon.HTTP.Response.Class[] ]"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( Pointer.Util.resolveAll ).toBeDefined();
			expect( Utils.isFunction( Pointer.Util.resolveAll ) ).toBe( true );

			let documents:Documents = new Documents();
			let pointers:Pointer.Class[];

			pointers = [ documents.getPointer( "http://example.com/some/id/" ), documents.getPointer( "http://example.com/another/id/" ), documents.getPointer( "http://example.com/random/id/1234567890/" ) ];
			spyOn( documents, "get" ).and.returnValue( Promise.resolve( [ Pointer.Factory.create( "http://example.com/resolved/pointer/" ), null ] ) );

			let promise:Promise<[ Pointer.Class[], any[] ]> = Pointer.Util.resolveAll( pointers );
			expect( promise instanceof Promise ).toBe( true );

			promise.then( ( [ _pointers, responses ]:[ Pointer.Class[], any[] ] ) => {
				expect( _pointers.length ).toBe( 3 );
				expect( responses.length ).toBe( 3 );

				expect( _pointers[ 0 ].id ).toBe( "http://example.com/resolved/pointer/" );
				expect( _pointers[ 1 ].id ).toBe( "http://example.com/resolved/pointer/" );
				expect( _pointers[ 2 ].id ).toBe( "http://example.com/resolved/pointer/" );

				expect( responses[ 0 ] ).toBeNull();
				expect( responses[ 1 ] ).toBeNull();
				expect( responses[ 2 ] ).toBeNull();

				done();
			} ).catch( done.fail );
		} );

	} );

} );

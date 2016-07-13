import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasProperty,
	decoratedObject
} from "./test/JasmineExtender";
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
				{name: "resource", type: "Object"}
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
				isResolved: () => {},
				resolve: () => {},
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
			pointer.isResolved = () => null;

			delete pointer.resolve;
			expect( Pointer.Factory.hasClassProperties( pointer ) ).toBe( false );
			pointer.resolve = () => null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the value provided is a Pinter object.", [
				{name: "value", type: "any"}
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

			let value = {};
			value[ "_id" ] = null;
			value[ "_resolved" ] = null;
			value[ "id" ] = null;
			value[ "isResolved" ] = () => null;
			value[ "resolve" ] = () => null;
			expect( Pointer.Factory.is( value ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a Pointer object with id if provided.", [
				{name: "id", type: "string", optional: true}
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
			"decorate",
			"Decorates the object provided with the elements of a Pointer object.", [
				{name: "object", type: "T extends Object"}
			],
			{type: "T & Carbon.Pointer.Class"}
		), ():void => {
			expect( Pointer.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( Pointer.Factory.decorate ) ).toBe( true );


			interface MyResource {
				myProperty?:string
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
				"Carbon.Pointer.Class"
			]
		), ():void => {
			let pointer:Pointer.Class;

			beforeEach( ():void => {
				pointer = Pointer.Factory.create( "http://example.com/pointer/" )
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
				"Resolve the pointer. This function throw an Error, it should be reimplemented for the respective type of pointer."
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

} );
import * as NS from "../NS";
import * as Pointer from "../Pointer";
import * as Resource from "../Resource";
import { clazz, extendsClass, hasDefaultExport, hasProperty, hasSignature, interfaze, isDefined, method, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as Message from "./Message";
import DefaultExport from "./Message";

describe( module( "Carbon/Messaging/Message" ), ():void => {

	it( isDefined(), ():void => {
		expect( Message ).toBeDefined();
		expect( Message ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Message.SCHEMA ).toBeDefined();
		expect( Message.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( Message.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
		} );

		expect( Message.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.Predicate.target,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.Message.Class",
		"Interface with the base properties of the data received in a subscription event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:Message.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as Message.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:Message.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );

	describe( clazz(
		"Carbon.Messaging.Message.Factory",
		"Factory class for `Carbon.Messaging.Message.Class` objects."
	), ():void => {

		it( "should exists", ():void => {
			expect( Message.Factory ).toBeDefined();
			expect( Message.Factory ).toEqual( jasmine.any( Function ) );
		} );

		describe( method(
			STATIC,
			"hasClassProperties"
		), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the specific properties of the `Carbon.Messaging.Message.Class` interface.",
				[
					{ name: "object", type: "object", description: "The object to be tested." },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Message.Factory.hasClassProperties ).toBeDefined();
				expect( Message.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false if falsy is provided", ():void => {
				expect( Message.Factory.hasClassProperties( void 0 ) ).toBe( false );
				expect( Message.Factory.hasClassProperties( null ) ).toBe( false );
			} );

			it( "should return false if has a missing class property", ():void => {
				const object:Partial<Message.Class> = {
					target: null,
				};

				expect( Message.Factory.hasClassProperties( object ) ).toBe( true );

				delete object.target;
				expect( Message.Factory.hasClassProperties( object ) ).toBe( false );
				object.target = null;
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.Message.Class" ), ():void => {
		const target:Message.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

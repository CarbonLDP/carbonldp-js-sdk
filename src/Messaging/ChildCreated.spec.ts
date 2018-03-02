import { Pointer } from "../Pointer";
import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";

import { ChildCreated } from "./ChildCreated";
import DefaultExport from "./ChildCreated";

import { DocumentCreated } from "./DocumentCreated";

describe( module( "Carbon/Messaging/ChildCreated" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.ChildCreated.ChildCreated",
		"Interface with the properties of the data received in a child created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:ChildCreated = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.DocumentCreated.DocumentCreated" ), ():void => {
			const target:DocumentCreated = {} as ChildCreated;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:ChildCreated[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.ChildCreated.ChildCreatedFactory",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.ChildCreated.ChildCreated` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ChildCreated",
		"Carbon.Messaging.ChildCreated.ChildCreatedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( ChildCreated ).toBeDefined();
			expect( ChildCreated ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ChildCreated.TYPE", ():void => {
			expect( ChildCreated.TYPE ).toBeDefined();
			expect( ChildCreated.TYPE ).toEqual( jasmine.any( String ) );

			expect( ChildCreated.TYPE ).toBe( C.ChildCreated );
		} );

		// TODO: Separate in different tests
		it( "ChildCreated.SCHEMA", ():void => {
			expect( ChildCreated.SCHEMA ).toBeDefined();
			expect( ChildCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( ChildCreated.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( ChildCreated.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( ChildCreated.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.ChildCreated.ChildCreated" ), ():void => {
		const target:ChildCreated = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

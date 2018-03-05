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

import DefaultExport, { AccessPointCreated } from "./AccessPointCreated";
import { DocumentCreated } from "./DocumentCreated";

describe( module( "Carbon/Messaging/AccessPointCreated" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.AccessPointCreated.AccessPointCreated",
		"Interface with the properties of the data received in a access point created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:AccessPointCreated = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.DocumentCreated.DocumentCreated" ), ():void => {
			const target:DocumentCreated = {} as AccessPointCreated;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:AccessPointCreated[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.AccessPointCreated.AccessPointCreatedConstant",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.AccessPointCreated.AccessPointCreated` objects."
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
		"AccessPointCreated",
		"Carbon.Messaging.AccessPointCreated.AccessPointCreatedConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AccessPointCreated ).toBeDefined();
			expect( AccessPointCreated ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "AccessPointCreates.TYPE", ():void => {
			expect( AccessPointCreated.TYPE ).toBeDefined();
			expect( AccessPointCreated.TYPE ).toEqual( jasmine.any( String ) );

			expect( AccessPointCreated.TYPE ).toBe( C.AccessPointCreated );
		} );

		// TODO: Separate in different tests
		it( "AccessPointCreated.SCHEMA", ():void => {
			expect( AccessPointCreated.SCHEMA ).toBeDefined();
			expect( AccessPointCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( AccessPointCreated.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( AccessPointCreated.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( AccessPointCreated.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.AccessPointCreated.AccessPointCreated" ), ():void => {
		const target:AccessPointCreated = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

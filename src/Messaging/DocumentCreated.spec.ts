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

import DefaultExport, { DocumentCreated } from "./DocumentCreated";

import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { EventMessage } from "./EventMessage";

describe( module( "Carbon/Messaging/DocumentCreated" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.DocumentCreated.DocumentCreated",
		"Interface with the base properties of the data received in any document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreated = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentCreated;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:DocumentCreated[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetails"
		), ():void => {
			const target:DocumentCreated[ "details" ] = {} as DocumentCreatedDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentCreated.DocumentCreatedFactory",
		"Interface with the factory, decorate and utils elements for `Carbon.Messaging.DocumentCreated.DocumentCreated` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentCreated",
		"Carbon.Messaging.DocumentCreated.DocumentCreatedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentCreated ).toBeDefined();
			expect( DocumentCreated ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreated.SCHEMA", ():void => {
			expect( DocumentCreated.SCHEMA ).toBeDefined();
			expect( DocumentCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentCreated.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( DocumentCreated.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( DocumentCreated.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentCreated.DocumentCreated" ), ():void => {
		const target:DocumentCreated = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

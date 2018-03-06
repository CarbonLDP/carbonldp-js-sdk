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

import DefaultExport, { DocumentDeleted } from "./DocumentDeleted";

import { EventMessage } from "./EventMessage";

describe( module( "Carbon/Messaging/DocumentDeleted" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.DocumentDeleted.DocumentDeleted",
		"Interface with the properties of the data received in a document deleted event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentDeleted = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentDeleted;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:DocumentDeleted[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentDeleted.DocumentDeletedFactory",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.DocumentDeleted.DocumentDeleted` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentDeleted",
		"Carbon.Messaging.DocumentDeleted.DocumentDeletedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentDeleted ).toBeDefined();
			expect( DocumentDeleted ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeleted.TYPE", ():void => {
			expect( DocumentDeleted.TYPE ).toBeDefined();
			expect( DocumentDeleted.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentDeleted.TYPE ).toBe( C.DocumentDeleted );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeleted.SCHEMA", ():void => {
			expect( DocumentDeleted.SCHEMA ).toBeDefined();
			expect( DocumentDeleted.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentDeleted.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentDeleted.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentDeleted.DocumentDeleted" ), ():void => {
		const target:DocumentDeleted = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

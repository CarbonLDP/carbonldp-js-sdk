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

import { DocumentModified } from "./DocumentModified";
import DefaultExport from "./DocumentModified";

import { EventMessage } from "./EventMessage";

describe( module( "Carbon/Messaging/DocumentModified" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.DocumentModified.DocumentModified",
		"Interface with the properties of the data received in a document modified event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentModified = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentModified;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:DocumentModified[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentModified.DocumentModifiedConstant",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.DocumentModified.DocumentModified` objects."
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
		"DocumentModified",
		"Carbon.Messaging.DocumentModified.DocumentModifiedConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentModified ).toBeDefined();
			expect( DocumentModified ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentModified.TYPE", ():void => {
			expect( DocumentModified.TYPE ).toBeDefined();
			expect( DocumentModified.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentModified.TYPE ).toBe( C.DocumentModified );
		} );

		// TODO: Separate in different tests
		it( "DocumentModified.SCHEMA", ():void => {
			expect( DocumentModified.SCHEMA ).toBeDefined();
			expect( DocumentModified.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentModified.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentModified.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentModified.DocumentModified" ), ():void => {
		const target:DocumentModified = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

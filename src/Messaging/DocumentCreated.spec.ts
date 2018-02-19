import * as Messaging from "../Messaging";
import * as NS from "../Vocabularies/index";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as DocumentCreated from "./DocumentCreated";
import DefaultExport from "./DocumentCreated";

describe( module( "Carbon/Messaging/DocumentCreated" ), ():void => {

	it( isDefined(), ():void => {
		expect( DocumentCreated ).toBeDefined();
		expect( DocumentCreated ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( DocumentCreated.SCHEMA ).toBeDefined();
		expect( DocumentCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( DocumentCreated.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
			"details": jasmine.any( Object ),
		} );

		expect( DocumentCreated.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.target,
			"@type": "@id",
		} );

		expect( DocumentCreated.SCHEMA[ "details" ] ).toEqual( {
			"@id": NS.C.details,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentCreated.Class",
		"Interface with the base properties of the data received in any document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreated.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as DocumentCreated.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:DocumentCreated.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"Carbon.Messaging.DocumentCreatedDetails.Class"
		), ():void => {
			const target:DocumentCreated.Class[ "details" ] = {} as Messaging.DocumentCreatedDetails.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentCreated.Class" ), ():void => {
		const target:DocumentCreated.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

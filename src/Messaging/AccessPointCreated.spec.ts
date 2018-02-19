import * as Messaging from "../Messaging";
import * as NS from "../Vocabularies/index";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as AccessPointCreated from "./AccessPointCreated";
import DefaultExport from "./AccessPointCreated";

describe( module( "Carbon/Messaging/AccessPointCreated" ), ():void => {

	it( isDefined(), ():void => {
		expect( AccessPointCreated ).toBeDefined();
		expect( AccessPointCreated ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( AccessPointCreated.RDF_CLASS ).toBeDefined();
		expect( AccessPointCreated.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( AccessPointCreated.RDF_CLASS ).toBe( NS.C.AccessPointCreated );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( AccessPointCreated.SCHEMA ).toBeDefined();
		expect( AccessPointCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( AccessPointCreated.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
			"details": jasmine.any( Object ),
		} );

		expect( AccessPointCreated.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.target,
			"@type": "@id",
		} );

		expect( AccessPointCreated.SCHEMA[ "details" ] ).toEqual( {
			"@id": NS.C.details,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.AccessPointCreated.Class",
		"Interface with the properties of the data received in a access point created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:AccessPointCreated.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.DocumentCreated.Class" ), ():void => {
			const target:Messaging.DocumentCreated.Class = {} as AccessPointCreated.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:AccessPointCreated.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.AccessPointCreated.Class" ), ():void => {
		const target:AccessPointCreated.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

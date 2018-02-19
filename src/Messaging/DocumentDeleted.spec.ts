import * as Messaging from "../Messaging";
import * as NS from "../Vocabularies/index";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as DocumentDeleted from "./DocumentDeleted";
import DefaultExport from "./DocumentDeleted";

describe( module( "Carbon/Messaging/DocumentDeleted" ), ():void => {

	it( isDefined(), ():void => {
		expect( DocumentDeleted ).toBeDefined();
		expect( DocumentDeleted ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( DocumentDeleted.RDF_CLASS ).toBeDefined();
		expect( DocumentDeleted.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( DocumentDeleted.RDF_CLASS ).toBe( NS.C.DocumentDeleted );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( DocumentDeleted.SCHEMA ).toBeDefined();
		expect( DocumentDeleted.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( DocumentDeleted.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
		} );

		expect( DocumentDeleted.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.target,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentDeleted.Class",
		"Interface with the properties of the data received in a document deleted event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentDeleted.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as DocumentDeleted.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:DocumentDeleted.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentDeleted.Class" ), ():void => {
		const target:DocumentDeleted.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

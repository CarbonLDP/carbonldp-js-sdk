import * as Messaging from "../Messaging";
import * as Pointer from "../Pointer";
import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import * as DocumentModified from "./DocumentModified";
import DefaultExport from "./DocumentModified";

describe( module( "Carbon/Messaging/DocumentModified" ), ():void => {

	it( isDefined(), ():void => {
		expect( DocumentModified ).toBeDefined();
		expect( DocumentModified ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( DocumentModified.RDF_CLASS ).toBeDefined();
		expect( DocumentModified.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( DocumentModified.RDF_CLASS ).toBe( C.DocumentModified );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.Messaging.DocumentModified.Class",
		"Interface with the properties of the data received in a document modified event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentModified.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as DocumentModified.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:DocumentModified.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentModified.Class" ), ():void => {
		const target:DocumentModified.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

import { extendsClass, hasDefaultExport, hasProperty, interfaze, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Resource from "./../Resource";

import * as ValidationError from "./ValidationError";
import DefaultExport from "./ValidationError";

describe( module( "Carbon/LDP/ValidationError" ), ():void => {

	it( "should exists", ():void => {
		expect( ValidationError ).toBeDefined();
		expect( ValidationError ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ValidationError.RDF_CLASS ).toBeDefined();
		expect( ValidationError.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( ValidationError.RDF_CLASS ).toBe( NS.C.Class.ValidationError );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ValidationError.SCHEMA ).toBeDefined();
		expect( ValidationError.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( ValidationError.SCHEMA as {} ).toEqual( {
			"errorDetails": jasmine.any( Object ),
		} );

		expect( ValidationError.SCHEMA[ "errorDetails" ] ).toEqual( {
			"@id": NS.C.Predicate.errorDetails,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.LDP.ValidationError.Class",
		"Interface that contains the properties that describe how the validation failed."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as ValidationError.Class;
			expect( target ).toBeDefined();
		} );

		it( "should exists", ():void => {
			const target:ValidationError.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"errorDetails",
			"Carbon.Pointer.Class",
			"Pointer with the error details of how the validation failed."
		), ():void => {
			const target:ValidationError.Class = { errorDetails: true } as any;
			expect( target.errorDetails ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.ValidationError.Class" ), ():void => {
		const target:ValidationError.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

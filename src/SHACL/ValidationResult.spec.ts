import { hasDefaultExport, module, hasProperty, STATIC, interfaze, OBLIGATORY, OPTIONAL, extendsClass } from "../test/JasmineExtender";
import * as ValidationResult from "./ValidationResult";
import DefaultExport from "./ValidationResult";
import * as NS from "../Vocabularies/index";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

describe( module( "Carbon/SHACL/ValidationResult" ), ():void => {

	it( "should exists", ():void => {
		expect( ValidationResult ).toBeDefined();
		expect( ValidationResult ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ValidationResult.RDF_CLASS ).toBeDefined();
		expect( ValidationResult.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( ValidationResult.RDF_CLASS ).toBe( NS.SHACL.ValidationResult );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ValidationResult.SCHEMA ).toBeDefined();
		expect( ValidationResult.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( ValidationResult.SCHEMA as {} ).toEqual( {
			"focusNode": jasmine.any( Object ),
			"resultPath": jasmine.any( Object ),
			"value": jasmine.any( Object ),
			"sourceShape": jasmine.any( Object ),
			"sourceConstraintComponent": jasmine.any( Object ),
			"detail": jasmine.any( Object ),
			"resultMessage": jasmine.any( Object ),
			"resultSeverity": jasmine.any( Object ),
		} );

		expect( ValidationResult.SCHEMA[ "focusNode" ] ).toEqual( {
			"@id": NS.SHACL.focusNode,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "resultPath" ] ).toEqual( {
			"@id": NS.SHACL.resultPath,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "value" ] ).toEqual( {
			"@id": NS.SHACL.value,
		} );

		expect( ValidationResult.SCHEMA[ "sourceShape" ] ).toEqual( {
			"@id": NS.SHACL.sourceShape,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "sourceConstraintComponent" ] ).toEqual( {
			"@id": NS.SHACL.sourceConstraintComponent,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "detail" ] ).toEqual( {
			"@id": NS.SHACL.detail,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "resultMessage" ] ).toEqual( {
			"@id": NS.SHACL.resultMessage,
			"@type": NS.XSD.string,
		} );

		expect( ValidationResult.SCHEMA[ "resultSeverity" ] ).toEqual( {
			"@id": NS.SHACL.resultSeverity,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.SHACL.ValidationResult.Class",
		"Interface of a result that reports individual SHACL validation failure."
	), ():void => {

		it( "should exists", ():void => {
			const target:ValidationResult.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as ValidationResult.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"focusNode",
			"Carbon.Pointer.Class",
			"The focus node that has caused the result."
		), ():void => {
			const target:ValidationResult.Class[ "focusNode" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultPath",
			"Carbon.Pointer.Class",
			"The SHACL shape property path that where tested."
		), ():void => {
			const target:ValidationResult.Class[ "resultPath" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"value",
			"any",
			"The value of the previous SHACL property path that raised the validation violation."
		), ():void => {
			const target:ValidationResult.Class[ "value" ] = null as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"sourceShape",
			"Carbon.Pointer.Class",
			"Pointer to the source SHACL shape used in the validation."
		), ():void => {
			const target:ValidationResult.Class[ "sourceShape" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"detail",
			"Carbon.Pointer.Class",
			"Pointer to the possible parent wih one or more SHACL results."
		), ():void => {
			const target:ValidationResult.Class[ "detail" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultMessage",
			"string",
			"The message string taken from the SHACL shape message property."
		), ():void => {
			const target:ValidationResult.Class[ "resultMessage" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultSeverity",
			"Carbon.Pointer.Class",
			"The severity described by the SHACL shape severity property."
		), ():void => {
			const target:ValidationResult.Class[ "resultSeverity" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );


	it( hasDefaultExport( "Carbon.SHACL.ValidationResult.Class" ), ():void => {
		const target:ValidationResult.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

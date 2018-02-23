import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC
} from "../test/JasmineExtender";
import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
import * as ValidationResult from "./ValidationResult";
import DefaultExport from "./ValidationResult";

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

		expect( ValidationResult.RDF_CLASS ).toBe( SHACL.ValidationResult );
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
			"@id": SHACL.focusNode,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "resultPath" ] ).toEqual( {
			"@id": SHACL.resultPath,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "value" ] ).toEqual( {
			"@id": SHACL.value,
		} );

		expect( ValidationResult.SCHEMA[ "sourceShape" ] ).toEqual( {
			"@id": SHACL.sourceShape,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "sourceConstraintComponent" ] ).toEqual( {
			"@id": SHACL.sourceConstraintComponent,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "detail" ] ).toEqual( {
			"@id": SHACL.detail,
			"@type": "@id",
		} );

		expect( ValidationResult.SCHEMA[ "resultMessage" ] ).toEqual( {
			"@id": SHACL.resultMessage,
			"@type": XSD.string,
		} );

		expect( ValidationResult.SCHEMA[ "resultSeverity" ] ).toEqual( {
			"@id": SHACL.resultSeverity,
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

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as ValidationResult.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"focusNode",
			"Carbon.Pointer.Pointer",
			"The focus node that has caused the result."
		), ():void => {
			const target:ValidationResult.Class[ "focusNode" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultPath",
			"Carbon.Pointer.Pointer",
			"The SHACL shape property path that where tested."
		), ():void => {
			const target:ValidationResult.Class[ "resultPath" ] = {} as Pointer;
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
			"Carbon.Pointer.Pointer",
			"Pointer to the source SHACL shape used in the validation."
		), ():void => {
			const target:ValidationResult.Class[ "sourceShape" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"detail",
			"Carbon.Pointer.Pointer",
			"Pointer to the possible parent wih one or more SHACL results."
		), ():void => {
			const target:ValidationResult.Class[ "detail" ] = {} as Pointer;
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
			"Carbon.Pointer.Pointer",
			"The severity described by the SHACL shape severity property."
		), ():void => {
			const target:ValidationResult.Class[ "resultSeverity" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );


	it( hasDefaultExport( "Carbon.SHACL.ValidationResult.Class" ), ():void => {
		const target:ValidationResult.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );

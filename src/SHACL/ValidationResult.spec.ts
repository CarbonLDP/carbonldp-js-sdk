import { Pointer } from "../Pointer/Pointer";

import { Resource } from "../Resource/Resource";

import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC
} from "../test/JasmineExtender";

import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";

import { ValidationResult } from "./ValidationResult";


describe( module( "carbonldp/SHACL/ValidationResult" ), ():void => {

	describe( interfaze(
		"CarbonLDP.SHACL.ValidationResult",
		"Interface of a result that reports individual SHACL validation failure."
	), ():void => {

		it( "should exist", ():void => {
			const target:ValidationResult = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:Resource = {} as ValidationResult;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"focusNode",
			"CarbonLDP.Pointer",
			"The focus node that has caused the result."
		), ():void => {
			const target:ValidationResult[ "focusNode" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultPath",
			"CarbonLDP.Pointer",
			"The SHACL shape property path that where tested."
		), ():void => {
			const target:ValidationResult[ "resultPath" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"value",
			"any",
			"The value of the previous SHACL property path that raised the validation violation."
		), ():void => {
			const target:ValidationResult[ "value" ] = null as any;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"sourceShape",
			"CarbonLDP.Pointer",
			"Pointer to the source SHACL shape used in the validation."
		), ():void => {
			const target:ValidationResult[ "sourceShape" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"detail",
			"CarbonLDP.Pointer",
			"Pointer to the possible parent wih one or more SHACL results."
		), ():void => {
			const target:ValidationResult[ "detail" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultMessage",
			"string",
			"The message string taken from the SHACL shape message property."
		), ():void => {
			const target:ValidationResult[ "resultMessage" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"resultSeverity",
			"CarbonLDP.Pointer",
			"The severity described by the SHACL shape severity property."
		), ():void => {
			const target:ValidationResult[ "resultSeverity" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.SHACL.ValidationResult.ValidationResultFactory",
		"Interface with the factory, decorate and utils elements for `CarbonLDP.SHACL.ValidationResult` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ValidationResult",
		"CarbonLDP.SHACL.ValidationResult.ValidationResultFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( ValidationResult ).toBeDefined();
			expect( ValidationResult ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ValidationResult.TYPE", ():void => {
			expect( ValidationResult.TYPE ).toBeDefined();
			expect( ValidationResult.TYPE ).toEqual( jasmine.any( String ) );

			expect( ValidationResult.TYPE ).toBe( SHACL.ValidationResult );
		} );

		// TODO: Separate in different tests
		it( "ValidationResult.SCHEMA", ():void => {
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

	} );

} );

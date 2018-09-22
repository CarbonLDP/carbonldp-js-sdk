import { module, reexports, STATIC } from "../test/JasmineExtender";

import * as SHACL from "./";

import { ValidationReport, ValidationReportFactory } from "./ValidationReport";
import { ValidationResult, ValidationResultFactory } from "./ValidationResult";


describe( module( "carbonldp/SHACL" ), ():void => {

	it( "should exists", ():void => {
		expect( SHACL ).toBeDefined();
		expect( SHACL ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"ValidationReport",
		"carbonldp/SHACL/ValidationReport"
	), ():void => {
		expect( SHACL.ValidationReport ).toBe( ValidationReport );
	} );

	it( reexports(
		STATIC,
		"ValidationReportFactory",
		"carbonldp/SHACL/ValidationReportFactory"
	), ():void => {
		const target:SHACL.ValidationReportFactory = {} as ValidationReportFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"ValidationResult",
		"carbonldp/SHACL/ValidationResult"
	), ():void => {
		expect( SHACL.ValidationResult ).toBe( ValidationResult );
	} );

	it( reexports(
		STATIC,
		"ValidationResultFactory",
		"carbonldp/SHACL/ValidationResultFactory"
	), ():void => {
		const target:SHACL.ValidationResultFactory = {} as ValidationResultFactory;
		expect( target ).toBeDefined();
	} );

} );

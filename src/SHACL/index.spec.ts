import { module, reexports, STATIC } from "../test/JasmineExtender";
import * as SHACL from "./index";
import { ValidationReport } from "./ValidationReport";
import { ValidationResult } from "./ValidationResult";

describe( module( "Carbon/SHACL" ), ():void => {

	it( "should exists", ():void => {
		expect( SHACL ).toBeDefined();
		expect( SHACL ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"ValidationReport",
		"Carbon/SHACL/ValidationReport"
	), ():void => {
		expect( SHACL.ValidationReport ).toBe( ValidationReport );
	} );

	it( reexports(
		STATIC,
		"ValidationResult",
		"Carbon/SHACL/ValidationResult"
	), ():void => {
		expect( SHACL.ValidationResult ).toBe( ValidationResult );
	} );

} );

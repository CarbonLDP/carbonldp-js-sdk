import { module, reexports, STATIC } from "../test/JasmineExtender";
import * as SHACL from "./index";
import * as ValidationReport from "./ValidationReport";

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

} );

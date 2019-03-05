import * as Module from "./index";
import { ValidationReport } from "./ValidationReport";
import { ValidationResult } from "./ValidationResult";

describe( "SHACL/index", () => {

	it( "should reexport ValidationReport", () => {
		expect( Module.ValidationReport ).toBeDefined();
		expect( Module.ValidationReport ).toBe( ValidationReport );
	} );

	it( "should reexport ValidationResult", () => {
		expect( Module.ValidationResult ).toBeDefined();
		expect( Module.ValidationResult ).toBe( ValidationResult );
	} );

} );

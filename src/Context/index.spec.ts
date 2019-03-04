import { AbstractContext } from "./AbstractContext";
import { DocumentsContext } from "./DocumentsContext";
import { GlobalContext } from "./GlobalContext";
import * as Module from "./index";

describe( "Context/index", () => {

	it( "should reexport AbstractContext", () => {
		expect( Module.AbstractContext ).toBeDefined();
		expect( Module.AbstractContext ).toBe( AbstractContext );
	} );

	it( "should reexport DocumentsContext", () => {
		expect( Module.DocumentsContext ).toBeDefined();
		expect( Module.DocumentsContext ).toBe( DocumentsContext );
	} );

	it( "should reexport GlobalContext", () => {
		expect( Module.GlobalContext ).toBeDefined();
		expect( Module.GlobalContext ).toBe( GlobalContext );
	} );

} );

import { C } from "./C";
import * as Module from "./index";
import { LDP } from "./LDP";
import { RDF } from "./RDF";
import { SHACL } from "./SHACL";
import { XSD } from "./XSD";

describe( "Vocabularies/index", () => {

	it( "should reexport C", () => {
		expect( Module.C ).toBeDefined();
		expect( Module.C ).toBe( C );
	} );

	it( "should reexport LDP", () => {
		expect( Module.LDP ).toBeDefined();
		expect( Module.LDP ).toBe( LDP );
	} );

	it( "should reexport RDF", () => {
		expect( Module.RDF ).toBeDefined();
		expect( Module.RDF ).toBe( RDF );
	} );

	it( "should reexport SHACL", () => {
		expect( Module.SHACL ).toBeDefined();
		expect( Module.SHACL ).toBe( SHACL );
	} );

	it( "should reexport XSD", () => {
		expect( Module.XSD ).toBeDefined();
		expect( Module.XSD ).toBe( XSD );
	} );

} );

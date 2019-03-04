import { RDFDocument } from "./Document";
import * as Module from "./index";
import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { RDFNode } from "./Node";
import { URI } from "./URI";
import { RDFValue } from "./Value";

describe( "RDF/index", () => {

	it( "should reexport RDFDocument", () => {
		expect( Module.RDFDocument ).toBeDefined();
		expect( Module.RDFDocument ).toBe( RDFDocument );
	} );

	it( "should reexport RDFList", () => {
		expect( Module.RDFList ).toBeDefined();
		expect( Module.RDFList ).toBe( RDFList );
	} );

	it( "should reexport RDFLiteral", () => {
		expect( Module.RDFLiteral ).toBeDefined();
		expect( Module.RDFLiteral ).toBe( RDFLiteral );
	} );

	it( "should reexport RDFNode", () => {
		expect( Module.RDFNode ).toBeDefined();
		expect( Module.RDFNode ).toBe( RDFNode );
	} );

	it( "should reexport URI", () => {
		expect( Module.URI ).toBeDefined();
		expect( Module.URI ).toBe( URI );
	} );

	it( "should reexport RDFValue", () => {
		expect( Module.RDFValue ).toBeDefined();
		expect( Module.RDFValue ).toBe( RDFValue );
	} );

} );

import { Document } from "./Document";
import * as Module from "./index";
import * as Traits from "./Traits";
import { TransientDocument } from "./TransientDocument";

describe( "Document/index", () => {

	it( "should reexport Document", () => {
		expect( Module.Document ).toBeDefined();
		expect( Module.Document ).toBe( Document );
	} );

	it( "should reexport Traits", () => {
		expect( Module.Traits ).toBeDefined();
		expect( Module.Traits ).toBe( Traits );
	} );

	it( "should reexport TransientDocument", () => {
		expect( Module.TransientDocument ).toBeDefined();
		expect( Module.TransientDocument ).toBe( TransientDocument );
	} );

} );

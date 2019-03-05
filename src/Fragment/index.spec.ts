import { Fragment } from "./Fragment";
import * as Module from "./index";
import { TransientFragment } from "./TransientFragment";

describe( "Fragment/index", () => {

	it( "should reexport Fragment", () => {
		expect( Module.Fragment ).toBeDefined();
		expect( Module.Fragment ).toBe( Fragment );
	} );

	it( "should reexport TransientFragment", () => {
		expect( Module.TransientFragment ).toBeDefined();
		expect( Module.TransientFragment ).toBe( TransientFragment );
	} );

} );

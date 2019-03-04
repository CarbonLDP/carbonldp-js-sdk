import { AccessPoint } from "./AccessPoint";
import * as Module from "./index";
import { TransientAccessPoint } from "./TransientAccessPoint";

describe( "AccessPoint/index", () => {

	it( "should reexport AccessPoint", () => {
		expect( Module.AccessPoint ).toBeDefined();
		expect( Module.AccessPoint ).toBe( AccessPoint );
	} );

	it( "should reexport TransientAccessPoint", () => {
		expect( Module.TransientAccessPoint ).toBeDefined();
		expect( Module.TransientAccessPoint ).toBe( TransientAccessPoint );
	} );

} );

import { GeneralRegistry } from "./GeneralRegistry";
import * as Module from "./index";

describe( "GeneralRegistry/index", () => {

	it( "should reexport GeneralRegistry", () => {
		expect( Module.GeneralRegistry ).toBeDefined();
		expect( Module.GeneralRegistry ).toBe( GeneralRegistry );
	} );

} );

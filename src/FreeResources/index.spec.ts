import { FreeResources } from "./FreeResources";
import * as Module from "./index";

describe( "FreeResources/index", () => {

	it( "should reexport FreeResources", () => {
		expect( Module.FreeResources ).toBeDefined();
		expect( Module.FreeResources ).toBe( FreeResources );
	} );

} );

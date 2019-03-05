import * as Module from "./index";
import { Resource } from "./Resource";

describe( "Resource/index", () => {

	it( "should reexport Resource", () => {
		expect( Module.Resource ).toBeDefined();
		expect( Module.Resource ).toBe( Resource );
	} );

} );

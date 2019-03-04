import { DirectContainer } from "./DirectContainer";
import * as Module from "./index";
import { TransientDirectContainer } from "./TransientDirectContainer";

describe( "LDP/DirectContainer/index", () => {

	it( "should reexport DirectContainer", () => {
		expect( Module.DirectContainer ).toBeDefined();
		expect( Module.DirectContainer ).toBe( DirectContainer );
	} );

	it( "should reexport TransientDirectContainer", () => {
		expect( Module.TransientDirectContainer ).toBeDefined();
		expect( Module.TransientDirectContainer ).toBe( TransientDirectContainer );
	} );

} );

import { GeneralRepository } from "./GeneralRepository";
import * as Module from "./index";

describe( "GeneralRegistry/index", () => {

	it( "should reexport GeneralRepository", () => {
		expect( Module.GeneralRepository ).toBeDefined();
		expect( Module.GeneralRepository ).toBe( GeneralRepository );
	} );

} );

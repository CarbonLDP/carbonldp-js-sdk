import { CarbonLDP } from "./CarbonLDP";
import * as Module from "./index";

describe( "/index", () => {

	it( "should reexport CarbonLDP", () => {
		expect( Module.CarbonLDP ).toBeDefined();
		expect( Module.CarbonLDP ).toBe( CarbonLDP );
	} );

} );

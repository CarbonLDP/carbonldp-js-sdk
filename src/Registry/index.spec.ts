import { GlobalRegistry } from "./GlobalRegistry";
import * as Module from "./index";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry } from "./Registry";

describe( "Registry/index", () => {

	it( "should reexport GlobalRegistry", () => {
		expect( Module.GlobalRegistry ).toBeDefined();
		expect( Module.GlobalRegistry ).toBe( GlobalRegistry );
	} );

	it( "should reexport RegisteredPointer", () => {
		expect( Module.RegisteredPointer ).toBeDefined();
		expect( Module.RegisteredPointer ).toBe( RegisteredPointer );
	} );

	it( "should reexport Registry", () => {
		expect( Module.Registry ).toBeDefined();
		expect( Module.Registry ).toBe( Registry );
	} );

} );

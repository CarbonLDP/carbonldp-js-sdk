import * as Module from "./index";
import { JSONLDConverter } from "./JSONLDConverter";
import { JSONLDParser } from "./JSONLDParser";
import { JSONLDProcessor } from "./JSONLDProcessor";
import * as Utils from "./Utils";

describe( "JSONLD/index", () => {

	it( "should reexport JSONLDConverter", () => {
		expect( Module.JSONLDConverter ).toBeDefined();
		expect( Module.JSONLDConverter ).toBe( JSONLDConverter );
	} );

	it( "should reexport JSONLDParser", () => {
		expect( Module.JSONLDParser ).toBeDefined();
		expect( Module.JSONLDParser ).toBe( JSONLDParser );
	} );

	it( "should reexport JSONLDProcessor", () => {
		expect( Module.JSONLDProcessor ).toBeDefined();
		expect( Module.JSONLDProcessor ).toBe( JSONLDProcessor );
	} );

	it( "should reexport _guessXSDType", () => {
		expect( Module._guessXSDType ).toBeDefined();
		expect( Module._guessXSDType ).toBe( Utils._guessXSDType );
	} );

} );

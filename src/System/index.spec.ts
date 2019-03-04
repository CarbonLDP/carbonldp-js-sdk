import * as Module from "./index";
import { PlatformMetadata } from "./PlatformMetadata";
import { PlatformInstance } from "./PlatformInstance";

describe( "System/index", () => {

	it( "should reexport PlatformMetadata", () => {
		expect( Module.PlatformMetadata ).toBeDefined();
		expect( Module.PlatformMetadata ).toBe( PlatformMetadata );
	} );

	it( "should reexport PlatformInstance", () => {
		expect( Module.PlatformInstance ).toBeDefined();
		expect( Module.PlatformInstance ).toBe( PlatformInstance );
	} );

} );

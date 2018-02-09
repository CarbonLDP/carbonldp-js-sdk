import {
	INSTANCE,
	module,
	reexports
} from "./test/JasmineExtender";

import * as System from "./System";
import * as PlatformMetadata from "./System/PlatformMetadata";

describe( module( "Carbon/System" ), () => {

	it( "should exists", ():void => {
		expect( System ).toBeDefined();
		expect( System ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "Carbon.System.PlatformMetadata", "Carbon/System/PlatformMetadata" ), ():void => {
		expect( System.PlatformMetadata ).toBeDefined();
		expect( System.PlatformMetadata ).toBe( PlatformMetadata );
	} );

} );

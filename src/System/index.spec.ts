import {
	INSTANCE,
	module,
	reexports
} from "../test/JasmineExtender";

import * as System from "./";
import * as PlatformMetadata from "./PlatformMetadata";

describe( module( "CarbonLDP/System" ), () => {

	it( "should exists", ():void => {
		expect( System ).toBeDefined();
		expect( System ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "PlatformMetadata", "CarbonLDP/System/PlatformMetadata" ), ():void => {
		expect( System.PlatformMetadata ).toBeDefined();
		expect( System.PlatformMetadata ).toBe( PlatformMetadata );
	} );

} );

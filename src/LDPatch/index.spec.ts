import { INSTANCE, module, reexports } from "../test/JasmineExtender";

import * as Module from "./index";
import * as Tokens from "./Tokens";

describe( module( "Carbon/LDPatch" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "Tokens", "Carbon/LDPatch/Tokens" ), ():void => {
		expect( Module.Tokens ).toBeDefined();
		expect( Module.Tokens ).toBe( Tokens );
	} );

} );

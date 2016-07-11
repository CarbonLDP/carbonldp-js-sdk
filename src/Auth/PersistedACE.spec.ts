import {module, isDefined} from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import * as PersistedACE from "./PersistedACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedACE ).toBeDefined();
		expect( Utils.isObject( PersistedACE ) ).toBe( true );
	} );

} );

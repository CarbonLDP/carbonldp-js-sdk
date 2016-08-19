import {
	module, isDefined,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as PersistedAgent from "./PersistedAgent";

describe( module( "Carbon.App.PersistedAgent" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAgent ).toBeDefined();
		expect( Utils.isObject( PersistedAgent ) ).toBe( true );
	} );

} );

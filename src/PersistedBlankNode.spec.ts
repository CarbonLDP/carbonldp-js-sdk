import {
	module,

	isDefined,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as PersistedBlankNode from "./PersistedBlankNode";

describe( module( "Carbon/LDP/PersistedBlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedBlankNode ).toBeDefined();
		expect( Utils.isObject( PersistedBlankNode ) ).toBe( true );
	} );

} );

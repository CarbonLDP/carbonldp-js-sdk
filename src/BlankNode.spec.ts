import * as BlankNode from "./BlankNode";

import {
	extendsClass,
	interfaze,
	isDefined,
	module,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "carbonldp/BlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( BlankNode ).toBeDefined();
		expect( Utils.isObject( BlankNode ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.BlankNode",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Fragment" ), ():void => {} );

	} );

} );

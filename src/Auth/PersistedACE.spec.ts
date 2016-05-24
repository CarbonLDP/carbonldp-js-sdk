import {module, isDefined, hasProperty, STATIC } from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as ACE from "./ACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACE ).toBeDefined();
		expect( Utils.isObject( ACE ) ).toBe( true );
	});

});

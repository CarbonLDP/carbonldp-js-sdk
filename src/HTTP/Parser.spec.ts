import {
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as Parser from "./Parser";

describe( module( "carbonldp/HTTP/Parser" ), ():void => {

	it( isDefined(), ():void => {
		expect( Parser ).toBeDefined();
		expect( Utils.isObject( Parser ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.HTTP.Parser.Parser",
		[ "T" ],
		"Interface that represents a what a parser must contains to be used when converting the response of a request."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"parse",
			"Method that parse the provided string to an specified T element.", [
				{ name: "body", type: "string", description: "The string to parse." },
			],
			{ type: "Promise<T>", description: "Promise that contains the parsed T element if the process success." }
		), ():void => {} );

	} );

} );


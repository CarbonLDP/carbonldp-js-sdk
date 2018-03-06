import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../../../test/JasmineExtender";
import * as Utils from "../../../Utils";

import * as Serializers from "./";

import * as XSD from "./XSD";

describe( module(
	"carbonldp/RDF/Literal/Serializers"
), ():void => {

	it( isDefined(), ():void => {
		expect( Serializers ).toBeDefined();
		expect( Utils.isObject( Serializers ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"XSD",
		"carbonldp/RDF/Literal/Serializers/XSD"
	), ():void => {
		expect( Serializers.XSD ).toBeDefined();
		expect( Serializers.XSD ).toBe( XSD );
	} );

} );
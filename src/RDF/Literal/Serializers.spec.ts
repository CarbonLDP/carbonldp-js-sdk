import {
	STATIC,

	module,

	isDefined,
	reexports,
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import * as XSD from "./Serializers/XSD";

import * as Serializers from "./Serializers";

describe( module(
	"Carbon/RDF/Literal/Serializers"
), ():void => {

	it( isDefined(), ():void => {
		expect( Serializers ).toBeDefined();
		expect( Utils.isObject( Serializers ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"XSD",
		"Carbon/RDF/Literal/Serializers/XSD"
	), ():void => {
		expect( Serializers.XSD ).toBeDefined();
		expect( Serializers.XSD ).toBe( XSD );
	} );

} );
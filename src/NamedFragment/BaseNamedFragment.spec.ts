import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

describe( module( "carbonldp/NamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseNamedFragment",
		"Interface with the base properties of a named fragment."
	), ():void => {

		it( extendsClass( "CarbonLDP.BaseFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.Document",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

} );

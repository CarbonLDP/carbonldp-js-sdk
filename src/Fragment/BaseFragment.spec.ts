import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";

describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseFragment",
		"Interface with the base properties of a fragment."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.TransientDocument",
			"The document the fragment belongs to."
		), ():void => {} );

	} );

} );

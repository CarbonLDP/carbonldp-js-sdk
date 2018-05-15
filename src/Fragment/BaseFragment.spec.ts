import {
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "../test/JasmineExtender";

describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseFragment",
		"Interface with the base properties of a fragment."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"_registry",
			"CarbonLDP.Registry & CarbonLDP.Pointer",
			"The pointer registry where the fragment will belong to."
		), ():void => {} );

	} );

} );

import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";


describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseTransientFragment",
		"Interface with the base properties of a fragment."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"$registry",
			"CarbonLDP.TransientDocument",
			"The transient document the transient fragment belongs to."
		), ():void => {} );

	} );

} );

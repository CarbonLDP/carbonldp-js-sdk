import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, OPTIONAL } from "../../test/JasmineExtender";


describe( module( "carbonldp/LDP/DirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.BaseDirectContainer",
		"Interface with the base properties for a direct container."
	), ():void => {

		it( extendsClass( "CarbonLDP.BaseDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"membershipResource",
			"CarbonLDP.Pointer",
			"Pointer that references the document that the direct container belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMembershipRelation",
			"CarbonLDP.Pointer",
			"Pointer that reference to the property the direct container manages."
		), ():void => {} );

	} );

} );

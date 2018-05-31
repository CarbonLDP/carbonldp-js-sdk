import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL
} from "../test/JasmineExtender";


describe( module( "carbonldp/AccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseAccessPoint",
		"Interface that represents the basic properties to construct a `CarbonLDP.TransientAccessPoint`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the inserted content relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"membershipResource",
			"CarbonLDP.Pointer",
			"Pointer to the parent resource the access point will manage the determined member relation."
		), ():void => {} );

	} );

} );

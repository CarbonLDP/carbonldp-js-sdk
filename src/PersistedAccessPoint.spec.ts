import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OPTIONAL,
} from "./test/JasmineExtender";

describe( module( "carbonldp/PersistedAccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedAccessPoint",
		"Interface that represents a persisted Carbon LDP AccessPoint."
	), ():void => {

		it( extendsClass( "CarbonLDP.AccessPoint" ), ():void => {} );
		it( extendsClass( "CarbonLDP.PersistedProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"membershipResource",
			"CarbonLDP.Pointer",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"CarbonLDP.Pointer",
			"The inserted content relation of the access point."
		), ():void => {} );

	} );

} );


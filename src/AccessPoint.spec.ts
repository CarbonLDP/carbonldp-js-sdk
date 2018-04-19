import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "./test/JasmineExtender";

describe( module( "carbonldp/AccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.AccessPoint",
		"Interface that represents a persisted Carbon LDP AccessPoint."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientAccessPoint" ), ():void => {} );
		it( extendsClass( "CarbonLDP.ProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"CarbonLDP.Pointer",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"CarbonLDP.Pointer",
			"The inserted content relation of the access point."
		), ():void => {} );

	} );

} );


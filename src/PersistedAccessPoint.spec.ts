import DefaultExport, { PersistedAccessPoint } from "./PersistedAccessPoint";

import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "./test/JasmineExtender";

describe( module( "carbonldp/PersistedAccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedAccessPoint.PersistedAccessPoint",
		"Interface that represents a persisted Carbon LDP AccessPoint."
	), ():void => {

		it( extendsClass( "CarbonLDP.AccessPoint.AccessPoint" ), ():void => {} );
		it( extendsClass( "CarbonLDP.PersistedProtectedDocument.PersistedProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"CarbonLDP.Pointer.Pointer",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer.Pointer",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"CarbonLDP.Pointer.Pointer",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"CarbonLDP.Pointer.Pointer",
			"The inserted content relation of the access point."
		), ():void => {} );

	} );

	it( hasDefaultExport( "CarbonLDP.PersistedAccessPoint.PersistedAccessPoint" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedAccessPoint;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );


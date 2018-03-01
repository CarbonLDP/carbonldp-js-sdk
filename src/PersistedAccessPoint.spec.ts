import {
	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport, extendsClass,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as PersistedAccessPoint from "./PersistedAccessPoint";
import DefaultExport from "./PersistedAccessPoint";

describe( module( "Carbon/PersistedAccessPoint" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAccessPoint ).toBeDefined();
		expect( Utils.isObject( PersistedAccessPoint ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedAccessPoint.Class",
		"Interface that represents a persisted Carbon LDP AccessPoint."
	), ():void => {

		it( extendsClass( "Carbon.AccessPoint.AccessPoint" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedProtectedDocument.PersistedProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"Carbon.Pointer.Pointer",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"Carbon.Pointer.Pointer",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"Carbon.Pointer.Pointer",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"Carbon.Pointer.Pointer",
			"The inserted content relation of the access point."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedAccessPoint.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedAccessPoint.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );


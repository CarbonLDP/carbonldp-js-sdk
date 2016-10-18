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

		it( extendsClass( "Carbon.AccessPoint.Class" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"Carbon.Pointer.Class",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"Carbon.Pointer.Class",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"Carbon.Pointer.Class",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"Carbon.Pointer.Class",
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


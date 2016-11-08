import {
	OPTIONAL,

	module,
	interfaze,

	isDefined,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as PersistedAgent from "./PersistedAgent";
import DefaultExport from "./PersistedAgent";

describe( module( "Carbon/Platform/PersistedAgent" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAgent ).toBeDefined();
		expect( Utils.isObject( PersistedAgent ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Platform.PersistedAgent.Class",
		"Interface that specify an persisted agent in platform context i.e. Carbon context."
	), ():void => {

		it( extendsClass( "Carbon.Auth.PersistedAgent.Class" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"platformRoles",
			"Carbon.Pointer.Class[]",
			"A array of pointer that contains the specific platform roles the current agent have."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Platform.PersistedAgent.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedAgent.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );

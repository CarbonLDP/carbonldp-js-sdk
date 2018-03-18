import * as PersistedBlankNode from "./PersistedBlankNode";
import DefaultExport from "./PersistedBlankNode";

import {
	extendsClass,
	hasDefaultExport,
	interfaze,
	isDefined,
	module,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "carbonldp/LDP/PersistedBlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedBlankNode ).toBeDefined();
		expect( Utils.isObject( PersistedBlankNode ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.PersistedBlankNode.PersistedBlankNode",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedFragment.PersistedFragment" ), ():void => {} );

	} );

	it( hasDefaultExport( "CarbonLDP.PersistedBlankNode.PersistedBlankNode" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedBlankNode.PersistedBlankNode;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );

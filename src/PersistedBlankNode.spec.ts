import {
	module,

	OBLIGATORY,

	interfaze,

	isDefined,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as PersistedBlankNode from "./PersistedBlankNode";
import DefaultExport from "./PersistedBlankNode";

describe( module( "Carbon/LDP/PersistedBlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedBlankNode ).toBeDefined();
		expect( Utils.isObject( PersistedBlankNode ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedBlankNode.Class",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.PersistedFragment.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"bNodeIdentifier",
			"string",
			"A UUID identifier for the blank node."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedBlankNode.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedBlankNode.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );

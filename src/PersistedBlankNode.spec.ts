import {
	STATIC,

	module,

	isDefined,
	hasProperty
} from "./test/JasmineExtender";
import * as NS from "./NS";
import * as Utils from "./Utils";

import * as PersistedBlankNode from "./PersistedBlankNode";

describe( module( "Carbon/LDP/PersistedBlankNode" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedBlankNode ).toBeDefined();
		expect( Utils.isObject( PersistedBlankNode ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( PersistedBlankNode.SCHEMA ).toBeDefined();
		expect( Utils.isObject( PersistedBlankNode.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( PersistedBlankNode.SCHEMA, "bNodeIdentifier" ) ).toBe( true );
		expect( PersistedBlankNode.SCHEMA[ "bNodeIdentifier" ] ).toEqual({
			"@id": NS.C.Predicate.bNodeIdentifier,
			"@type": NS.XSD.DataType.string
		});
	});

});
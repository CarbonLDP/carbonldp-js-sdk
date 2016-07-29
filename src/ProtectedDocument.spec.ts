import {
	STATIC,

	module,

	isDefined,
	hasProperty,
} from "./test/JasmineExtender";
import * as NS from "./NS";
import * as Utils from "./Utils";

import * as ProtectedDocument from "./ProtectedDocument";

describe( module( "Carbon/ProtectedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( ProtectedDocument ).toBeDefined();
		expect( Utils.isObject( ProtectedDocument ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ProtectedDocument.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ProtectedDocument.RDF_CLASS ) ).toBe( true );

		expect( ProtectedDocument.RDF_CLASS ).toBe( NS.CS.Class.ProtectedDocument );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ProtectedDocument.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ProtectedDocument.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ProtectedDocument.SCHEMA, "accessControlList" ) ).toBe( true );
		expect( ProtectedDocument.SCHEMA[ "accessControlList" ] ).toEqual( {
			"@id": NS.CS.Predicate.accessControlList,
			"@type": "@id",
		} );

	} );

} );

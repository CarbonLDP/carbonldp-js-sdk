import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";

import * as APIDescription from "./APIDescription";

describe( module( "Carbon/APIDescription" ), ():void => {

	it( isDefined(), ():void => {
		expect( APIDescription ).toBeDefined();
		expect( Utils.isObject( APIDescription ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( APIDescription.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( APIDescription.RDF_CLASS ) ).toBe( true );

		expect( APIDescription.RDF_CLASS ).toBe( NS.C.Class.API );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( APIDescription.SCHEMA ).toBeDefined();
		expect( Utils.isObject( APIDescription.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( APIDescription.SCHEMA, "version" ) ).toBe( true );
		expect( APIDescription.SCHEMA[ "version" ] ).toEqual( {
			"@id": NS.C.Predicate.version,
			"@type": NS.XSD.DataType.string
		} );

		expect( Utils.hasProperty( APIDescription.SCHEMA, "buildDate" ) ).toBe( true );
		expect( APIDescription.SCHEMA[ "buildDate" ] ).toEqual( {
			"@id": NS.C.Predicate.buildDate,
			"@type": NS.XSD.DataType.dateTime
		} );
	} );

} );


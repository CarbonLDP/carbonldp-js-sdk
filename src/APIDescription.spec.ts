import {
	STATIC,

	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";

import * as APIDescription from "./APIDescription";
import DefaultExport from "./APIDescription";

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
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( APIDescription.SCHEMA, "buildDate" ) ).toBe( true );
		expect( APIDescription.SCHEMA[ "buildDate" ] ).toEqual( {
			"@id": NS.C.Predicate.buildDate,
			"@type": NS.XSD.DataType.dateTime,
		} );

	} );

	describe( interfaze(
		"Carbon.APIDescription.Class",
		"Interface that represents a requested API description of the Carbon LDP Platform configured."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"version",
			"string",
			"The version of the Carbon LDP Platform configured."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"buildDate",
			"Date",
			"The last time the platform was built."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.APIDescription.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:APIDescription.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );


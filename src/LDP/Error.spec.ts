import {
	STATIC,

	module,

	isDefined,
	hasProperty, interfaze, extendsClass, OBLIGATORY, hasDefaultExport,
} from "./../test/JasmineExtender";
import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as Error from "./Error";
import DefaultExport from "./Error";

describe( module( "Carbon/LDP/Error" ), ():void => {

	it( isDefined(), ():void => {
		expect( Error ).toBeDefined();
		expect( Utils.isObject( Error ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Error.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Error.RDF_CLASS ) ).toBe( true );

		expect( Error.RDF_CLASS ).toBe( NS.C.Class.Error );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Error.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Error.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Error.SCHEMA, "errorCode" ) ).toBe( true );
		expect( Error.SCHEMA[ "errorCode" ] ).toEqual( {
			"@id": NS.C.Predicate.errorCode,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( Error.SCHEMA, "errorMessage" ) ).toBe( true );
		expect( Error.SCHEMA[ "errorMessage" ] ).toEqual( {
			"@id": NS.C.Predicate.errorMessage,
			"@language": "en",
		} );

		expect( Utils.hasProperty( Error.SCHEMA, "errorParameters" ) ).toBe( true );
		expect( Error.SCHEMA[ "errorParameters" ] ).toEqual( {
			"@id": NS.C.Predicate.errorParameters,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.LDP.Error.Class",
		"Interface that represents an error occurred in the server."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"errorCode",
			"string",
			"An specific code that indicates the type of error the current object is."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"errorMessage",
			"string",
			"Message that explains the error occurred in the server."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"errorParameters",
			"Carbon.LDP.Map.Class<string, any>",
			"Map that contains the specific elements that make the error been thrown."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.LDP.Error.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Error.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );

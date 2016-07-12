import {module, isDefined, STATIC, hasProperty, hasInterface} from "./../test/JasmineExtender";
import * as Error from "./Error";
import * as NS from "./../NS";
import * as Utils from "./../Utils";

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

		expect( Utils.hasProperty( Error.SCHEMA, "carbonCode" ) ).toBe( true );
		expect( Error.SCHEMA[ "carbonCode" ] ).toEqual( {
			"@id": NS.C.Predicate.carbonCode,
			"@type": NS.XSD.DataType.string
		} );

		expect( Utils.hasProperty( Error.SCHEMA, "message" ) ).toBe( true );
		expect( Error.SCHEMA[ "message" ] ).toEqual( {
			"@id": NS.C.Predicate.message,
			"@type": NS.XSD.DataType.string
		} );
	} );

} );

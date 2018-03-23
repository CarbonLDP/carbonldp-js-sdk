import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import { Error } from "./Error";

describe( module( "carbonldp/LDP/Error" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.Error",
		"Interface that represents an error occurred in the server."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource" ), ():void => {} );

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
			"CarbonLDP.LDP.Map<string, any>",
			"Map that contains the specific elements that make the error been thrown."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.ErrorFactory",
		"Interface with the factory, decorate and utils function for `CarbonLDP.LDP.Error` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonError",
		"CarbonLDP.LDP.ErrorFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( Error ).toBeDefined();
			expect( Error ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CarbonError.TYPE", ():void => {
			expect( Error.TYPE ).toBeDefined();
			expect( Utils.isString( Error.TYPE ) ).toBe( true );

			expect( Error.TYPE ).toBe( C.Error );
		} );

		// TODO: Separate in different tests
		it( "CarbonError.SCHEMA", ():void => {
			expect( Error.SCHEMA ).toBeDefined();
			expect( Utils.isObject( Error.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( Error.SCHEMA, "errorCode" ) ).toBe( true );
			expect( Error.SCHEMA[ "errorCode" ] ).toEqual( {
				"@id": C.errorCode,
				"@type": XSD.string,
			} );

			expect( Utils.hasProperty( Error.SCHEMA, "errorMessage" ) ).toBe( true );
			expect( Error.SCHEMA[ "errorMessage" ] ).toEqual( {
				"@id": C.errorMessage,
				"@language": "en",
			} );

			expect( Utils.hasProperty( Error.SCHEMA, "errorParameters" ) ).toBe( true );
			expect( Error.SCHEMA[ "errorParameters" ] ).toEqual( {
				"@id": C.errorParameters,
				"@type": "@id",
			} );
		} );

	} );

} );

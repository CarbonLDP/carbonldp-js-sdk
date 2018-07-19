import { VolatileResource } from "../LDP/VolatileResource";

import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { C, XSD } from "../Vocabularies";
import { PlatformInstance } from "./PlatformInstance";


describe( module( "carbonldp/System/PlatformInstance" ), ():void => {

	describe( interfaze(
		"CarbonLDP.System.PlatformInstance",
		"Interface that represents the actual data a platform instance."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.VolatileResource.VolatileResource" ), ():void => {
			const target:VolatileResource = {} as PlatformInstance;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"buildDate",
			"Date",
			"The time the platform was built."
		), ():void => {
			const target:PlatformInstance[ "buildDate" ] = new Date();
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"version",
			"string",
			"The version of your platform instance."
		), ():void => {
			const target:PlatformInstance[ "version" ] = "" as string;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.System.PlatformInstanceFactory",
		"Interface with the factory for `CarbonLDP.System.PlatformInstance` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {
		} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {
		} );

	} );

	describe( property(
		STATIC,
		"PlatformInstance",
		"CarbonLDP.System.PlatformInstance"
	), ():void => {

		it( "should exist", ():void => {
			expect( PlatformInstance ).toBeDefined();
			expect( PlatformInstance ).toEqual( jasmine.any( Object ) );
		} );

		describe( "PlatformInstance.TYPE", ():void => {

			it( "should exist", ():void => {
				expect( PlatformInstance.TYPE ).toBeDefined();
				expect( PlatformInstance.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be c:PlatformInstance", ():void => {
				expect( PlatformInstance.TYPE ).toBe( C.PlatformInstance );
			} );

		} );

		describe( "PlatformInstance.SCHEMA", ():void => {

			it( "should exist", ():void => {
				expect( PlatformInstance.SCHEMA ).toBeDefined();
				expect( PlatformInstance.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have c:buildDate", ():void => {
				expect( PlatformInstance.SCHEMA ).toEqual( jasmine.objectContaining( {
					buildDate: {
						"@id": C.buildDate,
						"@type": XSD.dateTime,
					},
				} ) );
			} );

			it( "should have c:version", ():void => {
				expect( PlatformInstance.SCHEMA ).toEqual( jasmine.objectContaining( {
					version: {
						"@id": C.version,
						"@type": XSD.string,
					},
				} ) );
			} );

		} );

	} );

} );

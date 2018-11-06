import { Document } from "../Document/Document";

import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { C } from "../Vocabularies/C";

import { PlatformMetadata } from "./PlatformMetadata";


describe( module( "carbonldp/System/PlatformMetadata" ), ():void => {

	describe( interfaze(
		"CarbonLDP.System.PlatformMetadata",
		"Interface that represents the document with the data of the Carbon LDP Platform instance."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document" ), ():void => {
			const target:Document = {} as PlatformMetadata;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"instance",
			"CarbonLDP.System.PlatformInstance",
			"The fragment where the actual data of the instance lives on."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.System.PlatformMetadataFactory",
		"Interface with the factory, decorate and utils elements for `CarbonLDP.System.PlatformMetadata` objects."
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
		"PlatformMetadata",
		"CarbonLDP.System.PlatformMetadataFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( PlatformMetadata ).toBeDefined();
			expect( PlatformMetadata ).toEqual( jasmine.any( Object ) );
		} );

		describe( "PlatformMetadata.TYPE", ():void => {

			it( "should exist", ():void => {
				expect( PlatformMetadata.TYPE ).toBeDefined();
				expect( PlatformMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be c:Platform", ():void => {
				expect( PlatformMetadata.TYPE ).toBe( C.Platform );
			} );

		} );

		describe( "PlatformMetadata.SCHEMA", ():void => {

			it( "should exist", ():void => {
				expect( PlatformMetadata.SCHEMA ).toBeDefined();
				expect( PlatformMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have c:instance", ():void => {
				expect( PlatformMetadata.SCHEMA ).toEqual( jasmine.objectContaining( {
					instance: {
						"@id": C.instance,
						"@type": "@id",
					},
				} ) );
			} );

		} );


	} );

} );


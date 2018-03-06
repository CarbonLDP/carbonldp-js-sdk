import { VolatileResource } from "../LDP/VolatileResource";
import {
	extendsClass,
	hasDefaultExport,
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

import DefaultExport, { PlatformMetadata } from "./PlatformMetadata";

describe( module( "CarbonLDP/System/PlatformMetadata" ), ():void => {

	describe( interfaze(
		"CarbonLDP.System.PlatformMetadata.PlatformMetadata",
		"Interface that represents a requested API description of the Carbon LDP Platform configured."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.VolatileResource.VolatileResource" ), ():void => {
			const instanceMetadata:PlatformMetadata = <any> {};
			const volatileResource:VolatileResource = instanceMetadata;

			expect( instanceMetadata ).toBeDefined();
			expect( volatileResource ).toBeDefined();
		} );

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

	describe( interfaze(
		"CarbonLDP.System.PlatformMetadata.PlatformMetadataFactory",
		"Interface with the factory, decorate and utils elements for `CarbonLDP.System.PlatformMetadata.PlatformMetadata` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"PlatformMetadata",
		"CarbonLDP.System.PlatformMetadata.PlatformMetadataFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( PlatformMetadata ).toBeDefined();
			expect( PlatformMetadata ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different methods
		it( "PlatformMetadata.TYPE", ():void => {
			expect( PlatformMetadata.TYPE ).toBeDefined();
			expect( Utils.isString( PlatformMetadata.TYPE ) ).toBe( true );

			expect( PlatformMetadata.TYPE ).toBe( C.Platform );
		} );

		// TODO: Separate in different methods
		it( "PlatformMetadata.SCHEMA", ():void => {
			expect( PlatformMetadata.SCHEMA ).toBeDefined();
			expect( Utils.isObject( PlatformMetadata.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( PlatformMetadata.SCHEMA, "version" ) ).toBe( true );
			expect( PlatformMetadata.SCHEMA[ "version" ] ).toEqual( {
				"@id": C.version,
				"@type": XSD.string,
			} );

			expect( Utils.hasProperty( PlatformMetadata.SCHEMA, "buildDate" ) ).toBe( true );
			expect( PlatformMetadata.SCHEMA[ "buildDate" ] ).toEqual( {
				"@id": C.buildDate,
				"@type": XSD.dateTime,
			} );

		} );


	} );

	it( hasDefaultExport( "CarbonLDP.System.PlatformMetadata.PlatformMetadata" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PlatformMetadata;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );


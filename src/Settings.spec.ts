import * as Settings from "./Settings";

import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
} from "./test/JasmineExtender";

describe( module( "carbonldp/Settings" ), ():void => {

	it( "should exists", ():void => {
		expect( Settings ).toBeDefined();
		expect( Settings ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze( "CarbonLDP.PlatformPaths", "Interface to configure the platform's system documents locations." ), ():void => {

		it( "should exists", ():void => {
			const target:Settings.PlatformPaths = {} as Settings.PlatformPaths;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"paths",
			"{ [document:string]:string | CarbonLDP.DocumentPaths }",
			"The paths of the platform's system document to configure.\n" +
			"A document path can receive a string as its slug, or a `CarbonLDP.DocumentPaths` object to declare it slug and its sub-paths."
		), ():void => {
			const target:Settings.PlatformPaths[ "paths" ] = {} as { [document:string]:string | Settings.DocumentPaths };
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze( "CarbonLDP.DocumentPaths", "Interface to configure the sub-paths of a platform's system document." ), ():void => {

		it( extendsClass( "CarbonLDP.PlatformPaths" ), ():void => {
			const target:Settings.PlatformPaths = {} as Settings.DocumentPaths;
			expect( target ).toBeDefined();
		} );

		it( "should exists", ():void => {
			const target:Settings.DocumentPaths = {} as Settings.DocumentPaths;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"slug",
			"string",
			"The slug of the platform's system document to configure."
		), ():void => {
			const target:Settings.DocumentPaths[ "slug" ] = "" as string;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze( "CarbonLDP.ContextSettings", "Interface of the possible settings of a Context in the SDK." ), ():void => {

		it( extendsClass( "CarbonLDP.PlatformPaths" ), ():void => {
			const target:Settings.PlatformPaths = {} as Settings.ContextSettings;
			expect( target ).toBeDefined();
		} );

		it( "should exists", ():void => {
			const target:Settings.ContextSettings = {} as Settings.ContextSettings;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"vocabulary",
			"string",
			"Optional default vocabulary to use as in the general schema of the context."
		), ():void => {
			const target:Settings.ContextSettings[ "vocabulary" ] = "" as string;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze( "CarbonLDP.CarbonLDPSettings", "Interface of the possible settings used by the Carbon class." ), ():void => {

		it( extendsClass( "CarbonLDP.ContextSettings" ), ():void => {
			const target:Settings.ContextSettings = {} as Settings.CarbonLDPSettings;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"host",
			"string",
			"The host of the platform to connect to."
		), ():void => {
			const target:Settings.CarbonLDPSettings[ "host" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"post",
			"number",
			"The optional port of the host to connect to."
		), ():void => {
			const target:Settings.CarbonLDPSettings[ "port" ] = 80 as number;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"ssl",
			"boolean",
			"Flag that indicates is the server is under a secure connection or not.\n" +
			"By default it will be set to true, making the host to be resolved as `https://`"
		), ():void => {
			const target:Settings.CarbonLDPSettings[ "ssl" ] = false as boolean;
			expect( target ).toBeDefined();
		} );

	} );

} );

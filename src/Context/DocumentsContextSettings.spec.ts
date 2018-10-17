import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, OPTIONAL } from "../test/JasmineExtender";

import { ContextSettings } from "./ContextSettings";

import { DocumentPaths, DocumentsContextSettings, Paths } from "./DocumentsContextSettings";


describe( module( "carbonldp/Context" ), () => {

	describe( interfaze(
		"CarbonLDP.Paths",
		"Interface that describe the key path key and its respective URI slug of another `CarbonLDP.DocumentPaths` of a child document."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"[ document:string ]",
			"string | CarbonLDP.DocumentPaths"
		), ():void => {
			const target:Paths[ "anything" ] = {} as string | DocumentPaths;
			expect( target ).toBeDefined();
		} );

	} );


	describe( interfaze(
		"CarbonLDP.DocumentPaths",
		"Interface that describe the paths inside a respective document"
	), () => {

		it( "should exists", ():void => {
			const target:DocumentPaths = {} as DocumentPaths;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"paths",
			"CarbonLDP.Paths"
		), ():void => {
			const target:DocumentPaths[ "paths" ] = {} as Paths;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"slug",
			"string"
		), ():void => {
			const target:DocumentPaths[ "slug" ] = "" as string;
			expect( target ).toBeDefined();
		} );

	} );


	describe( interfaze(
		"CarbonLDP.DocumentsContextSettings",
		"Interface of the possible settings of a DocumentsContext."
	), ():void => {

		it( "should exists", ():void => {
			const target:DocumentsContextSettings = {} as DocumentsContextSettings;
			expect( target ).toBeDefined();
		} );


		it( extendsClass( "CarbonLDP.ContextSettings" ), () => {
			const target:ContextSettings = {} as DocumentsContextSettings;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OPTIONAL,
			"paths",
			"CarbonLDP.Paths"
		), ():void => {
			const target:DocumentsContextSettings[ "paths" ] = {} as Paths;
			expect( target ).toBeDefined();
		} );

	} );

} );

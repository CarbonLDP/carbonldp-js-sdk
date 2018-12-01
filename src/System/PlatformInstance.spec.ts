import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { PlatformInstance } from "./PlatformInstance";


describe( "PlatformInstance", () => {

	it( "should exist", () => {
		expect( PlatformInstance ).toBeDefined();
		expect( PlatformInstance ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "PlatformInstance.TYPE", () => {

			it( "should exist", () => {
				expect( PlatformInstance.TYPE ).toBeDefined();
				expect( PlatformInstance.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be c:PlatformInstance", () => {
				expect( PlatformInstance.TYPE ).toBe( C.PlatformInstance );
			} );

		} );

		describe( "PlatformInstance.SCHEMA", () => {

			it( "should exist", () => {
				expect( PlatformInstance.SCHEMA ).toBeDefined();
				expect( PlatformInstance.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have c:buildDate", () => {
				expect( PlatformInstance.SCHEMA ).toEqual( jasmine.objectContaining( {
					buildDate: {
						"@id": C.buildDate,
						"@type": XSD.dateTime,
					},
				} ) );
			} );

			it( "should have c:version", () => {
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

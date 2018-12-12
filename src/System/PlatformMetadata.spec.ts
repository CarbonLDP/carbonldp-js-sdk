import { C } from "../Vocabularies/C";

import { PlatformMetadata } from "./PlatformMetadata";


describe( "PlatformMetadata", ():void => {

	it( "should exist", ():void => {
		expect( PlatformMetadata ).toBeDefined();
		expect( PlatformMetadata ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", ():void => {

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
				expect( PlatformMetadata.SCHEMA[ "instance" ] ).toEqual( {
					"@id": C.instance,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );


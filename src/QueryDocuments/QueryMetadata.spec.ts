import { VolatileResource } from "../LDP/VolatileResource";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { QueryMetadata } from "./QueryMetadata";


describe( "QueryMetadata", ():void => {

	it( "should exists", ():void => {
		expect( QueryMetadata ).toBeDefined();
		expect( QueryMetadata ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", ():void => {
	} );

	describe( "[[factory]]", ():void => {

		describe( "QueryMetadata.TYPE", () => {

			it( "should exists", () => {
				expect( QueryMetadata.TYPE ).toBeDefined();
				expect( QueryMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:QueryMetadata`", () => {
				expect( QueryMetadata.TYPE ).toBe( C.QueryMetadata );
			} );

		} );

		describe( "QueryMetadata.SCHEMA", () => {

			it( "should exists", () => {
				expect( QueryMetadata.SCHEMA ).toBeDefined();
				expect( QueryMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( QueryMetadata.SCHEMA ).toEqual( {
					targets: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `targets`", () => {
				expect( QueryMetadata.SCHEMA[ "targets" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );


		describe( "QueryMetadata.is", ():void => {

			it( "should exists", ():void => {
				expect( QueryMetadata.is ).toBeDefined();
				expect( QueryMetadata.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call to VolatileResource.is", ():void => {
				const spy:jasmine.Spy = spyOn( VolatileResource, "is" );

				const object:object = { the: "object" };
				QueryMetadata.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should verify the resource TYPE", ():void => {
				const target:QueryMetadata = Resource.createFrom( {
					types: [ C.VolatileResource, C.QueryMetadata ],
					targets: [],
				} );

				expect( QueryMetadata.is( target ) ).toBe( true );

				target.$removeType( QueryMetadata.TYPE );
				expect( QueryMetadata.is( target ) ).toBe( false );
			} );

		} );

	} );

} );

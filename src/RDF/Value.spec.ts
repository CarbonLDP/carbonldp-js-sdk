import { PointerLibrary } from "../Pointer/PointerLibrary";

import { XSD } from "../Vocabularies/XSD";

import { RDFValue } from "./Value";


describe( "RDFValue", ():void => {

	it( "should exist", ():void => {
		expect( RDFValue ).toBeDefined();
		expect( RDFValue ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", ():void => {

		describe( "RDFValue.parse", ():void => {

			it( "should exist", () => {
				expect( RDFValue.parse ).toBeDefined();
				expect( RDFValue.parse ).toEqual( jasmine.any( Function ) );
			} );


			let pointerLibrary:jasmine.SpyObj<PointerLibrary>;
			beforeEach( () => {
				pointerLibrary = jasmine.createSpyObj<PointerLibrary>( {
					getPointer: { $id: "http://example.com/pointer/", the: "mock pointer" },
				} );
			} );

			it( "should return string from literal string with out type", () => {
				const returned:any = RDFValue.parse( pointerLibrary, { "@value": "a string" } );
				expect( returned ).toEqual( "a string" );
			} );

			it( "should return Date from literal with dateTime type", () => {
				const returned:any = RDFValue.parse( pointerLibrary, {
					"@value": "2001-02-15T05:35:12.029Z",
					"@type": XSD.dateTime,
				} );

				expect( returned ).toEqual( new Date( "2001-02-15T05:35:12.029Z" ) );
			} );

			it( "should return pointer from library when literal pointer", () => {
				const returned:any = RDFValue.parse( pointerLibrary, {
					"@id": "http://example.com/pointer/",
					"@type": "@id",
				} );

				expect( pointerLibrary.getPointer ).toHaveBeenCalledWith( "http://example.com/pointer/" );
				expect( returned ).toEqual( { $id: "http://example.com/pointer/", the: "mock pointer" } );
			} );

			it( "should return array from @list", () => {
				const returned:any = RDFValue.parse( pointerLibrary, {
					"@list": [
						{
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer",
						},
						{
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						},
						{
							"@id": "http://example.com/pointer/1",
							"@type": "@id",
						},
					],
				} );

				expect( returned ).toEqual( [
					100,
					new Date( "2001-02-15T05:35:12.029Z" ),
					{ $id: "http://example.com/pointer/", the: "mock pointer" },
				] );
			} );

			it( "should return null when empty property", () => {
				const returned:any = RDFValue.parse( pointerLibrary, {} );
				expect( returned ).toBeNull();
			} );

		} );

	} );

} );

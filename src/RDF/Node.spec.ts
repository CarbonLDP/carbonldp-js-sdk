import { XSD } from "../Vocabularies";

import { RDFList } from "./List";
import { RDFNode } from "./Node";


describe( "RDFNode", () => {

	it( "should exist", () => {
		expect( RDFNode ).toBeDefined();
		expect( RDFNode ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "RDFNode.getID", () => {

			it( "should exists", () => {
				expect( RDFNode.getID ).toBeDefined();
				expect( RDFNode.getID ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the @id of the node", () => {
				const returned:string = RDFNode.getID( { "@id": "the-id/" } );
				expect( returned ).toBe( "the-id/" );
			} );

		} );

		describe( "RDFNode.getRelativeID", () => {

			it( "should exists", () => {
				expect( RDFNode.getRelativeID ).toBeDefined();
				expect( RDFNode.getRelativeID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return the fragment when resource is a named fragment", () => {
				const returned:string = RDFNode.getRelativeID( { "@id": "https://example.com/#fragment" } );
				expect( returned ).toBe( "fragment" );
			} );

			it( "should return bNode label when resource is bNode", () => {
				const returned:string = RDFNode.getRelativeID( { "@id": "_:1" } );
				expect( returned ).toBe( "_:1" );
			} );

		} );


		describe( "RDFNode.is", () => {

			it( "should exist", () => {
				expect( RDFList.is ).toBeDefined();
				expect( RDFList.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when has properties", () => {
				expect( RDFNode.is( { "@id": "http://example.com/resource/" } ) ).toBe( true );
			} );

			it( "should return false when @id is not string", () => {
				expect( RDFNode.is( { "@id": [ "something", "else" ] } ) ).toBe( false );
				expect( RDFNode.is( { "@id": null } ) ).toBe( false );
				expect( RDFNode.is( { "@id": undefined } ) ).toBe( false );
			} );

			it( "should return false when empty", () => {
				expect( RDFNode.is( {} ) ).toBe( false );
			} );

		} );

		describe( "RDFNode.create", () => {

			it( "should exist", () => {
				expect( RDFNode.create ).toBeDefined();
				expect( RDFNode.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return object with provided id", () => {
				const node:RDFNode = RDFNode.create( "http://example.com/resource/" );
				expect( node ).toEqual( {
					"@id": "http://example.com/resource/",
				} );
			} );

		} );


		describe( "RDFNode.areEqual", () => {

			it( "should exist", () => {
				expect( RDFNode.areEqual ).toBeDefined();
				expect( RDFNode.areEqual ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when same node", () => {
				const node:RDFNode = { "@id": "http://example.com/resouce/" };
				expect( RDFNode.areEqual( node, node ) ).toBe( true );
			} );

			it( "should return true when same @id", () => {
				const node1:RDFNode = { "@id": "http://example.com/resouce/" };
				const node2:RDFNode = { "@id": "http://example.com/resouce/" };
				expect( RDFNode.areEqual( node1, node2 ) ).toBe( true );
			} );

			it( "should return false when different @id", () => {
				const node1:RDFNode = { "@id": "http://example.com/resouce-1/" };
				const node2:RDFNode = { "@id": "http://example.com/resouce-2/" };
				expect( RDFNode.areEqual( node1, node2 ) ).toBe( false );
			} );

		} );

		describe( "RDFNode.hasType", () => {

			it( "should exist", () => {
				expect( RDFNode.hasType ).toBeDefined();
				expect( RDFNode.hasType ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when type in @type array", () => {
				const node:RDFNode = {
					"@id": "http://example.com/resouce/",
					"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
				};

				expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( true );
			} );

			it( "should return false when type NOT in @type array", () => {
				const node:RDFNode = {
					"@id": "http://example.com/resouce/",
					"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
				};

				expect( RDFNode.hasType( node, "http://example.com/type-3/" ) ).toBe( false );
			} );

			it( "should return false when no @type", () => {
				const node:RDFNode = {
					"@id": "http://example.com/resouce/",
				};

				expect( RDFNode.hasType( node, "http://example.com/type-1/" ) ).toBe( false );
				expect( RDFNode.hasType( node, "http://example.com/type-2/" ) ).toBe( false );
			} );

		} );

		describe( "RDFNode.getTypes", () => {

			it( "should exist", () => {
				expect( RDFNode.getTypes ).toBeDefined();
				expect( RDFNode.getTypes ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return @type array", () => {
				const node:RDFNode = {
					"@id": "http://example.com/resouce/",
					"@type": [ "http://example.com/type-1/", "http://example.com/type-2/" ],
				};

				expect( RDFNode.getTypes( node ) ).toEqual( [
					"http://example.com/type-1/",
					"http://example.com/type-2/",
				] );
			} );

			it( "should return empty whe no @type", () => {
				const node:RDFNode = {
					"@id": "http://example.com/resouce/",
				};

				expect( RDFNode.getTypes( node ) ).toEqual( [] );
			} );

		} );

		describe( "RDFNode.getList", () => {

			it( "should exist", () => {
				expect( RDFNode.getList ).toBeDefined();
				expect( RDFNode.getList ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return single RDFList from expanded @list", () => {
				const returned:RDFList = RDFNode.getList( [
					{
						"@list": [ {
							"@value": "100",
							"@type": "http://www.w3.org/2001/XMLSchema#integer",
						}, {
							"@value": "2001-02-15T05:35:12.029Z",
							"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
						}, {
							"@id": "http://example.com/pointer/1",
							"@type": "@id",
						} ],
					},
				] );

				expect( returned ).toEqual( {
					"@list": [ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					}, {
						"@value": "2001-02-15T05:35:12.029Z",
						"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
					}, {
						"@id": "http://example.com/pointer/1",
						"@type": "@id",
					} ],
				} );
			} );

			it( "should return undefined when no @list", () => {
				const returned:RDFList | undefined = RDFNode.getList( [
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
				] );

				expect( returned ).toBeUndefined();
			} );

		} );

		describe( "RDFNode.getPropertyLiterals", () => {

			it( "should exist", () => {
				expect( RDFNode.getPropertyLiterals ).toBeDefined();
				expect( RDFNode.getPropertyLiterals ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return parsed integer when has specified type", () => {
				const literal:any = RDFNode.getPropertyLiterals(
					[ {
						"@value": "100",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
					XSD.integer
				);

				expect( literal ).toEqual( [ 100 ] );
			} );

			it( "should return parsed Date when has specified type", () => {
				const literal:any = RDFNode.getPropertyLiterals(
					[ {
						"@value": "2001-02-15T05:35:12.029Z",
						"@type": "http://www.w3.org/2001/XMLSchema#dateTime",
					} ],
					XSD.dateTime
				);

				expect( literal ).toEqual( [ new Date( "2001-02-15T05:35:12.029Z" ) ] );
			} );

			it( "should return parsed string when no has specific string", () => {
				const literal:any = RDFNode.getPropertyLiterals(
					[ {
						"@value": "a string",
					} ],
					XSD.string
				);

				expect( literal ).toEqual( [ "a string" ] );
			} );


			it( "should return empty when no has different type", () => {
				const literal:any = RDFNode.getPropertyLiterals(
					[ {
						"@value": "2001-02-15T05:35:12.029Z",
						"@type": "http://www.w3.org/2001/XMLSchema#integer",
					} ],
					XSD.string
				);

				expect( literal ).toEqual( [] );
			} );

		} );

		describe( "RDFNode.getPropertyLanguageMap", () => {

			it( "should exist", () => {
				expect( RDFNode.getPropertyLanguageMap ).toBeDefined();
				expect( RDFNode.getPropertyLanguageMap ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return single language map when extended language literals", () => {
				const languageMap:any = RDFNode.getPropertyLanguageMap( [
					{
						"@value": "a string",
						"@language": "en",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					},
					{
						"@value": "una cadena",
						"@language": "es",
					},
					{
						"@value": "文字列",
						"@language": "ja",
					},
				] );

				expect( languageMap ).toEqual( {
					"en": "a string",
					"es": "una cadena",
					"ja": "文字列",
				} );
			} );

			it( "should return empty no language literal", () => {
				const languageMap:any = RDFNode.getPropertyLanguageMap( [
					{
						"@value": "a string",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					},
				] );

				expect( languageMap ).toEqual( {} );
			} );

		} );

	} );

} );

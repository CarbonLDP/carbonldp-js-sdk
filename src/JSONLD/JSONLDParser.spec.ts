import { JSONLDParser } from "./JSONLDParser";


describe( "JSONLDParser", () => {

	beforeEach( () => {
		jasmine.Ajax.install();
	} );

	afterEach( () => {
		jasmine.Ajax.uninstall();
	} );

	it( "should exist", () => {
		expect( JSONLDParser ).toBeDefined();
		expect( JSONLDParser ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const value:JSONLDParser = new JSONLDParser();
		expect( value ).toEqual( jasmine.any( JSONLDParser ) );
	} );


	describe( "JSONLDParser.parse", () => {

		it( "should exist", () => {
			expect( JSONLDParser.prototype.parse ).toBeDefined();
			expect( JSONLDParser.prototype.parse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return object from JSON-LD string", async () => {
			const parser:JSONLDParser = new JSONLDParser();

			const returned:object = await parser.parse( JSON.stringify( {
				"@context": {
					"ex": "http://example.com/",
					"ns": "http://example.com/ns#",
				},
				"@id": "ex:resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"ns:string": [ {
							"@value": "Document Resource",
						} ],
						"ns:pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"ns:string": {
							"@value": "Fragment 1",
						},
						"ns:pointerSet": [
							{ "@id": "ex:resource/" },
							{ "@id": "ex:resource/#1" },
						],
					},
					{
						"@id": "ex:resource/#1",
						"ns:string": {
							"@value": "NamedFragment 1",
						},
					},
				],
			} ) );

			expect( returned ).toEqual( [ {
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [ {
							"@value": "Document Resource",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [ {
							"@value": "Fragment 1",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [ {
							"@value": "NamedFragment 1",
						} ],
					},
				],
			} ] );
		} );


		it( "should return when invalid JSON-LD string", async () => {
			jasmine.Ajax.stubRequest( /Should be error context/ ).andReturn( {
				status: 404,
			} );

			const parser:JSONLDParser = new JSONLDParser();

			await parser
				.parse( JSON.stringify( {
					"@context": "Should be error context",
					"@graph": [
						{
							"@id": "http://example.com/resource/",
							"ex:string": "Document Resource",
							"ex:pointerSet": [
								{ "@id": "_:1" },
								{ "@id": "http://example.com/resource/#1" },
								{ "@id": "http://example.com/external-resource/" },
							],
						},
						{
							"@id": "_:1",
							"ex:string": [ {
								"@id": "Fragment 1",
							} ],
							"ex:pointerSet": [
								{ "@id": "http://example.com/resource/" },
								{ "@id": "http://example.com/resource/#1" },
							],
						},
						{
							"@id": "http://example.com/resource/#1",
							"ex:string": [ {
								"@anotherThing": "NamedFragment 1",
							} ],
						},
					],
				} ) )
				.catch( error => {
					expect( error ).toEqual( jasmine.any( Error ) );
				} );
		} );

		it( "should throw error when invalid string", async () => {
			const parser:JSONLDParser = new JSONLDParser();

			await parser
				.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" )
				.catch( error => {
					expect( error ).toEqual( jasmine.any( Error ) );
				} );
		} );

	} );

} );

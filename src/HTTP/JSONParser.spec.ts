import { JSONParser } from "./JSONParser";


describe( "JSONParser", () => {

	it( "should exist", () => {
		expect( JSONParser ).toBeDefined();
		expect( JSONParser ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const value:JSONParser = new JSONParser();
		expect( value ).toEqual( jasmine.any( JSONParser ) );
	} );


	describe( "JSONParser.parse", () => {

		it( "should exist", () => {
			expect( JSONParser.prototype.parse ).toBeDefined();
			expect( JSONParser.prototype.parse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return object from JSON string", async () => {
			const parser:JSONParser = new JSONParser();

			const returned:object = await parser.parse( `{
				"anObject": {
					"numericProperty": -122,
					"nullProperty": null,
					"booleanProperty": true,
					"dateProperty": "2011-09-23"
				},
				"arrayOfObjects": [
					{
						"item": 1
					},
					{
						"item": 2
					},
					{
						"item": 3
					}
				],
				"arrayOfIntegers": [
					1,
					2,
					3,
					4,
					5
				]
			}` );

			expect( returned ).toEqual( {
				anObject: {
					numericProperty: - 122,
					nullProperty: null,
					booleanProperty: true,
					dateProperty: "2011-09-23",
				},
				arrayOfObjects: [
					{
						item: 1,
					},
					{
						item: 2,
					},
					{
						item: 3,
					},
				],
				arrayOfIntegers: [
					1,
					2,
					3,
					4,
					5,
				],
			} );

		} );

		it( "should throw error when invalid string", async () => {
			const parser:JSONParser = new JSONParser();
			await parser
				.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" )
				.catch( error => {
					expect( error ).toEqual( jasmine.any( Error ) );
				} );
		} );

	} );

} );

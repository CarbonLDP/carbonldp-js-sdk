import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";


describe( "DigestedObjectSchemaProperty", () => {

	it( "should exist", () => {
		expect( DigestedObjectSchemaProperty ).toBeDefined();
		expect( DigestedObjectSchemaProperty ).toEqual( jasmine.any( Function ) );
	} );

	let digestedProperty:DigestedObjectSchemaProperty;
	beforeEach( () => {
		digestedProperty = new DigestedObjectSchemaProperty();
	} );

	it( "should be instantiable", () => {
		const instance:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();

		expect( instance ).toBeDefined();
		expect( instance ).toEqual( jasmine.any( DigestedObjectSchemaProperty ) );
	} );

	it( "DigestedObjectSchemaProperty.uri", () => {
		expect( digestedProperty.uri ).toBeDefined();
		expect( digestedProperty.uri ).toBeNull();
	} );

	it( "DigestedObjectSchemaProperty.literal", () => {
		expect( digestedProperty.literal ).toBeDefined();
		expect( digestedProperty.literal ).toBeNull();
	} );

	it( "DigestedObjectSchemaProperty.literalType", () => {
		expect( digestedProperty.literalType ).toBeDefined();
		expect( digestedProperty.literalType ).toBeNull();
	} );

	it( "DigestedObjectSchemaProperty.language", () => {
		expect( digestedProperty.language ).toBeUndefined();
	} );

	it( "DigestedObjectSchemaProperty.containerType", () => {
		expect( digestedProperty.containerType ).toBeDefined();
		expect( digestedProperty.containerType ).toBeNull();
	} );

} );

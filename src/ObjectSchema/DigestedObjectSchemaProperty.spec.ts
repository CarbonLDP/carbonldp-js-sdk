import {
	clazz,
	hasProperty,
	INSTANCE,
	isDefined,
	module
} from "../test/JasmineExtender";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";


describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz(
		"CarbonLDP.DigestedObjectSchemaProperty", "Class for standardized object properties of a schema." ), ():void => {

		it( isDefined(), ():void => {
			expect( DigestedObjectSchemaProperty ).toBeDefined();
			expect( DigestedObjectSchemaProperty ).toEqual( jasmine.any( Function ) );
		} );

		let digestedProperty:DigestedObjectSchemaProperty;
		beforeEach( ():void => {
			digestedProperty = new DigestedObjectSchemaProperty();
		} );

		it( "should be instantiable", ():void => {
			const instance:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();

			expect( instance ).toBeDefined();
			expect( instance ).toEqual( jasmine.any( DigestedObjectSchemaProperty ) );
		} );

		it( hasProperty(
			INSTANCE,
			"uri",
			"string",
			"The absolute URI that represents the property"
		), ():void => {
			expect( digestedProperty.uri ).toBeDefined();
			expect( digestedProperty.uri ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"literal",
			"boolean",
			"Indicates if the property is a literal or not."
		), ():void => {
			expect( digestedProperty.literal ).toBeDefined();
			expect( digestedProperty.literal ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"literalType",
			"string",
			"The type of literal the property is. It's `null` if the property is not a literal."
		), ():void => {
			expect( digestedProperty.literalType ).toBeDefined();
			expect( digestedProperty.literalType ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"The language the property is in."
		), ():void => {
			expect( digestedProperty.language ).toBeUndefined();
		} );

		it( hasProperty(
			INSTANCE,
			"containerType",
			"CarbonLDP.ContainerType",
			"The type of container the property is. It's `null` if the property is no container type."
		), ():void => {
			expect( digestedProperty.containerType ).toBeDefined();
			expect( digestedProperty.containerType ).toBeNull();
		} );

	} );

} );

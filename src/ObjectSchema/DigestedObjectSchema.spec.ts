import {
	clazz,
	hasProperty,
	INSTANCE,
	module
} from "../test/JasmineExtender";
import { DigestedObjectSchema } from "./DigestedObjectSchema";


function createMock( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	const schema:DigestedObjectSchema = new DigestedObjectSchema();
	return Object.assign( schema, values );
}

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz(
		"CarbonLDP.DigestedObjectSchema",
		"Class of a standardized Schema that is used for the SDK for compact and expand JSON-LD objects and Carbon Resources."
	), ():void => {

		it( "should exists", ():void => {
			expect( DigestedObjectSchema ).toBeDefined();
			expect( DigestedObjectSchema ).toEqual( jasmine.any( Function ) );
		} );

		it( "should be instantiable", ():void => {
			const digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

			expect( digestedSchema ).toBeDefined();
			expect( digestedSchema ).toEqual( jasmine.any( DigestedObjectSchema ) );
		} );

		it( hasProperty(
			INSTANCE,
			"base",
			"string",
			"The base URI of the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.base ).toEqual( jasmine.any( String ) );
			expect( digestedSchema.base ).toBe( "" );
		} );

		it( hasProperty(
			INSTANCE,
			"language",
			"string",
			"The default language of the string properties."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.language ).toBeNull();
		} );

		it( hasProperty(
			INSTANCE,
			"vocab",
			"string",
			"URI that will be used to resolve properties URIs that aren't defined in the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.vocab ).toBeUndefined();
		} );

		it( hasProperty(
			INSTANCE,
			"prefixes",
			"Map<string, string>",
			"Map that contains the prefixes of absolutes URIs."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.prefixes ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.prefixes.size ).toBe( 0 );
		} );

		it( hasProperty(
			INSTANCE,
			"properties",
			"Map<string, CarbonLDP.DigestedObjectSchemaProperty>",
			"Map that contains the definitions of the properties in the schema."
		), ():void => {
			const digestedSchema:DigestedObjectSchema = createMock();

			expect( digestedSchema.properties ).toEqual( jasmine.any( Map ) );
			expect( digestedSchema.properties.size ).toBe( 0 );
		} );

	} );

} );

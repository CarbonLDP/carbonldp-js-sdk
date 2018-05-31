import {
	hasMethod,
	hasSignature,
	INSTANCE,
	interfaze,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property
} from "../test/JasmineExtender";
import { ObjectSchemaResolver } from "./ObjectSchemaResolver";

describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ObjectSchemaResolver",
		"Interface that defines the methods needed for an element that can provide object schemas."
	), ():void => {

		it( hasMethod(
			OPTIONAL,
			"getGeneralSchema",
			"Returns the general object schema that applies to all the objects.",
			{ type: "CarbonLDP.DigestedObjectSchema" }
		), ():void => {} );

		it( hasMethod(
			OPTIONAL,
			"getSchemaFor",
			"Returns the specific object schema that applies to the object provided.", [
				{ name: "object", type: "object", description: "The object to look for its schema." },
			],
			{ type: "CarbonLDP.DigestedObjectSchema" }
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.ObjectSchemaResolverFactory",
		"Interface with the factory and utils for `CarbonLDP.ObjectSchemaResolver` objects."
	), () => {

		describe( method( OBLIGATORY, "is" ), () => {

			it( hasSignature(
				"Check if the value provided is considered a `CarbonLDP.ObjectSchemaResolver` object.",
				[
					{ name: "value", type: "any", description: "The value to be checked." },
				],
				{ type: "value is CarbonLDP.ObjectSchemaResolver" }
			), () => {} );


			it( "should exists", ():void => {
				expect( ObjectSchemaResolver.is ).toBeDefined();
				expect( ObjectSchemaResolver.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when null", () => {
				const returned:boolean = ObjectSchemaResolver.is( null );
				expect( returned ).toBe( false );
			} );

			it( "should return false when undefined", () => {
				const returned:boolean = ObjectSchemaResolver.is( void 0 );
				expect( returned ).toBe( false );
			} );


			let resolver:ObjectSchemaResolver;
			beforeEach( ():void => {
				const fn:() => any = () => {};
				resolver = {
					getGeneralSchema: fn,

					hasSchemaFor: fn,
					getSchemaFor: fn,
				};
			} );

			it( "should return true when all properties", () => {
				const returned:boolean = ObjectSchemaResolver.is( resolver );
				expect( returned ).toBe( true );
			} );

			it( "should return false when no getGeneralSchema", () => {
				delete resolver.getGeneralSchema;

				const returned:boolean = ObjectSchemaResolver.is( resolver );
				expect( returned ).toBe( false );
			} );

			it( "should return false when no hasSchemaFor", () => {
				delete resolver.hasSchemaFor;

				const returned:boolean = ObjectSchemaResolver.is( resolver );
				expect( returned ).toBe( false );
			} );

			it( "should return false when no getSchemaFor", () => {
				delete resolver.getSchemaFor;

				const returned:boolean = ObjectSchemaResolver.is( resolver );
				expect( returned ).toBe( false );
			} );

		} );

	} );

	describe( property(
		INSTANCE,
		"ObjectSchemaResolver",
		"CarbonLDP.ObjectSchemaResolverFactory"
	), () => {

		it( "should exists", ():void => {
			expect( ObjectSchemaResolver ).toBeDefined();
			expect( ObjectSchemaResolver ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

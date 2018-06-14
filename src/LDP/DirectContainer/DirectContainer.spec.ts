import { Document } from "../../Document";
import {
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";
import { LDP } from "../../Vocabularies";
import { DirectContainer } from "./DirectContainer";
import { TransientDirectContainer } from "./TransientDirectContainer";


describe( module( "carbonldp/LDP/DirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainer",
		"Interface of a persisted direct container."
	), ():void => {} );

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainerFactory",
		"Interface with the factory, utils for `CarbonLDP.LDP.DirectContainer` objects."
	), ():void => {

		describe( property(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.C.DirectContainer"
		), ():void => {

			it( "should exists", ():void => {
				expect( DirectContainer.TYPE ).toBeDefined();
				expect( DirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be ldp:DirectContainer", () => {
				expect( DirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		describe( method( OBLIGATORY, "is" ), () => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.LDP.DirectContainer` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.LDP.DirectContainer" }
			), () => {} );

			it( "should exists", ():void => {
				expect( DirectContainer.is ).toBeDefined();
				expect( DirectContainer.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDirectContainer:jasmine.Spy;
			let isDocument:jasmine.Spy;
			beforeEach( ():void => {
				isTransientDirectContainer = spyOn( TransientDirectContainer, "is" )
					.and.returnValue( true );
				isDocument = spyOn( Document, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientDirectContainer", () => {
				DirectContainer.is( { the: "object" } );
				expect( isTransientDirectContainer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be a Document", () => {
				DirectContainer.is( { the: "object" } );
				expect( isDocument ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions true", () => {
				const returned:boolean = DirectContainer.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the parameters specified.", [
					{ name: "data", type: "T & carbonLDP.LDP.BaseDirectContainer", description: "Data for creating a direct container." },
				],
				{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( DirectContainer.create ).toBeDefined();
				expect( DirectContainer.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should be TransientDirectContainer.create", () => {
				expect( DirectContainer.create ).toBe( TransientDirectContainer.create );
			} );

		} );

		describe( method( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the object provided and the parameters specified.", [
					{ name: "object", type: "T & CarbonLDP.LDP.BaseDirectContainer", description: "Object to be converted into a direct container." },
				],
				{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( DirectContainer.createFrom ).toBeDefined();
				expect( DirectContainer.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should be TransientDirectContainer.createFrom", () => {
				expect( DirectContainer.createFrom ).toBe( TransientDirectContainer.createFrom );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"DirectContainer",
		"CarbonLDP.LDP.DirectContainerFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( DirectContainer ).toBeDefined();
			expect( DirectContainer ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

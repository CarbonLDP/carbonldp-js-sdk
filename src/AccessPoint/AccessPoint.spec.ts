import { Document } from "../Document/Document";

import { AccessPoint, AccessPointFactory } from "./AccessPoint";
import { TransientAccessPoint } from "./TransientAccessPoint";


describe( "AccessPoint", () => {

	it( "should exists", () => {
		expect( AccessPoint ).toBeDefined();
		expect( AccessPoint ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		it( "should inherit TransientAccessPointFactory", () => {
			expect( AccessPoint ).toEqual( jasmine.objectContaining( {
				TYPE: TransientAccessPoint.TYPE,
				create: TransientAccessPoint.create,
				createFrom: TransientAccessPoint.createFrom,
			} ) );
		} );

		describe( "AccessPoint.is", () => {

			it( "should exists", () => {
				expect( AccessPoint.is ).toBeDefined();
				expect( AccessPoint.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientAccessPoint:jasmine.Spy;
			let isDocument:jasmine.Spy;
			beforeEach( () => {
				isTransientAccessPoint = spyOn( TransientAccessPoint, "is" )
					.and.returnValue( true );
				isDocument = spyOn( Document, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientAccessPoint", () => {
				AccessPoint.is( { the: "object" } );
				expect( isTransientAccessPoint ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be a Document", () => {
				AccessPoint.is( { the: "object" } );
				expect( isDocument ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = AccessPoint.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

	} );

} );

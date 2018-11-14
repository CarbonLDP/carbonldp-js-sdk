import { TransientDirectContainer } from "../LDP/DirectContainer/TransientDirectContainer";

import { Pointer } from "../Pointer/Pointer";

import { C } from "../Vocabularies/C";

import { BaseAccessPoint } from "./BaseAccessPoint";
import { TransientAccessPoint } from "./TransientAccessPoint";


describe( "TransientAccessPoint", () => {

	it( "should exists", () => {
		expect( TransientAccessPoint ).toBeDefined();
		expect( TransientAccessPoint ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[factory]]", () => {

		describe( "TransientAccessPoint.is", () => {

			it( "should exists", () => {
				expect( TransientAccessPoint.is ).toBeDefined();
				expect( TransientAccessPoint.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDirectContainer:jasmine.Spy;
			beforeEach( () => {
				isTransientDirectContainer = spyOn( TransientDirectContainer, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientDirectContainer", () => {
				TransientAccessPoint.is( { the: "object" } );
				expect( isTransientDirectContainer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = TransientAccessPoint.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "TransientAccessPoint.TYPE", () => {

			it( "should exists", () => {
				expect( TransientAccessPoint.TYPE ).toBeDefined();
				expect( TransientAccessPoint.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be c:AccessPoint", () => {
				expect( TransientAccessPoint.TYPE ).toBe( C.AccessPoint );
			} );

		} );

		describe( "TransientAccessPoint.create", () => {

			it( "should exists", () => {
				expect( TransientAccessPoint.create ).toBeDefined();
				expect( TransientAccessPoint.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientAccessPoint.createFrom", () => {
				const spy:jasmine.Spy = spyOn( TransientAccessPoint, "createFrom" );

				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientAccessPoint.create( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return different reference", () => {
				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientAccessPoint = TransientAccessPoint.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "TransientAccessPoint.createFrom", () => {

			it( "should exists", () => {
				expect( TransientAccessPoint.createFrom ).toBeDefined();
				expect( TransientAccessPoint.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientDirectContainer.createFrom", () => {
				const spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" )
					.and.callThrough();

				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientAccessPoint.createFrom( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return the same reference", () => {
				const base:BaseAccessPoint = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientAccessPoint = TransientAccessPoint.createFrom( base );

				expect( base ).toBe( returned );
			} );


			it( "should add c:AccessPoint type", () => {
				const returned:TransientAccessPoint = TransientAccessPoint.createFrom( {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( returned.types ).toContain( C.AccessPoint );
			} );

		} );

	} );

} );

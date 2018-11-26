import { TransientDocument } from "../../Document/TransientDocument";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { Pointer } from "../../Pointer/Pointer";

import { LDP } from "../../Vocabularies/LDP";

import { BaseDirectContainer } from "./BaseDirectContainer";
import { TransientDirectContainer } from "./TransientDirectContainer";


describe( "DirectContainer", () => {

	it( "should exists", () => {
		expect( TransientDirectContainer ).toBeDefined();
		expect( TransientDirectContainer ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "TransientDirectContainer.TYPE", () => {

			it( "should exist", () => {
				expect( TransientDirectContainer.TYPE ).toBeDefined();
				expect( TransientDirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `ldp:TransientDirectContainer`", () => {
				expect( TransientDirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		describe( "TransientDirectContainer.is", () => {

			it( "should exists", () => {
				expect( TransientDirectContainer.is ).toBeDefined();
				expect( TransientDirectContainer.is ).toEqual( jasmine.any( Function ) );
			} );


			function createMock( data:object = {} ):TransientDirectContainer {
				return TransientDocument.create( {
					types: [ LDP.DirectContainer ],
					hasMemberRelation: null,

					...data,
				} );
			}

			it( "should return false when empty", () => {
				expect( TransientDirectContainer.is( {} ) ).toBe( false );
			} );

			it( "should return true when all properties", () => {
				const object:TransientDocument = createMock();
				expect( TransientDirectContainer.is( object ) ).toBe( true );
			} );

			it( "should return false when no `hasMemberRelation`", () => {
				const object:TransientDocument = createMock();
				delete object.hasMemberRelation;

				expect( TransientDirectContainer.is( object ) ).toBe( false );
			} );

			it( "should return false when no `DirectContainer` type", () => {
				const object:TransientDocument = createMock( {
					types: [],
				} );

				expect( TransientDirectContainer.is( object ) ).toBe( false );
			} );

		} );

		describe( "TransientDirectContainer.create", () => {

			it( "should exists", () => {
				expect( TransientDirectContainer.create ).toBeDefined();
				expect( TransientDirectContainer.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call TransientDirectContainer.createFrom", () => {
				const spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" );

				const base:BaseDirectContainer = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				TransientDirectContainer.create( base );

				expect( spy ).toHaveBeenCalledWith( base );
			} );

			it( "should return different reference", () => {
				const base:BaseDirectContainer = {
					membershipResource: Pointer.create(),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientDirectContainer = TransientDirectContainer.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "TransientDirectContainer.createFrom", () => {

			it( "should exists", () => {
				expect( TransientDirectContainer.createFrom ).toBeDefined();
				expect( TransientDirectContainer.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return same reference", () => {
				const base:BaseDirectContainer = {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				};
				const returned:TransientDirectContainer = TransientDirectContainer.createFrom( base );

				expect( base ).toBe( returned );
			} );

			it( "should return a TransientDirectContainer", () => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			} );

			it( "should return maintain hasMemberRelation", () => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			} );

			it( "should return maintain isMemberOfRelation", () => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
					isMemberOfRelation: "http://example.com/myNamespace#some-inverted-relation",
				} );

				expect( directContainer.isMemberOfRelation as any as string ).toBe( "http://example.com/myNamespace#some-inverted-relation" );
			} );

			it( "should return add type ldp:DirectContainer", () => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( directContainer.types ).toContain( LDP.DirectContainer );
			} );

			it( "should throw error if already a direct container", () => {
				const directContainer:TransientDirectContainer = TransientDirectContainer.createFrom( {
					membershipResource: Pointer.create( { $id: "http://example.com/theResource/" } ),
					hasMemberRelation: "http://example.com/myNamespace#some-relation",
				} );

				expect( () => TransientDirectContainer.createFrom( directContainer ) ).toThrowError( IllegalArgumentError, "The base object is already a DirectContainer." );
			} );

		} );

	} );

} );

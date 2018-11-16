import { TransientDocument } from "../Document/TransientDocument";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { URI } from "../RDF/URI";

import { Resource } from "../Resource/Resource";

import { BaseTransientFragment } from "./BaseTransientFragment";
import { TransientFragment } from "./TransientFragment";


describe( "TransientFragment", () => {

	it( "should exist", () => {
		expect( TransientFragment ).toBeDefined();
		expect( TransientFragment ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {

		let fragment:TransientFragment;
		beforeEach( () => {
			fragment = TransientFragment
				.create( { $registry: TransientDocument.create() } );
		} );

		describe( "TransientFragment.$document", () => {

			it( "should be the $registry", () => {
				expect( fragment.$document ).toBe( fragment.$registry );
			} );

			it( "should assign the $registry ", () => {
				const document:TransientDocument = TransientDocument.create();
				fragment.$document = document;

				expect( fragment.$registry ).toBe( document );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		let $registry:TransientDocument;
		beforeEach( () => {
			$registry = TransientDocument.create();
		} );

		describe( "TransientFragment.isDecorated", () => {

			it( "should exists", () => {
				expect( TransientFragment.isDecorated ).toBeDefined();
				expect( TransientFragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientResource.isDecorated", () => {
				const spy:jasmine.Spy = spyOn( Resource, "isDecorated" );

				TransientFragment.isDecorated( { the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

		describe( "TransientFragment.create", () => {

			it( "should exists", () => {
				expect( TransientFragment.create ).toBeDefined();
				expect( TransientFragment.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should fill bNode label id when no provided", () => {
				const fragment:TransientFragment = TransientFragment.create( { $registry } );

				expect( URI.isBNodeID( fragment.$id ) ).toBe( true );
			} );

			it( "should maintain id when provided", () => {
				const fragment:TransientFragment = TransientFragment.create( {
					$registry,
					$id: "#fragment",
				} );

				expect( fragment.$id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.createFrom", () => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "createFrom" );

				TransientFragment.create( { $registry, the: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { $registry, the: "fragment" } );
			} );

			it( "should return different reference", () => {
				const object:BaseTransientFragment = { $registry };
				const returned:TransientFragment = TransientFragment.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "TransientFragment.createFrom", () => {

			it( "should exists", () => {
				expect( TransientFragment.createFrom ).toBeDefined();
				expect( TransientFragment.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should fill bNode label id when no provided", () => {
				const fragment:TransientFragment = TransientFragment.createFrom( { $registry } );

				expect( URI.isBNodeID( fragment.$id ) ).toBe( true );
			} );

			it( "should maintain id when provided", () => {
				const fragment:TransientFragment = TransientFragment.createFrom( {
					$registry,
					$id: "#fragment",
				} );

				expect( fragment.$id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.decorate", () => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "decorate" );

				TransientFragment.createFrom( { $registry, the: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { $registry, the: "fragment" } );
			} );

			it( "should return same reference", () => {
				const object:BaseTransientFragment = { $registry };
				const returned:TransientFragment = TransientFragment.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );

		describe( "TransientFragment.decorate", () => {

			it( "should exists", () => {
				expect( TransientFragment.decorate ).toBeDefined();
				expect( TransientFragment.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call Resource.decorate", () => {
				const spy:jasmine.Spy = spyOn( Resource, "decorate" );

				TransientFragment.decorate( { $registry, the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should throw error when no $registry", () => {
				expect( () => {
					TransientFragment.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$registry" is required.` );
			} );

		} );

	} );

} );

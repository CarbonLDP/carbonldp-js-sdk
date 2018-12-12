import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";

import { QueryablePointer } from "../QueryDocuments/QueryablePointer";

import { Fragment } from "./Fragment";
import { TransientFragment } from "./TransientFragment";


describe( "Fragment", () => {

	it( "should exist", () => {
		expect( Fragment ).toBeDefined();
		expect( Fragment ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {

		let $registry:Document;
		let fragment:Fragment;
		beforeEach( () => {
			$registry = Document.decorate( { $registry: null as any, $repository: null as any } );
			fragment = Fragment
				.decorate( { $registry } );
		} );

		describe( "Fragment.$repository", () => {

			it( "should be the $registry", () => {
				expect( fragment.$repository ).toBe( fragment.$registry );
			} );

			it( "should assign the $registry ", () => {
				const document:Document = Document.decorate( { $registry: null as any, $repository: null as any } );
				fragment.$repository = document;

				expect( fragment.$registry ).toBe( document );
			} );

		} );


		describe( "Fragment.$_resolved", () => {

			it( "should return false when parent is not resolved", () => {
				$registry.$_resolved = false;
				expect( fragment.$_resolved ).toBe( false, "Not passing resolution to parent" );
			} );

			it( "should return true when parent is not resolved", () => {
				$registry.$_resolved = true;
				expect( fragment.$_resolved ).toBe( true, "Not passing resolution to parent" );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "Fragment.isDecorated", () => {

			it( "should exist", () => {
				expect( Fragment.isDecorated ).toBeDefined();
				expect( Fragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should verify members from PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" )
					.and.returnValue( true );

				const returned:boolean = Fragment.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( Fragment.PROTOTYPE, { the: "object" } );
				expect( returned ).toBe( true, "Not returning value from ModelDecorator.hasPropertiesFrom" );
			} );

		} );

		describe( "Fragment.decorate", () => {

			it( "should exist", () => {
				expect( Fragment.decorate ).toBeDefined();
				expect( Fragment.decorate ).toEqual( jasmine.any( Function ) );
			} );

			let $registry:Document;
			beforeEach( () => {
				$registry = Document.decorate( { $registry: null as any, $repository: null as any } );
			} );


			it( "should decorate with TransientFragment", () => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "decorate" );

				Fragment.decorate( { $registry } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should decorate with QueryablePointer", () => {
				const spy:jasmine.Spy = spyOn( QueryablePointer, "decorate" );

				Fragment.decorate( { $registry } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add PROTOTYPE", () => {
				const fragment:Fragment = Fragment.decorate( { $registry } );
				expect( Fragment.isDecorated( fragment ) ).toBe( true, "Not adding PROTOTYPE members" );
			} );

			it( "should throw error when no $registry", () => {
				expect( () => {
					Fragment.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$registry" is required.` );
			} );

		} );

	} );

} );

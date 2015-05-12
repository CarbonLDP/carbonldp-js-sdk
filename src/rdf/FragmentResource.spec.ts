/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
import * as FragmentResource from './FragmentResource';
import * as Utils from '../Utils';
describe( 'RDF', function () {
	describe( 'FragmentResource', function () {
		it( 'is defined', function () {
			expect( FragmentResource ).toBeDefined();
		} );
		describe( 'Factory', function () {
			it( 'is defined', function () {
				expect( FragmentResource.Factory ).toBeDefined();
			} );
			it( 'has method, create( uri ), that creates a fragment resource with the provided slug.', function () {
				expect( FragmentResource.Factory.create ).toBeDefined();
				expect( Utils.isFunction( FragmentResource.Factory.create ) ).toBeTruthy();

				var fragment:FragmentResource.Class;
				fragment = FragmentResource.Factory.create( '#some-fragment' );
				expect( fragment.slug ).toEqual( '#some-fragment' );

				fragment = FragmentResource.Factory.create( 'some-fragment' );
				expect( fragment.slug ).toEqual( '#some-fragment' );

				fragment = FragmentResource.Factory.create( 'some/resource/#some-fragment' );
				expect( fragment.slug ).toEqual( '#some-fragment' );

				fragment = FragmentResource.Factory.create( 'some/resource/#some-fragment' );
				expect( fragment.slug ).toEqual( '#some-fragment' );

				fragment = FragmentResource.Factory.create( 'http://example.org/some/resource/#some-fragment' );
				expect( fragment.slug ).toEqual( '#some-fragment' );
			} );
			it( 'has method, from( resources ), that makes the resources provided, fragment resources and returns them.', function () {
				expect( FragmentResource.Factory.from ).toBeDefined();
				expect( Utils.isFunction( FragmentResource.Factory.from ) ).toBeTruthy();

				// TODO: Finish test
			} );
		} );
	} );
} );
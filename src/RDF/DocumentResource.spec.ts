/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
import * as DocumentResource from './DocumentResource';
import * as FragmentResource from './FragmentResource';
import * as Resource from './Resource';
import * as Utils from '../Utils';

describe( 'RDF', function () {
	describe( 'DocumentResource', function () {
		var resource:Resource.Class;
		var fragments:FragmentResource.Class[];

		beforeEach( function () {
			resource = Resource.factory.create();
			fragments = [];
			fragments.push( FragmentResource.factory.create( '#fragment-1' ) );
			fragments.push( FragmentResource.factory.create( '#fragment-2' ) );
			fragments.push( FragmentResource.factory.create( '#fragment-3' ) );
			fragments.push( FragmentResource.factory.create( '#fragment-4' ) );
		} );

		it( 'is defined', function () {
			expect( DocumentResource ).toBeDefined();
		} );
		describe( 'Class', function () {
			var documentResource:DocumentResource.Class;

			beforeEach( function () {
				documentResource = DocumentResource.factory.from( resource, fragments );
			} );

			it( 'has method, hasFragment( uri ), that returns true if the documentResource has a fragment with that uri/slug.', function () {
				expect( documentResource.hasFragment ).toBeDefined();
				expect( Utils.isFunction( documentResource.hasFragment ) ).toEqual( true );

				expect( documentResource.hasFragment( '#fragment-1' ) ).toEqual( true );
				expect( documentResource.hasFragment( '#doesnt-exist' ) ).toEqual( false );
			} );

			it( "has method, getFragment( uri ), that returns the document resource's fragment with that uri, or null if it doesn't exist.", function () {
				expect( documentResource.getFragment ).toBeDefined();
				expect( Utils.isFunction( documentResource.getFragment ) ).toEqual( true );

				expect( documentResource.getFragment( '#fragment-1' ) ).toEqual( fragments[ 0 ] );
				expect( documentResource.getFragment( '#doesnt-exist' ) ).toBeNull();
			} );

			it( "has method, getFragments( uri ), that returns the document resource's fragment with that uri, or null if it doesn't exist.", function () {
				expect( documentResource.getFragments ).toBeDefined();
				expect( Utils.isFunction( documentResource.getFragments ) ).toEqual( true );

				var resourceFragments:FragmentResource.Class[] = documentResource.getFragments();

				expect( Utils.isArray( resourceFragments ) ).toEqual( true );
				expect( resourceFragments.length ).toEqual( fragments.length );
			} );
			it( "has method, createFragment( uri ), that creates a fragment in the documentResource and returns it.", function () {
				expect( documentResource.createFragment ).toBeDefined();
				expect( Utils.isFunction( documentResource.createFragment ) ).toEqual( true );


				expect( documentResource.hasFragment( '#new-fragment' ) ).toEqual( false );

				var fragment:FragmentResource.Class = documentResource.createFragment( '#new-fragment' );

				expect( FragmentResource.factory.is( fragment ) ).toEqual( true );
				expect( documentResource.hasFragment( '#new-fragment' ) ).toEqual( true );
			} );
			it( "has method, deleteFragment( uri ), that tries to removes a fragment with the uri supplied, and returns true if successful.", function () {
				expect( documentResource.deleteFragment ).toBeDefined();
				expect( Utils.isFunction( documentResource.deleteFragment ) ).toEqual( true );


				expect( documentResource.hasFragment( '#fragment-1' ) ).toEqual( true );
				expect( documentResource.deleteFragment( '#fragment-1' ) ).toEqual( true );
				expect( documentResource.hasFragment( '#fragment-1' ) ).toEqual( false );
				expect( documentResource.deleteFragment( '#fragment-1' ) ).toEqual( false );
			} );
		} );
		describe( 'Factory', function () {
			it( 'is defined', function () {
				expect( DocumentResource.Factory ).toBeDefined();
			} );
			it( 'has method, from( resource, fragments ), that makes the resource a document resource and adds all the fragments to it.', function () {
				expect( DocumentResource.factory.from ).toBeDefined();
				expect( Utils.isFunction( DocumentResource.factory.from ) ).toEqual( true );

				var documentResource:DocumentResource.Class = DocumentResource.factory.from( resource );
				expect( documentResource ).toEqual( resource );

				expect( documentResource._fragments ).toBeDefined();
				expect( Utils.isArray( documentResource._fragments ) ).toEqual( true );
				expect( documentResource._fragments ).not.toEqual( fragments );

				expect( Utils.isFunction( documentResource.hasFragment ) ).toEqual( true );
				expect( Utils.isFunction( documentResource.getFragment ) ).toEqual( true );
				expect( Utils.isFunction( documentResource.getFragments ) ).toEqual( true );
				expect( Utils.isFunction( documentResource.createFragment ) ).toEqual( true );
				expect( Utils.isFunction( documentResource.deleteFragment ) ).toEqual( true );
			} );
		} );
	} );
} );
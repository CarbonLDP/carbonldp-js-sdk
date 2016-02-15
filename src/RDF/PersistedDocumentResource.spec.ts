/// <reference path="../../typings/typings.d.ts" />

/*

	import * as Resource from './Resource';
	import * as DocumentResource from './DocumentResource';
	import * as PersistedDocumentResource from './PersistedDocumentResource';
	import * as Utils from '../Utils';

	describe( 'RDF', function () {
		describe( 'PersistedDocumentResource', function () {
			it( 'is defined', function () {
				expect( PersistedDocumentResource ).toBeDefined();
			} );
			describe( 'Class', function () {
				var persisted:PersistedDocumentResource.Class;

				beforeEach( function () {
					var resource:Resource.Class = Resource.factory.create();
					var documentResource:DocumentResource.Class = DocumentResource.factory.from( resource );
					persisted = PersistedDocumentResource.Factory.from( documentResource, null );
				} );

				it( 'has method, isDirty(), that returns true when the resource has been modified.', function () {
					expect( persisted.isDirty ).toBeDefined();
					expect( Utils.isFunction( persisted.isDirty ) ).toBe( true );

					expect( persisted.isDirty() ).toBe( false );
					persisted.addProperty( 'http://example.org/title', 'My title' );
					expect( persisted.isDirty() ).toBe( true );
				} );
				it( 'has method, commit(), that commits the changes the resource has, using its parent.', function () {
					expect( persisted.commit ).toBeDefined();
					expect( Utils.isFunction( persisted.commit ) ).toBe( true );

					// TODO: Finish test
				} );
				it( 'has method, delete(), that deletes the object itself, using its parent.', function () {
					expect( persisted.delete ).toBeDefined();
					expect( Utils.isFunction( persisted.delete ) ).toBe( true );

					// TODO: Finish test
				} );
			} );
			describe( 'Factory', function () {
				it( 'is defined', function () {
					expect( PersistedDocumentResource.Factory ).toBeDefined();
				} );
				it( 'is defined', function () {
					var resource:Resource.Class = Resource.factory.create();
					var documentResource:DocumentResource.Class = DocumentResource.factory.from( resource );
					var persisted:PersistedDocumentResource.Class = PersistedDocumentResource.Factory.from( documentResource, null );

					expect( persisted ).toBeDefined();
					expect( persisted ).not.toBeNull();
					expect( persisted ).toEqual( resource );

					expect( Utils.hasProperty( persisted, '_dirty' ) ).toBe( true );
					expect( Utils.hasProperty( persisted, '_modifications' ) ).toBe( true );
					expect( Utils.hasProperty( persisted, '_committer' ) ).toBe( true );
					expect( Utils.hasFunction( persisted, '_clean' ) ).toBe( true );

					expect( Utils.hasFunction( persisted, 'isDirty' ) ).toBe( true );

					expect( Utils.hasFunction( persisted, 'commit' ) ).toBe( true );
					expect( Utils.hasFunction( persisted, 'delete' ) ).toBe( true );
				} );
			} );
		} );
	} );

*/
